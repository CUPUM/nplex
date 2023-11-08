import { S3_BUCKET_NAME } from '$env/static/private';
import { withAuth } from '$lib/auth/guard.server';
import { projectsGalleryUpdateSchema, projectsImagesInsertManySchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import {
	projects,
	projectsImages,
	projectsImagesCredits,
	projectsImagesTranslations,
} from '$lib/db/schema/public';
import { withTranslations } from '$lib/db/utils';
import { tt } from '$lib/i18n/translations';
import { s3 } from '$lib/storage/s3.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withAuth(event);
	const images = withTranslations(projectsImages, projectsImagesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	})
		.where(eq(projectsImages.projectId, event.params.projectId))
		.leftJoin(projectsImagesCredits, eq(projectsImagesCredits.imageId, projectsImages.id));
	const [project] = await dbpool
		.select({ bannerId: projects.bannerId })
		.from(projects)
		.where(eq(projects.id, event.params.projectId))
		.limit(1);
	const insertImagesForm = superValidate(projectsImagesInsertManySchema);
	const updateGalleryForm = superValidate(project, projectsGalleryUpdateSchema);
	return {
		images,
		insertImagesForm,
		updateGalleryForm,
	};
};

export const actions = {
	/**
	 * Add new image to project gallery. This action should occur after the file was uploaded to s3
	 * using a presigned url on the client's side.
	 */
	insert: async (event) => {
		const session = await withAuth(event);
		const insertImagesForm = await superValidate(event, projectsImagesInsertManySchema);
		const t = event.locals.createTranslations({
			fr: tt.fr.editor.server,
			en: tt.en.editor.server,
		});
		if (!insertImagesForm.valid) {
			console.error(insertImagesForm.errors);
			return message(insertImagesForm, [t.invalid]);
		}
		try {
			await dbpool.insert(projectsImages).values(
				insertImagesForm.data.images.map((imageData) => ({
					...imageData,
					createdById: session.user.id,
					projectId: event.params.projectId,
				}))
			);
		} catch (e) {
			console.error(e);
			// Rollback s3 uploads
			const cmd = new DeleteObjectsCommand({
				Bucket: S3_BUCKET_NAME,
				Delete: {
					Objects: insertImagesForm.data.images.map((imageData) => ({
						Key: imageData.storageName,
					})),
				},
			});
			await s3.send(cmd);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { insertImagesForm });
		}
	},
	/**
	 * Delete a project image.
	 */
	delete: async (event) => {
		await withAuth(event);
		const galleryUpdateForm = await superValidate(event, projectsGalleryUpdateSchema);
		const { deleteId } = galleryUpdateForm.data;
		try {
			if (!deleteId) {
				return fail(STATUS_CODES.BAD_REQUEST, { galleryUpdateForm });
			}
			// Delete image
			await dbpool.transaction(async (tx) => {
				const [deleted] = await dbpool
					.delete(projectsImages)
					.where(
						and(
							eq(projectsImages.id, deleteId),
							eq(projectsImages.projectId, event.params.projectId)
						)
					)
					.returning();
				if (!deleted) {
					return;
				}
				const cmd = new DeleteObjectCommand({
					Bucket: S3_BUCKET_NAME,
					Key: deleted.storageName,
				});
				const data = await s3.send(cmd);
				if (data.$metadata.httpStatusCode && data.$metadata.httpStatusCode >= 400) {
					tx.rollback();
					console.error(data.$metadata);
					throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
				}
			});
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	/**
	 * Promote image to project banner.
	 */
	promote: async (event) => {
		await withAuth(event);
		const galleryUpdateForm = await superValidate(event, projectsGalleryUpdateSchema);
		const { bannerId } = galleryUpdateForm.data;
		const t = event.locals.createTranslations({
			fr: tt.fr.editor.server,
			en: tt.en.editor.server,
		});
		try {
			if (!bannerId) {
				return message(galleryUpdateForm, [t.invalid], { status: STATUS_CODES.BAD_REQUEST });
			}
			await dbpool
				.update(projects)
				.set({ bannerId })
				.where(eq(projects.id, event.params.projectId));
		} catch (e) {
			return message(galleryUpdateForm, [t.error], { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
	},
	/**
	 * Demote image from project banner.
	 */
	demote: async (event) => {
		await withAuth(event);
		const galleryUpdateForm = await superValidate(event, projectsGalleryUpdateSchema);
		const { bannerId } = galleryUpdateForm.data;
		const t = event.locals.createTranslations({
			fr: tt.fr.editor.server,
			en: tt.en.editor.server,
		});
		try {
			if (!bannerId) {
				return message(galleryUpdateForm, [t.invalid], { status: STATUS_CODES.BAD_REQUEST });
			}
			await dbpool
				.update(projects)
				.set({ bannerId: null })
				.where(and(eq(projects.id, event.params.projectId), eq(projects.bannerId, bannerId)));
		} catch (e) {
			return message(galleryUpdateForm, [t.error], { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
	},
};

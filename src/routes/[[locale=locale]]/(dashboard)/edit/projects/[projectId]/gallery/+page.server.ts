import { S3_BUCKET_NAME } from '$env/static/private';
import { withAuth } from '$lib/auth/guard.server';
import { projectsImagesInsertSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { projectsImages } from '$lib/db/schema/public';
import { reduceTranslations } from '$lib/db/utils';
import { s3 } from '$lib/storage/s3.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withAuth(event);
	event.depends('projects:edit:gallery');
	const images = (
		await dbpool.query.projectsImages.findMany({
			where(f, o) {
				return o.eq(f.projectId, event.params.projectId);
			},
			with: {
				translations: true,
			},
		})
	).map(reduceTranslations);

	const addImagesForm = superValidate(projectsImagesInsertSchema);
	return { images, addImagesForm };
};

export const actions = {
	add: async (event) => {
		const session = await withAuth(event);
		const addImagesForm = await superValidate(event, projectsImagesInsertSchema);
		if (!addImagesForm.valid) {
			console.error(addImagesForm.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { addImagesForm });
		}
		try {
			await dbpool.insert(projectsImages).values(
				addImagesForm.data.images.map((imageData) => ({
					...imageData,
					createdById: session.user.id,
					projectId: event.params.projectId,
				}))
			);
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { addImagesForm });
		}
	},
	delete: async (event) => {
		await withAuth(event);
		const id = event.url.searchParams.get('id');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [deleted] = await dbpool
					.delete(projectsImages)
					.where(
						and(eq(projectsImages.id, id), eq(projectsImages.projectId, event.params.projectId))
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
			return {};
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await withAuth(event);
	},
	promote: async (event) => {
		await withAuth(event);
	},
	demote: async (event) => {
		await withAuth(event);
	},
};

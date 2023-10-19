import { S3_BUCKET_NAME } from '$env/static/private';
import { withAuth } from '$lib/auth/guard.server';
import { projectsImagesInsertSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { selectProjectImageTemporalities, selectProjectImageTypes } from '$lib/db/queries.server';
import {
	projectImageTypes,
	projectImageTypesTranslations,
	projectsImages,
} from '$lib/db/schema/public';
import { reduceTranslations, withTranslations } from '$lib/db/utils';
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

	// const test = await dbpool
	// 	.select({
	// 		...getTableColumns(projectImageTypes),
	// 		translations: jsonObjectAgg(
	// 			locales.locale,
	// 			coalesce(rowToJson(projectImageTypesTranslations), emptyJsonObject())
	// 		),
	// 	})
	// 	.from(projectImageTypes)
	// 	.leftJoin(locales, TRUE())
	// 	.leftJoin(
	// 		projectImageTypesTranslations,
	// 		and(
	// 			eq(projectImageTypesTranslations.id, projectImageTypes.id),
	// 			eq(projectImageTypesTranslations.locale, locales.locale)
	// 		)
	// 	)
	// 	.groupBy(projectImageTypes.id);

	const test = await withTranslations(
		projectImageTypes,
		projectImageTypesTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id })
	);

	console.log(JSON.stringify(test, undefined, 2));

	const imageTypes = selectProjectImageTypes(event);
	const imageTemporalities = selectProjectImageTemporalities(event);

	const addImagesForm = superValidate(projectsImagesInsertSchema);

	return {
		images,
		addImagesForm,
		streamed: {
			imageTypes,
			imageTemporalities,
		},
	};
};

export const actions = {
	/**
	 * Add new image to project gallery. This action should occur after the file was uploaded to s3
	 * using a presigned url on the client's side.
	 */
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
	/**
	 * Delete an image in the database and its corresponding object in s3.
	 */
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
	/**
	 * Update image translations.
	 */
	update: async (event) => {
		await withAuth(event);
	},
	// addCredit: async (event) => {},
	// removeCredit: async (event) => {},
	// createCredit: async (event) => {},
	// deleteCredit: async (event) => {},
	/**
	 * Assign the image as the project's banner.
	 */
	promote: async (event) => {
		await withAuth(event);
	},
	/**
	 * Unassign project banner status.
	 */
	demote: async (event) => {
		await withAuth(event);
	},
};

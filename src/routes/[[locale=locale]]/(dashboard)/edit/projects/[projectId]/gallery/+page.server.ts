import { S3_BUCKET_NAME } from '$env/static/private';
import { withAuth } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { projectsImages } from '$lib/db/schema/public';
import { reduceTranslations } from '$lib/db/utils';
import { s3 } from '$lib/storage/s3.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	await withAuth(event);
	event.depends('project-editor:gallery');
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
	return { images };
};

export const actions = {
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
				const cmd = new DeleteObjectsCommand({
					Bucket: S3_BUCKET_NAME,
					Delete: {
						Objects: [{ Key: deleted.nameLg }, { Key: deleted.nameMd }, { Key: deleted.nameSm }],
					},
				});
				const data = await s3.send(cmd);
				if (data.Errors) {
					tx.rollback();
					console.error(data.Errors);
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

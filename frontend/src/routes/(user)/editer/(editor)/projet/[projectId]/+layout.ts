import { maybeSingle } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { alwaysArr, pgCubeToHsl, pgRangeToArr } from '$utils/format';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	// event.depends(LOAD_DEPENDENCIES.EDITOR_PROJECT);
	const db = await getDb(event);

	const descriptors = db.rpc('get_project_descriptors').then((res) => {
		if (res.error) {
			throw error(STATUS_CODES.InternalServerError, res.error);
		}
		return res.data;
	});

	const project = await db
		.from('projects')
		.select(
			`
			*,
			work_ids:projects_works (
				*
			),
			usages:projects_usages (
				*
			),
			location:projects_location (
				*
			),
			updated_by:users!projects_updated_by_id_fkey (
				*,
				role:users_roles!users_roles_user_id_fkey (
					*
				)
			),
			created_by:users!projects_created_by_id_fkey (
				*,
				role:users_roles!users_roles_user_id_fkey (
					*
				)
			),
			gallery:projects_images!project_id (
				*
			)
		`
		)
		.eq('id', event.params.projectId)
		.order('order', { foreignTable: 'projects_images', ascending: true })
		.maybeSingle()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			if (!res.data) {
				throw error(STATUS_CODES.NotFound, {
					message: `Il ne semble pas y avoir de projet ici, ou le projet ne vous est pas accessible.`,
				});
			}
			// Applying transformations to format data for easier client consumption.
			return {
				...res.data,
				cost_range: pgRangeToArr(res.data.cost_range),
				work_ids: alwaysArr(res.data.work_ids).map((w) => w.work_id),
				usages: alwaysArr(res.data.usages),
				gallery: alwaysArr(res.data.gallery).map((img) => ({
					...img,
					color_mean_hsl: pgCubeToHsl(img.color_mean_hsl),
					color_dominant_hsl: pgCubeToHsl(img.color_dominant_hsl),
					publicUrl: db.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(img.name).data
						.publicUrl,
				})),
				location: maybeSingle(res.data.location)!,
			};
		});

	return {
		project,
		descriptors,
	};
}) satisfies LayoutLoad;

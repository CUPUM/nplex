import { getDb } from '$utils/database';
import { LOAD_DEPENDENCIES, STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { alwaysarr, csshsl, jsrange } from '$utils/format';
import { error } from '@sveltejs/kit';
import { createCircle, getCircleCenter } from 'mapbox-gl-draw-geodesic';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	event.depends(LOAD_DEPENDENCIES.EDITOR_PROJECT);
	const db = await getDb(event);

	const descriptors = db
		.rpc('get_project_descriptors')
		.limit(1)
		.single()
		.then((res) => {
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
				work_id
			),
			secondary_usages:projects_secondary_usages (
				usage_id,
				category_id
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
		.single()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			// Applying transformations to format data for easier client consumption.
			return {
				...res.data,
				cost_range: jsrange(res.data.cost_range),
				work_ids: alwaysarr(res.data.work_ids).map((w) => w.work_id),
				secondary_usages: alwaysarr(res.data.secondary_usages),
				gallery: alwaysarr(res.data.gallery).map((img) => ({
					...img,
					color_mean_hsl: csshsl(img.color_mean_hsl),
					color_dominant_hsl: csshsl(img.color_dominant_hsl),
					publicUrl: db.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(img.name).data
						.publicUrl,
				})),
				location_geometry: (res.data.location_radius != null && res.data.location_geometry != null
					? createCircle(getCircleCenter(res.data.location_geometry), res.data.location_radius)
					: res.data.location_geometry) as GeoJSON.Feature,
			};
		});
	return {
		project,
		descriptors,
	};
}) satisfies PageLoad;

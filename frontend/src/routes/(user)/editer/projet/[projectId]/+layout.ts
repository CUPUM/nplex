import { getDb } from '$utils/database';
import { LOAD_DEPENDENCIES, STORAGE_BUCKETS } from '$utils/enums';
import { safeJsonParse } from '$utils/json';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	event.depends(LOAD_DEPENDENCIES.EDITOR_PROJECT);
	const db = await getDb(event);
	const descriptorsRes = await db.rpc('get_project_descriptors').single();
	if (descriptorsRes.error) {
		throw error(500, descriptorsRes.error);
	}
	const projectRes = await db
		.from('projects')
		.select(
			`
			*,
			work_ids:projects_works (
				work_id
			),
			updated_by:updated_by_id (
				*,
				role:users_roles!users_roles_user_id_fkey (
					*
				)
			),
			created_by:created_by_id (
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
		.single();
	if (projectRes.error) {
		throw error(500, projectRes.error);
	}
	// Doing some transformations to format data for the client.
	const projectTransform = {
		...projectRes.data,
		cost_range: safeJsonParse<[number, number]>(projectRes.data.cost_range) ?? [0, 0],
		work_ids: Array.isArray(projectRes.data.work_ids)
			? projectRes.data.work_ids.map((w) => w.work_id)
			: [projectRes.data?.work_ids?.work_id],
		gallery: (Array.isArray(projectRes.data.gallery)
			? projectRes.data.gallery
			: projectRes.data.gallery
			? [projectRes.data.gallery]
			: []
		).map((img) => ({
			...img,
			publicUrl: db.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(img.name).data.publicUrl,
		})),
	};
	return {
		project: projectTransform,
		descriptors: descriptorsRes.data,
	};
}) satisfies LayoutLoad;

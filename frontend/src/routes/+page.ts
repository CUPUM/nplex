import { getDb, pagination } from '$utils/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const db = await getDb(event);
	const projectsRes = await db
		.from('projects')
		.select(
			`
			*,
			gallery:projects_images!projects_images_project_id_fkey(*),
			banner:projects_images!projects_banner_id_fkey(*)
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10));
	if (projectsRes.error) {
		throw error(404, projectsRes.error);
	}

	return {
		showCategoryNav: true,
		projects: projectsRes.data,
	};
};

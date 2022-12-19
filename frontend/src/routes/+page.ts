import { getDb, pagination } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
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
		throw error(STATUS_CODES.InternalServerError, projectsRes.error);
	}

	const organisationsRes = await db
		.from('organizations')
		.select(
			`
			*
		`
		)
		.range(...pagination(0, 10));

	if (organisationsRes.error) {
		throw error(STATUS_CODES.InternalServerError, organisationsRes.error);
	}

	const actorsRes = await db
		.from('actors')
		.select(
			`
			*
		`
		)
		.range(...pagination(0, 20));

	if (actorsRes.error) {
		throw error(STATUS_CODES.InternalServerError, actorsRes.error);
	}

	return {
		showCategoryNav: true,
		projects: projectsRes.data,
		organisations: organisationsRes.data,
		actors: actorsRes.data,
	};
};

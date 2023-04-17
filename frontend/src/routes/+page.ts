import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { pagination } from '$utils/format';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);

	const splashImages = db
		.from('random_projects_images')
		.select('*')
		.limit(5)
		.then((res) => {
			if (res.error) throw error(STATUS_CODES.InternalServerError, res.error);
			return res.data;
		});

	const projects = db
		.from('explore_projects')
		.select(
			`
		*,
		gallery:projects_images!projects_images_project_fkey (
			*
		),
		banner:projects_images!projects_banner_fkey (
			*
		)
	`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10))
		.then((res) => {
			if (res.error) throw error(STATUS_CODES.InternalServerError, res.error);
			return res.data;
		});

	const organisations = db
		.from('organisations')
		.select(
			`
		*
	`
		)
		.range(...pagination(0, 10))
		.then((res) => {
			if (res.error) throw error(STATUS_CODES.InternalServerError, res.error);
			return res.data;
		});

	const actors = db
		.from('actors')
		.select(
			`
		*
		`
		)
		.range(...pagination(0, 20))
		.then((res) => {
			if (res.error) throw error(STATUS_CODES.InternalServerError, res.error);
			return res.data;
		});

	return {
		showCategoryNavbar: true,
		splashImages,
		projects,
		organisations,
		actors,
	};
};

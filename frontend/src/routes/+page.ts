import { getDb } from '$utils/database/client';
import { LOAD_DEPENDENCIES, STATUS_CODES } from '$utils/enums';
import { pagination } from '$utils/format';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.SESSION);

	const db = await getDb(event);

	const projects = db
		.from('projects')
		.select(
			`
			*,
			gallery:projects_images!projects_images_project_id_fkey(*),
			banner:projects_images!projects_banner_id_fkey(*)
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10))
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	const splashImages = db
		.from('random_project_images')
		.select('*')
		.limit(10)
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	const organisations = db
		.from('organizations')
		.select(
			`
			*
		`
		)
		.range(...pagination(0, 10))
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
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
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	return {
		showCategoryNavbar: true,
		projects,
		splashImages,
		organisations,
		actors,
	};
};

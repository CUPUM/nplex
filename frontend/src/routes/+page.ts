import { getDb } from '$utils/database/client';
import { LOAD_DEPENDENCIES, STATUS_CODES } from '$utils/enums';
import { pagination } from '$utils/format';
import { error } from '@sveltejs/kit';

async function getHomepageProjects(db: App.DatabaseClient) {
	const res = await db
		.from('projects')
		.select(
			`
			*,
			gallery:projects_images!projects_images_project_fkey(*),
			banner:projects_images!projects_banner_fkey(*)
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10));
	console.log(res);
	if (res.error) throw error;
	return res.data;
}

async function getHomepageSplashImages(db: App.DatabaseClient) {
	const res = await db.from('random_projects_images').select('*').limit(5);
	if (res.error) throw error;
	return res.data;
}

async function getHomepageOrgs(db: App.DatabaseClient) {
	const res = await db
		.from('organisations')
		.select(
			`
		*
	`
		)
		.range(...pagination(0, 10));
	if (res.error) throw error;
	return res.data;
}

async function getHomepageActors(db: App.DatabaseClient) {
	const res = await db
		.from('actors')
		.select(
			`
		*
	`
		)
		.range(...pagination(0, 20));
	if (res.error) throw error;
	return res.data;
}

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.SESSION);
	const db = await getDb(event);
	try {
		const splashImages = getHomepageSplashImages(db);
		const projects = getHomepageProjects(db);
		const organisations = getHomepageOrgs(db);
		const actors = getHomepageActors(db);
		return {
			splashImages,
			projects,
			organisations,
			actors,
			showCategoryNavbar: true,
		};
	} catch (err) {
		throw error(STATUS_CODES.InternalServerError, JSON.stringify(err));
	}
};

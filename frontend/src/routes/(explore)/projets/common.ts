import { getDb } from '$utils/database/client';
import { writableQuery } from '$utils/store';
import { writable } from 'svelte/store';

export const PROJECTS_FILTERS_W = 350;
export const PROJECTS_LIST_W = 350;

export const projectsFiltersOpened = writable(false);
export const projectsListOpened = writable(true);
export const projectsTs = writableQuery('', async (ts) => {
	const db = await getDb();
	if (!ts) {
		return [];
	}
	const projects = await db
		.from('explore_projects')
		.select(
			`
			title,
			type,
			location_obfuscated,
			summary,
			description
		`
		)
		.textSearch('projects_ts', `'${ts}'`);
	if (projects.error) {
		throw projects.error;
	}
	console.log(projects);
	// return projects.data;
});

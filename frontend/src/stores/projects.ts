import { db } from '$utils/database';
import type { Map as MLMap } from 'maplibre-gl';
import { derived, readable, writable } from 'svelte/store';
import { term } from './search';

/*
 * Projects UI and general purpose data stores
 */

/**
 * Enums used to describe and filter projects.
 * These include controled and enumerated lists from the database.
 */
export const projectsDescriptors = readable(null, function start(set) {

	async function setEnums() {
		const res = await fetch('/api/projects/lists.json');
		const lists = await res.json();
		set(lists);
	}
	setEnums();

	return function stop() {};
});

/**
 * Store handling the state of the projects' fitlers drawer (open or closed) to
 * ensure it is retained upon navigations.
 */
export const showFilters = (function () {
	const { subscribe, set, update } = writable(false);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v)
	};
})();

/**
 * Store for managing the filters' states
 */
interface ProjectsFilter {
	expanded: boolean;
	[key: string]: any;
}

export const projectsFilters = (function () {
	const { subscribe, update, set } = writable<ProjectsFilter[]>(null);

})();

/**
 * Projects' map store for contextless use across the app
 */
export const projectsMap = (function () {
	const { subscribe, set } = writable<MLMap>(null);
	return {
		subscribe
	};
})();

/**
 * List of projects fetched from the database. Individual items (project) should be expanded progressively
 * depending on navigations. i.e.: If a user visits the page for a specific project, the queried data should be appended
 * to the corresponding item in this store.
 */
// export const projects = derived([term, projectsFilters], (search, projectsFilters) => {
// 	console.log(search, projectsFilters);
// });

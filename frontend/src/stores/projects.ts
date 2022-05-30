import { readable, writable } from 'svelte/store';

/*
 * Projects UI and general purpose data stores
 */

/**
 * Enums used to describe and filter projects. These include controled and enumerated lists from the database.
 */
export const projectsEnums = readable(null, function start(set) {
	async function setEnums() {
		const res = await fetch('/api/projects/lists.json');
		const lists = await res.json();
		set(lists);
	}
	setEnums();

	return function stop() {};
});

/**
 * Store for managing the filters' states.
 */
interface ProjectsFilter {
	expanded: boolean;
	[key: string]: any;
}

export const projectsFilters = (function () {
	const { subscribe, update, set } = writable<ProjectsFilter[]>(null);
})();

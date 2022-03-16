import type { Map as MLMap } from 'maplibre-gl';
import { derived, writable } from 'svelte/store';
import { projectsFilters, term } from './search';

/**
 * Projects UI and general purpose data stores
 */
export const showProjectsFilters = (function () {
	const { subscribe, set, update } = writable(false);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v)
	};
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
 * Fetched projects from the database
 */
export const projects = derived([term, projectsFilters], (search, projectsFilters) => {
	console.log(search, projectsFilters);
});

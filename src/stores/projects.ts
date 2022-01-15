import { derived, writable } from 'svelte/store';
import type { Map as MLMap } from 'maplibre-gl';
import { projectsFilters, search } from './query';

/** Projects UI and general purpose data stores */

export const showProjectsFilters = (function () {
	const { subscribe, set, update } = writable(false);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v)
	};
})();

/** Projects' map store for contextless use across the app */

export const projectsMap = (function () {
	const { subscribe, set } = writable<MLMap>(null);
	return {
		subscribe
	};
})();

/** Fetched projects from the database */

export const projects = derived([search, projectsFilters], (search, projectsFilters) => {
	console.log(search, projectsFilters);
});

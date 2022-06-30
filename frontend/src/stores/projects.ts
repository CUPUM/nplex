import { browser } from '$app/env';
import type { Project } from '$utils/dummy';
import { LocalStorage, SearchParam } from '$utils/keys';
import { writable } from 'svelte/store';

/**
 * Global state of the projects' fitlers drawer.
 */
export const showProjectsFilters = (function () {
	const { subscribe, set, update } = writable<boolean>(false);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state of the projects' map pane.
 */
export const showProjectsMap = (function () {
	const { subscribe, set, update } = writable<boolean>(true);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state of the projects' card list pane.
 */
export const showProjectsList = (function () {
	const { subscribe, set, update } = writable<boolean>(true);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Store of filtered projects selected from the database.
 */
export const projects = (function () {
	const stored = browser ? localStorage.getItem(LocalStorage.Projects) : null;
	const { subscribe, update, set } = writable<Project[]>(JSON.parse(stored) || []);

	return {
		subscribe,
		update,
		set,
	};
})();
/**
 * Mirror the store's updates to the client's local storage.
 */
if (browser) {
	projects.subscribe((value) => {
		localStorage.setItem(LocalStorage.Projects, JSON.stringify(value));
	});
}

/**
 * Store for managing the filters' states.
 */
export const projectsFilters = (function () {
	const init: Partial<Record<SearchParam, ProjectsFilter>> = {};

	const { subscribe, update, set } = writable<Partial<Record<SearchParam, ProjectsFilter>>>(init);

	function toggleExpand(filterId: SearchParam) {
		update((curr) => {
			const updated = curr;
			updated[filterId].expanded = !updated[filterId].expanded;
			return updated;
		});
	}

	return {
		subscribe,
		update,
		set,
		toggleExpand,
	};
})();
interface ProjectsFilter {
	expanded: boolean;
	value: any;
}
/**
 * Mirror the filters store's changes into the client's URL search params and re-query the database. Keep these
 * behaviors throttled or debounced to avoid api flooding.
 */
if (browser) {
	projectsFilters.subscribe((value) => {
		// Update url
		// Query the db
	});
}

// projectsFilters.subscribe((v) => {
// 	Object.entries(v).forEach(([k, v]) => {
// 		if (v != defaultProjectsFilters[k]) {
// 			query.set(k, v.toString());
// 		} else {
// 			query.delete(k);
// 		}
// 	});
// 	updateURL();
// });

/**
 * Store of saved / cached latest single project edits.
 */
// export const projectsEdits = ...

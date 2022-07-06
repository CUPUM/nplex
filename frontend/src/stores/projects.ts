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

if (browser) {
	// Mirror the store's updates to the client's local storage.
	projects.subscribe((value) => {
		localStorage.setItem(LocalStorage.Projects, JSON.stringify(value));
	});
}

/**
 * Global store for state retention of filters panes (expanded vs collapsed)
 */
export const projectsFiltersPanes = writable<Record<string, boolean>>({});

interface ProjectsFilter {
	/**
	 * Current stored value of the filter used for formulating db queries and url search params.
	 */
	value: any;
	/**
	 * Referential value used to signal to the store to ignore this filter in queries and remove it from the client
	 * url's search params.
	 */
	ignoreValue: any;
	/**
	 * Boolean state reflecting the comparison result between `value` and `ignoreValue`
	 */
	ignore?: boolean;
}
/**
 * Store for managing the filters' states.
 */
export const projectsFilters = (function () {
	// This index of default filters' values MUST be exhaustive.
	const filtersDefault: Partial<Record<SearchParam, ProjectsFilter>> = {};

	// Getting initial values for first load by parsing client's url. (Useful for sharing and page reloads).
	// (get the url search params, parse, and change filtersDefault accordingly)
	const init = { ...filtersDefault };

	const { subscribe, update, set } = writable<Partial<Record<SearchParam, ProjectsFilter>>>(init);

	function isIgnoreValue(filter: ProjectsFilter) {
		// To do: potentially do a more thorough check for different-ordered object keys and deep nestings?
		return JSON.stringify(filter.value) === JSON.stringify(filter.ignoreValue);
	}

	function setFilterWithCheck(newValue) {
		Object.keys(newValue).map((k) => {
			if (newValue[k].ignoreValue !== undefined) {
				newValue[k].ignore = isIgnoreValue(newValue[k]);
			}
		});
		console.log('Setting with check', newValue);
		set(newValue);
	}

	return {
		subscribe,
		set: setFilterWithCheck,
		// Implement method so filters set to default values are removed from the store.
	};
})();

/**
 * Store of saved / cached latest single project edits.
 */
// export const projectsEdits = ...

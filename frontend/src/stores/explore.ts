/**
 * Global states for the explore pages.
 */

import { writable } from 'svelte/store';

/**
 * Global state of the fitlers drawer.
 */
export const showExploreFilters = (function () {
	const { subscribe, set, update } = writable<boolean>(false);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state to retain which filter boxes have been expanded / minimized.
 */
export const exploreFiltersStates = (function () {
	const { subscribe, set, update } = writable<Record<string, boolean>>({});
	return {
		subscribe,
		set,
		toggle: (key: string, defaultState: boolean = true) =>
			update((v) => {
				const newState = v.hasOwnProperty(key) ? !v[key] : defaultState;
				return { ...v, key: newState };
			}),
	};
})();

/**
 * Global state of projects' map pane.
 */
export const showExploreMap = (function () {
	const { subscribe, set, update } = writable<boolean>(true);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state of projects' map pane.
 */
export const showArticleMap = writable<boolean>(false);

/**
 * Global state of projects' map pane.
 */
export const showExploreList = (function () {
	const { subscribe, set, update } = writable<boolean>(true);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state of wether the current explore route is an article route.
 */
export const isExploreArticle = writable<boolean>(false);

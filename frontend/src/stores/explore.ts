/**
 * Global states for the explore pages.
 */

import { writable } from 'svelte/store';

/**
 * Global state of the fitlers drawer.
 */
export const showExploreFilters = (function () {
	const { subscribe, set, update } = writable(false);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state of projects' map pane.
 */
export const showExploreMap = (function () {
	const { subscribe, set, update } = writable(true);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state of projects' map pane.
 */
export const showExploreList = (function () {
	const { subscribe, set, update } = writable(true);
	return {
		subscribe,
		set,
		toggle: () => update((v) => !v),
	};
})();

/**
 * Global state of wether the current explore route is an article route.
 */
export const isExploreArticle = writable(false);

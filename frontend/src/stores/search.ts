import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { ExploreRoute, exploreRoutes } from '$utils/routes';
import { get, writable } from 'svelte/store';
import { route, routeSegments } from './route';

// To do
const init = new URLSearchParams(''); // window?.location.search

/**
 * Main search input
 */

export const term = writable(init.get('term') || '');

/**
 * Currently browsed category
 */

export const category = (function () {
	const { subscribe, set } = writable<ExploreRoute['category']>(null);

	// const book = exploreRoutes.reduce((acc, curr) => {
	// 	return acc.set(curr.category, curr);
	// }, new Map<string, ExploreRoute>());

	// function setCategory(newCategory: ExploreRoute['category']) {
	// 	const newHref = book.get(newCategory).href;
	// 	if (newHref !== get(page).url.pathname) {
	// 		goto(newHref);
	// 		// Do more routing stuff if necessary
	// 	}
	// 	set(newCategory);
	// }

	return {
		subscribe,
		set
	};
})();

/**
 * Projects search & filters
 */

const defaultProjectsFilters = {
	test: 2,
	other: false,
	check: true,
	text: '',
	array: ['index0', 'index1']
};

export type ProjectsFilters = typeof defaultProjectsFilters;

const initProjectsFilters = { ...defaultProjectsFilters };

Object.keys(defaultProjectsFilters).forEach((k) => {
	if (init.getAll(k).length > 1) {
		initProjectsFilters[k] = init.getAll(k);
	} else if (init.getAll(k).length === 1) {
		initProjectsFilters[k] = init.get(k);
	}
});

export const projectsFilters = writable({ ...initProjectsFilters });

/**
 * Orgs search & filters
 */

// ...

/**
 * Actors search & filters
 */

// ...

/**
 * General query string construction and handling
 */

const query = new URLSearchParams();

function updateURL() {
	// goto(`?${query.toString()}` , {
	// 	replaceState: true,
	// 	noscroll: true,
	// 	keepfocus: true
	// })
}

term.subscribe((v) => {
	if (v !== '') {
		query.set('term', v);
	} else {
		query.delete('term');
	}
	updateURL();
});

projectsFilters.subscribe((v) => {
	Object.entries(v).forEach(([k, v]) => {
		if (v != defaultProjectsFilters[k]) {
			query.set(k, v.toString());
		} else {
			query.delete(k);
		}
	});
	updateURL();
});

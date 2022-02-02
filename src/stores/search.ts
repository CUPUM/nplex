import type { ExploreCategory } from '$utils/routes';
import { goto } from '$app/navigation';
import { exploreRoutes } from '$utils/routes';
import { writable } from 'svelte/store';

// To do
const init = new URLSearchParams(''); // window?.location.search

/** Main search input */

export const term = writable(init.get('term') || '');

export const category = (function () {
	// To do
	// Init store according to current route...
	const { subscribe, set } = writable<ExploreCategory>(null);
	return {
		subscribe,
		set
	};
})();

/** Projects search & filters */

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

/** Orgs search & filters */

// ...

/** Actors search & filters */

// ...

/** General query string construction and handling */

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

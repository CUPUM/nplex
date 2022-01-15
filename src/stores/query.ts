import { goto } from '$app/navigation';
import { writable } from 'svelte/store';

const init = new URLSearchParams(''); // window?.location.search

/** Main search input */

export const search = writable(init.get('search') || '');

/** Projects filters */

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

/** Query string construction and handling */

const query = new URLSearchParams();

function updateURL() {
	// goto(`?${query.toString()}` , {
	// 	replaceState: true,
	// 	noscroll: true,
	// 	keepfocus: true
	// })
}

search.subscribe((v) => {
	if (v !== '') {
		query.set('search', v);
	} else {
		query.delete('search');
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

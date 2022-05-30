import type { Category } from 'src/types/categories';
import { writable } from 'svelte/store';

/**
 * ! DEPRECATED (Find way to handle this state with layout) ! Category nav display state, estabished inside layouts and
 * routes and cleared in onDestroy lifecycle.
 */
export const showCategory = writable<boolean>(false);

/**
 * ! DEPRECATED ! Searchbar display state, estabished inside layouts and routes and cleared in onDestroy lifecycle.
 */
export const showSearchbar = writable<boolean>(false);

/**
 * To do: initial search params extracted from the user-queried url. This feature is essential for url-sharing to work properly.
 */
const initParams = new URLSearchParams(''); // window?.location.search

/**
 * Main search text input, typically corresponding to the text inserted in the search bar's input field.
 */
export const term = writable(initParams.get('term') || '');

/**
 * Currently browsed category.
 */
export const category = writable<Category>(null);

/**
 * General query string construction and handling.
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

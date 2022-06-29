import { writable } from 'svelte/store';

/**
 * To do: initial search params extracted from the user-queried url. This feature is essential for url-sharing to work properly.
 */
const initParams = new URLSearchParams(''); // window?.location.search

/**
 * Main search text input, typically corresponding to the text inserted in the search bar's input field.
 */
export const exploreSearchterm = writable(initParams.get('term') || '');

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

exploreSearchterm.subscribe((v) => {
	if (v !== '') {
		query.set('term', v);
	} else {
		query.delete('term');
	}
	updateURL();
});

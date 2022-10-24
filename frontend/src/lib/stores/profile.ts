/**
 * App-wide store hosting the client-user's profile as fetched from the database.
 *
 * To do:
 *
 * - Link with localStorage.
 * - Add/combine types generated from schema.
 */

import { writable } from 'svelte/store';

export const userProfile = (function () {
	const { subscribe, set, update } = writable(null);
	return {
		subscribe,
	};
})();

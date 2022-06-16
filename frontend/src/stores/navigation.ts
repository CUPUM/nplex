import { page } from '$app/stores';
import { getSegments } from '$utils/helpers/url';
import { mainRoutes } from '$utils/routes';
import type { Category } from 'src/types/categories';
import { derived, writable, type Writable } from 'svelte/store';

/**
 * App-wide store containing information about the current route state of the client. Useful for navbar highlights,
 * nested page transitions, etc. Store properties provide various route informations and/or object definitions from
 * /utils/routes.ts with matchings based on the current page.url.pathname.
 *
 * When matchings are not applicable for the current location, concerned property values should be equal to undefined.
 */
export const currentPath = derived(page, ($page) => {
	const segments = getSegments($page.routeId);
	// Finding the best-matching main path. Try as much as possible to always have this defined
	let main: string = undefined;
	const mainRoute = mainRoutes.find((r) => r.pathname === segments[0]);
	// If there is a mainRoute directly corresponding to the pathname's first segment.
	if (mainRoute) {
		main = mainRoute.pathname;
	}
	// Else, if the first segment corresponds to one of these, reflect the root route (aka "explore").
	else if (['/projets', '/organisations', '/acteurs'].includes(segments[0])) {
		main = '/';
	}
	// Add additionnal associations here...
	return {
		/**
		 * Decomposed current pathname as an array of segments. Segments are absolute relatively to their closest
		 * parent, i.e., they are prefixed with `/`
		 */
		segments,
		/**
		 * Best-matching main path (root-level segment) for the current url.pathname, including facaded path cases where
		 * a route should point to a different root-level path. Useful for main navbar.
		 */
		main,
	};
});

/**
 * Which category is currently loading, if navigating, Default to null;
 */
export const loadingCategory: Writable<Category> = writable(null);

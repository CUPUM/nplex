/**
 * App-wide stores containing information about the current route state of the client. Useful for page transitions,
 * navbar highlights, etc.
 */

import { base } from '$app/paths';
import { page } from '$app/stores';
import { getSegments } from '$utils/helpers/url';
import { allRoutes, userBaseRoute, type ExploreRoute, type Route } from '$utils/routes';
import { exploreRoutes, topRoutes } from '$utils/routes';
import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';

/**
 * Store providing the current route path as an array of segments. Segments are absolute relatively to their previous
 * sibling, i.e., they are prefixed with `/`
 */
export const routeSegments = derived(page, ($page) => {
	return getSegments($page.url);
});

/**
 * Store providing the current route object obtained by finding the route definition in /utils/routes.ts that
 * corresponds to the current page.url.pathname.
 */
export const route = derived(page, ($page) => {
	/**
	 * Finding the closest-defined parent route from current url tree, assuming undefined routes contain dynamic
	 * parameters that should be ignored.
	 */
	// const unparamedUrl = regex.;
	return allRoutes.find((route) => route.pathname === $page.url.pathname);
});

/**
 * Store providing only the current topRoute, i.e. a route object that remains unaffected by nested route navigation.
 * Useful for main layout transitions and main navbar states.
 */
export const topRoute = derived(route, ($route) => {
	return $route?.parentTopRoute || $route;
});

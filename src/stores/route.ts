import { base } from '$app/paths';
import { page } from '$app/stores';
import { ExploreRoute, exploreRoutes, Route, topRoutes } from '$utils/routes';
import { derived, Readable } from 'svelte/store';

export const routeSegments = derived(page, ($page) => {
	return $page.url.pathname
		.replace(base, '')
		.replace(/^\/+/, '')
		.split('/')
		.map((segment) => '/' + segment);
});

export const route = derived(routeSegments, ($routeSegments) => {
	return <Route | ExploreRoute>[...topRoutes, ...exploreRoutes].find((route) => route.href === $routeSegments[0]);
});

export const topRoute = derived(route, ($route) => {
	return $route?.parentRoute || $route;
});
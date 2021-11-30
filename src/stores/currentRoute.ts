import { page } from '$app/stores';
import { exploreRoutes, mainRoutes } from '$utils/routes';
import { getSegments } from '$utils/url';
import { derived } from 'svelte/store';


export const rootRoute = mainRoutes.find(route => route.href === '/');

export const currentRoute = derived(
	page,
	page => {
		const segments = getSegments(page.path);
		const mainRoute = mainRoutes.find(route => route.href === segments[0]);
		if (mainRoute && segments[0] !== '/') return [mainRoute];
		const exploreRoute = exploreRoutes.find(route => route.href === segments[0]);
		if (exploreRoute) return [rootRoute, exploreRoute];
	}
);
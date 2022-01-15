import { base } from '$app/paths';
import { page } from '$app/stores';
import { exploreRoutes, mainRoutes } from '$utils/routes';
import { derived } from 'svelte/store';

export const rootRoute = mainRoutes.find((r) => r.href === '/');

export const currentSegments = derived(page, (page) => {
	return page.url.pathname
		.replace(base, '')
		.replace(/^\/+/, '')
		.split('/')
		.map((segment) => '/' + segment);
});

export const currentMainRoute = derived(currentSegments, (currentSegments) => {
	const mainRoute = mainRoutes.find((mainRoute) => mainRoute.href === currentSegments[0]);
	if (mainRoute) return mainRoute;
	const exploreRoute = exploreRoutes.find(
		(exploreRoute) => exploreRoute.href === currentSegments[0]
	);
	if (exploreRoute) return rootRoute;
	return { href: currentSegments[0] };
});

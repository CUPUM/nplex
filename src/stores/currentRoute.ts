import { page } from '$app/stores';
import { mainRoutes } from '$utils/routes';
import { getSegments } from '$utils/url';
import { derived } from 'svelte/store';


export const currentRoute = derived(
	page,
	page => {
		const segments = getSegments(page.path);
		console.log(segments);
		const mainRoute = mainRoutes.find(route => route.href === segments[0]);
		console.log(mainRoute);
		return mainRoute;
	}
);
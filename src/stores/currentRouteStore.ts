import { page } from '$app/stores';
import { exploreRoutes, mainRoutes } from '$utils/routes';
import { derived } from 'svelte/store';

const rootRoute = mainRoutes.find(r => r.href === '/');

export const currentMainRoute = derived(
	page,
	page => {
		const segments = page.path.replace(/^\/+/, '').split('/').map(segment => '/' + segment);
		return mainRoutes.find(r => r.href === segments[0]) || exploreRoutes.find(er => er.href === segments[0]) ? rootRoute : null;
	}
);
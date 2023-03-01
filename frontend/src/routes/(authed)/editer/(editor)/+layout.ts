import type { ComponentProps } from 'svelte';
import type { LayoutLoad } from './$types';
import type EditorCrumbs from './EditorCrumbs.svelte';

export const load = (async (event) => {
	const baseCrumb: ComponentProps<EditorCrumbs>['crumbs'][number] = {
		title: 'Éditeur',
		pathname: '/editer',
	};

	return {
		crumbs: [baseCrumb],
	};
}) satisfies LayoutLoad;

import type { ComponentProps } from 'svelte';
import type EditorCrumbs from './EditorCrumbs.svelte';

export const load = async (event) => {
	const baseCrumb: ComponentProps<EditorCrumbs>['crumbs'][number] = {
		title: 'Éditeur',
		pathname: '/editer',
	};

	return {
		crumbs: [baseCrumb],
	};
};

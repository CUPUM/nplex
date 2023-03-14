import type { ComponentProps } from 'svelte';
import type EditorBreadcrumbs from './EditorBreadcrumbs.svelte';

export const load = async (event) => {
	const baseCrumb: ComponentProps<EditorBreadcrumbs>['crumbs'][number] = {
		title: 'Éditeur',
		pathname: '/editer',
	};

	return {
		crumbs: [baseCrumb],
	};
};

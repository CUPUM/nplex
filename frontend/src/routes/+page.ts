import type { PageLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: PageLoad = async ({ data, parent }) => {
	// const parentData = await parent();

	return {
		showCategoryNav: true,
	};
};

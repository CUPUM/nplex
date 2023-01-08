import type { LayoutLoad } from './$types';

export const load = ((event) => {
	return {
		showCategoryNav: true,
	};
}) satisfies LayoutLoad;

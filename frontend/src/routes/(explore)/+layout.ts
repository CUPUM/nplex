import type { LayoutLoad } from './$types';

export const load = ((event) => {
	return {
		showCategoryNavbar: true,
	};
}) satisfies LayoutLoad;

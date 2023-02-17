import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { session } = event.data;

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNavbar: false,
		showExploreSearchbar: false,
	};
}) satisfies LayoutLoad;

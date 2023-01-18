import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { session } = event.data;

	// console.log('Root layout', session);

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
}) satisfies LayoutLoad;

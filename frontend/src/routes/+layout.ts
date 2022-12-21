import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const { session } = event.data;

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

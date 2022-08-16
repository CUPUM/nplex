import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	return {
		showFooter: true,
		showCategoryNav: false,
		category: null,
		showExploreSearchbar: false,
	};
};

import type { Category } from '$types/categories';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	let user = null; // await fetch(); // Throughout app, invalidate(enpoint) to refresh.
	let category: Category = null;
	let previousUrl: string;

	return {
		user,
		category,
		previousUrl,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

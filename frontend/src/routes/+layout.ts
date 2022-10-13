import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const session: App.PageData['session'] = await (await fetch('/api/auth/session.json', { method: 'GET' })).json();

	return {
		session,
		category: null,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const sessionRes = await fetch('/api/auth/session.json', { method: 'GET' });
	const session: App.PageData['session'] = await sessionRes.json();

	return {
		session,
		category: null,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	let session: App.PageData['session'] = null;
	try {
		const sessionRes = await event.fetch('/api/auth/session.json', { method: 'POST' });
		session = (await sessionRes.json()) ?? null;
	} catch (err) {}

	return {
		session,
		category: null,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

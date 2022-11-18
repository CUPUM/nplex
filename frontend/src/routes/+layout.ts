import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	let session: App.PageData['session'];
	try {
		const sessionRes = await event.fetch('/api/auth/session.json', { method: 'POST' });
		session = (await sessionRes.json()) ?? undefined;
	} catch (err) {}

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

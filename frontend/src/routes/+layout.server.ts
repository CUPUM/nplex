import { LOAD_DEPENDENCIES } from '$utils/enums';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.SESSION);

	const sessionRes = await event.fetch('/api/auth/session.json', { method: 'POST' });
	const session: App.PageData['session'] = await sessionRes.json();

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNavbar: false,
		showExploreSearchbar: false,
	};
};

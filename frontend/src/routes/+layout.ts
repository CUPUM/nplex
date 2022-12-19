import { LOAD_DEPENDENCIES } from '$utils/enums';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const sessionRes = await event.fetch('/api/auth/session.json', { method: 'POST' });
	const session: App.PageData['session'] = await sessionRes.json();

	event.depends(LOAD_DEPENDENCIES.SESSION);

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

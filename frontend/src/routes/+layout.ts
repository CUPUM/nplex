import { LoadDependency } from '$utils/enums';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const sessionRes = await event.fetch('/api/auth/session.json', { method: 'POST' });

	event.depends(LoadDependency.Session);

	return {
		theme: event.data.theme,
		session: (await sessionRes.json()) ?? undefined,
		category: undefined,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

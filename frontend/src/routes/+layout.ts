import { LOAD_DEPENDENCIES } from '$utils/enums';
import type { NplexSession } from 'src/app';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const sessionRes = await event.fetch('/api/auth/session.json', { method: 'POST' });
	const session: NplexSession | undefined = await sessionRes.json();

	event.depends(LOAD_DEPENDENCIES.SESSION);

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

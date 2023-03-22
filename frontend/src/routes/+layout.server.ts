import { LOAD_DEPENDENCIES } from '$utils/enums';
import type { LayoutServerLoadEvent } from './$types';

async function getSession(event: LayoutServerLoadEvent) {
	const res = await event.fetch('/api/auth/session.json', { method: 'POST' });
	const session: App.PageData['session'] = await res.json();
	return session;
}

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.SESSION);

	const session = getSession(event);

	return {
		session,
		category: undefined,
		showFooter: true,
		showCategoryNavbar: false,
		showExploreSearchbar: false,
	};
};

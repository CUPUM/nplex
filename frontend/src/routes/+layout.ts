import type { LayoutLoad } from './$types';
import type { AppUserSession } from './api/auth/update.json/+server';

export const load: LayoutLoad = async ({ fetch }) => {
	let session: AppUserSession = null;

	const sessionRes = await fetch('/api/auth/update.json', { method: 'GET' });
	session = await sessionRes.json();

	return {
		session,
		category: null,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

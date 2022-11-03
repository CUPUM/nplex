import type { AuthSessionResponse } from '$api/auth/session.json/+server';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const authRes = await fetch('/api/auth/session.json', { method: 'GET' });
	const { session, previousSessionId }: AuthSessionResponse = await authRes.json();

	return {
		session,
		previousSessionId,
		category: null,
		showFooter: true,
		showCategoryNav: false,
		showExploreSearchbar: false,
	};
};

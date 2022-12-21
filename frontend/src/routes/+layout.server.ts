import { LOAD_DEPENDENCIES } from '$utils/enums';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const sessionRes = await event.fetch('/api/auth/session.json', { method: 'POST' });
	const session: App.PageData['session'] = await sessionRes.json();

	event.depends(LOAD_DEPENDENCIES.SESSION);

	return {
		session,
	};
};

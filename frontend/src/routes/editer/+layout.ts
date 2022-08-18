import { guard } from '$utils/routing/guards';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ session, url, fetch }) => {
	// Make sure the client is at least an authed user (hence checking against 'allRoles').
	const res = await guard.role({ roles: ['admin', 'editor', 'visitor'], session, url });
	return res;
};

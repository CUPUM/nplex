import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data, parent }) => {
	const { user } = await parent();
	// const res = await guard.role({ roles: ['admin', 'editor', 'visitor'], user, url });
	return {};
};

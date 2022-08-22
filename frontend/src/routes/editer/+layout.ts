import { roleGuard } from '$utils/routing/guard';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, fetch, parent }) => {
	const { session } = await parent();
	await roleGuard({ roles: ['admin', 'editor', 'visitor'], session });
	return;
};

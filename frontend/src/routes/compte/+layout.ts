import { roleGuard } from '$utils/routing/guard';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, url }) => {
	const { session } = await parent();

	await roleGuard({ session, roles: ['visitor', 'admin', 'editor'] });

	return {};
};

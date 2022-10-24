import { roleGuard } from '$utils/routing/guard';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();

	console.log('Running layout.ts');

	await roleGuard({ session, roles: ['visitor', 'admin', 'editor'] });

	return {};
};

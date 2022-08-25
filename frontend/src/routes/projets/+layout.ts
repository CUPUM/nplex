import { getContextualDbClient } from '$utils/database/database';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	const db = getContextualDbClient();

	const { data: projectDescriptors, error } = await db.rpc('');

	return {
		category: 'projects',
		showExploreSearchbar: true,
		projectDescriptors,
	};
};

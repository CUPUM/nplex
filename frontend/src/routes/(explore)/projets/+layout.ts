import { dbClient } from '$utils/database';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	const db = dbClient.getForContext();

	// const { data: projectDescriptors, error } = await db.rpc('');

	return {
		category: 'projects',
		showExploreSearchbar: true,
		// projectDescriptors,
	};
};

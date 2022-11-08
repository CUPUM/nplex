import { dbClient } from '$utils/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, parent }) => {
	const { session } = await parent();

	const db = dbClient.getForContext(session?.access_token);
	const projectsRes = await db.from('projects').select('*');
	if (projectsRes.error) throw error(500, projectsRes.error);

	return {
		showFooter: false,
		projects: projectsRes.data,
	};
};

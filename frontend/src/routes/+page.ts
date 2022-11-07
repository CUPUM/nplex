import { dbClient, getPagination } from '$utils/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, parent }) => {
	const { session } = await parent();
	const db = dbClient.getForContext(session?.access_token);
	const projectsRes = await db
		.from('projects')
		.select('*')
		.order('updated_at', { ascending: false })
		.range(...getPagination(0, 10));
	if (projectsRes.error) throw error(404, projectsRes.error);

	return {
		showCategoryNav: true,
		projects: projectsRes.data,
	};
};

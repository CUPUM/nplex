import { getDb } from '$utils/database/client';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);
	const projectsRes = await db.from('projects').select('*');
	if (projectsRes.error) throw error(500, projectsRes.error);

	return {
		showFooter: false,
		projects: projectsRes.data,
	};
};

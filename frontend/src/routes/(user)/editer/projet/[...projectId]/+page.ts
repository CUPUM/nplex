import { getDb } from '$utils/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const db = await getDb(event);
	const descriptorsRes = await db.rpc('get_project_descriptors').single();
	if (descriptorsRes.error) {
		throw error(500, descriptorsRes.error);
	}
	const projectRes = await db
		.from('projects')
		.select(
			`
			*,
			work_ids:projects_works(*),
			updated_by:updated_by_id(
				*,
				role:users_roles!users_roles_user_id_fkey(
					*
				)
			),
			created_by:created_by_id(
				*,
				role:users_roles!users_roles_user_id_fkey(
					*
				)
			)
		`
		)
		.eq('id', event.params.projectId)
		.single();
	if (projectRes.error) {
		throw error(500, projectRes.error);
	}
	return {
		project: projectRes.data,
		descriptors: descriptorsRes.data,
	};
};

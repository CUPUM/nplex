import { fixTypes } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';

async function getCollaborators(db: App.DatabaseClient, projectId: string) {}

export const load = async (event) => {
	const db = await getDb(event);
	const collaborators = db
		.from('projects_users')
		.select(
			`
				*,
				user:users!projects_users_user_id_fkey (*)
			`
		)
		.eq('project_id', event.params.projectId)
		.then((res) => {
			if (res.error) throw error(STATUS_CODES.InternalServerError, JSON.stringify(res.error));
			return fixTypes(res.data).toSingle<{ user: true }>().data;
		});
	return {
		collaborators,
	};
};

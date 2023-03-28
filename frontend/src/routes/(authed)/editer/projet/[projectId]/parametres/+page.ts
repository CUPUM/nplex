import type { TableRow } from '$types/database/utils';
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
				user:users!projects_users_user_fkey (*)
			`
		)
		.eq('project', event.params.projectId)
		.returns<TableRow<'projects_users'> & { user: TableRow<'users'> }[]>()
		.then((res) => {
			if (res.error) throw error(STATUS_CODES.InternalServerError, JSON.stringify(res.error));
			return res.data;
		});
	return {
		collaborators,
	};
};

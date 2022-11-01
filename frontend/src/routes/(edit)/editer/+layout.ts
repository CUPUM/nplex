import { dbClient } from '$utils/database/database';
import { roleGuard } from '$utils/routing/guard';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, fetch, parent }) => {
	const { session } = await parent();

	await roleGuard({ roles: ['admin', 'editor', 'visitor'], session });

	const db = dbClient.getForContext(session.access_token);

	// const projects = await db
	// 	.from('projects')
	// 	.select(`*, users:projects_users!inner(*)`)
	// 	.filter()

	const projects = [
		{ title: 'Titre de projet' },
		{ title: 'Titre de projet 2' },
		{ title: 'Titre de projet 3' },
		{ title: 'Titre de projet 4' },
	];
	const organisations = [];
	const actors = [];

	return {
		projects,
		organisations,
		actors,
	};
};

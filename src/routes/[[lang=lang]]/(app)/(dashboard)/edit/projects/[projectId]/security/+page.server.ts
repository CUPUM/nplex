import { withAuth } from '$lib/auth/guard.server';
import { authorizeProjectUpdate } from '$lib/db/authorization.server';
import { dbpool } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	const session = await withAuth(event);
	const [project] = await dbpool
		.select({ id: projects.id })
		.from(projects)
		.where(and(authorizeProjectUpdate(session), eq(projects.id, event.params.projectId)))
		.limit(1);
	if (!project) {
		throw error(STATUS_CODES.NOT_FOUND, { title: 'Not found', message: 'Project not found' });
	}
};

export const actions = {
	delete: async (event) => {
		console.log('Deleting');
		const session = await withAuth(event);
		try {
			await dbpool
				.delete(projects)
				.where(and(authorizeProjectUpdate(session), eq(projects.id, event.params.projectId)));
		} catch (e) {
			throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_PERMANENTLY, '/edit/projects');
	},
};

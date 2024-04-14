import { authorize } from '$lib/auth/rbac.server';
import { STATUS_CODES } from '$lib/common/constants';
import { db } from '$lib/db/db.server';
import { isEditableProject } from '$lib/db/queries.server';
import { projects } from '$lib/db/schema/public';
import { error, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	authorize(event);
	const [project] = await db
		.select({ id: projects.id })
		.from(projects)
		.where(and(isEditableProject(event.locals.user), eq(projects.id, event.params.projectId)))
		.limit(1);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND, { title: 'Not found', message: 'Project not found' });
	}
};

export const actions = {
	delete: async (event) => {
		console.log('Deleting');
		authorize(event);
		try {
			await db
				.delete(projects)
				.where(and(isEditableProject(event.locals.user), eq(projects.id, event.params.projectId)));
		} catch (e) {
			error(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
		redirect(STATUS_CODES.MOVED_PERMANENTLY, '/edit/projects');
	},
};

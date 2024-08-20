import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { canEditProject } from '$lib/crud/queries/projects';
import { db } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public.server';
import { error, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	authorize(event);
	const [project] = await db
		.select({ id: projects.id })
		.from(projects)
		.where(and(canEditProject(event.locals.user), eq(projects.id, event.params.projectId)))
		.limit(1);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND);
	}
};

export const actions = {
	delete: async (event) => {
		console.log('Deleting');
		authorize(event);
		try {
			await db
				.delete(projects)
				.where(and(canEditProject(event.locals.user), eq(projects.id, event.params.projectId)));
		} catch (e) {
			error(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
		redirect(STATUS_CODES.MOVED_PERMANENTLY, '/edit/projects');
	},
};

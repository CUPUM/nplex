import { authorize } from '$lib/auth/rbac.server';
import { db } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	authorize(event);
	const [project] = await db
		.insert(projects)
		.values({
			createdById: event.locals.user.id,
			updatedById: event.locals.user.id,
		})
		.returning({ id: projects.id });
	if (!project) {
		error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
	redirect(STATUS_CODES.MOVED_TEMPORARILY, `/edit/projects/${project.id}`);
};

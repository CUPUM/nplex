import { dbhttp } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) {
		error(STATUS_CODES.UNAUTHORIZED);
	}
	const [project] = await dbhttp
		.insert(projects)
		.values({
			createdById: session.user.id,
			updatedById: session.user.id,
		})
		.returning({ id: projects.id });
	redirect(STATUS_CODES.MOVED_TEMPORARILY, `/edit/projects/${project.id}`);
};

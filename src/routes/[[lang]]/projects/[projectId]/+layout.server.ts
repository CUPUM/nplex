import { canEditProject } from '$lib/crud/queries/projects';
import { db } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public.server';

export const load = async (event) => {
	return {
		canEditProject: event.locals.user
			? (await db.select({}).from(projects).where(canEditProject(event.locals.user))).length
			: false,
	};
};

import { withAuth } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const session = await withAuth(event);
	const project = dbpool
		.select()
		.from(projects)
		.where(eq(projects.id, event.params.projectId))
		.leftJoin(projectsTranslations, eq(projects.id, projectsTranslations.id));
	return { project };
};

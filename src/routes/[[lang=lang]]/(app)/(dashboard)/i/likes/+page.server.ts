import { db } from '$lib/db/db.server';
import { projects, projectsLikes, projectsTranslations } from '$lib/db/schema/public';
import { getColumns, withTranslation } from '$lib/db/utils.server';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const session = await event.locals.authorize();
	const pt = withTranslation(event, projects, projectsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	}).as('pt');
	const ptColumns = getColumns(pt);
	const likedProjects = await db
		.select({ ...ptColumns })
		.from(projectsLikes)
		.where(eq(projectsLikes.userId, session.user.id))
		.leftJoin(pt, eq(projectsLikes.projectId, pt.id));
	return {
		likedProjects,
	};
};

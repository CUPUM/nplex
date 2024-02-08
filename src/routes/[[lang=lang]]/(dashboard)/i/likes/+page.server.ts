import { authorize } from '$lib/auth/rbac.server';
import { db } from '$lib/db/db.server';
import { withTranslation } from '$lib/db/queries.server';
import { projects, projectsLikes, projectsTranslations } from '$lib/db/schema/public';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';

export const load = async (event) => {
	authorize(event);
	const pt = withTranslation(event, projects, projectsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	}).as('pt');
	const ptColumns = getColumns(pt);
	const likedProjects = await db
		.select({ ...ptColumns })
		.from(projectsLikes)
		.where(eq(projectsLikes.userId, event.locals.user.id))
		.leftJoin(pt, eq(projectsLikes.projectId, pt.id));
	return {
		likedProjects,
	};
};

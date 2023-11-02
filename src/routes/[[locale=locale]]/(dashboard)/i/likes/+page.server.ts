import { withAuth } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { selectProjects } from '$lib/db/queries.server';
import { projectsLikes } from '$lib/db/schema/public';
import { getSubqueryColumns } from '$lib/db/utils';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const session = await withAuth(event);
	const pt = selectProjects(event).as('pt');
	const ptColumns = getSubqueryColumns(pt);
	const likedProjects = await dbpool
		.select({ ...ptColumns })
		.from(projectsLikes)
		.where(eq(projectsLikes.userId, session.user.id))
		.leftJoin(pt, eq(projectsLikes.projectId, pt.id));
	return {
		likedProjects,
	};
};

import { authorize } from '$lib/crud/authorization/rbac.server';

export const load = async (event) => {
	authorize(event);
	// const pt = withTranslation(event, projects, projectsTranslations, {
	// 	fields: (t) => t.id,
	// 	references: (tt) => tt.id,
	// }).as('pt');
	// const ptColumns = getColumns(pt);
	// const likedProjects = await db
	// 	.select({ ...ptColumns })
	// 	.from(projectsLikes)
	// 	.where(eq(projectsLikes.userId, event.locals.user.id))
	// 	.leftJoin(pt, eq(projectsLikes.projectId, pt.id));
	// return {
	// 	likedProjects,
	// };
};

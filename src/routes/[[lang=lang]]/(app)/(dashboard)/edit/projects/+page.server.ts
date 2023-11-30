import { withAuth } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { projectsTranslations } from '$lib/db/schema/public';
import { ilike } from 'drizzle-orm';
('$lib/db/schema/public');

export const load = async (event) => {
	const session = await withAuth(event);
	const search = event.url.searchParams.get('search') ?? '';
	const match = dbpool
		.select()
		.from(projectsTranslations)
		.where(ilike(projectsTranslations.title, `%${search}%`))
		.as('match');
	// const searchProjects = dbpool.selectDistinctOn
	// withTranslation(event, projects, projectsTranslations, {
	// 	field: (t) => t.id,
	// 	reference: (tt) => tt.id,
	// });
	// const filteredProjects = await dbpool
	// 	.selectDistinctOn([projects.id], { id: projects.id, title: projectsTranslations.title })
	// 	.from(projects)
	// 	.leftJoin(projectsTranslations, eq(projects.id, projectsTranslations.id))
	// 	.where(and(authorizeProjectUpdate(session), ilike(projectsTranslations.title, `%${q ?? ''}%`)));

	// withTranslation();
	// console.log(filteredProjects);
	// return { filteredProjects };
};

export const actions = {};

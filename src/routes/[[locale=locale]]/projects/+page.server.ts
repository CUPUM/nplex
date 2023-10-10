import { dbpool } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	const qProjects = await dbpool
		.select({
			id: projects.id,
			title: projectsTranslations.title,
		})
		.from(projects)
		.leftJoin(
			projectsTranslations,
			and(
				eq(projectsTranslations.id, projects.id),
				eq(projectsTranslations.locale, event.locals.locale)
			)
		);
	return {
		qProjects,
	};
};

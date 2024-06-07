import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { db } from '$lib/db/db.server';
import { isEditableProject } from '$lib/db/queries.server';
import { projects, projectsTranslations } from '$lib/db/schema/public.server';
import { and, eq, exists, sql } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';

export const load = async (event) => {
	authorize(event);
	const search = event.url.searchParams.get('search') ?? '';
	const { title, summary } = getColumns(projectsTranslations);
	const { id, bannerId } = getColumns(projects);
	event.depends(LOAD_DEPENDENCIES.LANG);
	const matchProjects = db
		.select({ id, bannerId, title, summary })
		.from(projects)
		.where(
			and(
				isEditableProject(event.locals.user),
				search
					? exists(
							db
								.select({ id: projectsTranslations.id })
								.from(projectsTranslations)
								.where(
									and(
										eq(projectsTranslations.id, projects.id),
										// ilike(projectsTranslations.title, `%${search}%`)
										sql`${projectsTranslations.ts} @@ to_tsquery(${search})`
									)
								)
						)
					: undefined
			)
		)
		.leftJoin(
			projectsTranslations,
			and(
				eq(projects.id, projectsTranslations.id),
				eq(projectsTranslations.lang, event.locals.lang)
			)
		);
	console.log(matchProjects.getSQL());
	return { matchProjects: await matchProjects, search };
};

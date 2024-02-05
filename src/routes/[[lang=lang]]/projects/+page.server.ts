import { db } from '$lib/db/db.server';
import { isCreatedProject } from '$lib/db/queries.server';
import { projects, projectsImages, projectsTranslations } from '$lib/db/schema/public';
import { getColumns, sqlFalse } from '$lib/db/sql.server';
import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import { and, eq, exists, isNotNull, or, sql } from 'drizzle-orm';

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	const search = event.url.searchParams.get('search');
	const { title, summary } = getColumns(projectsTranslations);
	const { id } = getColumns(projects);
	event.depends(LOAD_DEPENDENCIES.Lang);
	const filtered = db
		.select({
			id,
			title,
			summary,
			bannerStorageName: projectsImages.storageName,
			created: session ? eq(projects.createdById, session.user.id) : sqlFalse,
		})
		.from(projects)
		.where(
			and(
				or(
					// To do: should ideally be a time check, e.g. projects.publishedAt < Date.now()
					isNotNull(projects.publishedAt),
					session ? isCreatedProject(session) : undefined
				),
				search
					? exists(
							db
								.select({ id: projectsTranslations.id })
								.from(projectsTranslations)
								.where(
									and(
										eq(projectsTranslations.id, projects.id),
										sql`${projectsTranslations.ts} @@ plainto_tsquery(${projectsT}, ${search})`
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
		)
		.leftJoin(projectsImages, eq(projectsImages.id, projects.bannerId));
	console.log(filtered.toSQL());
	return {
		filtered: await filtered,
		search,
	};
};

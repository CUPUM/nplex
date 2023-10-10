import { dbpool } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public';
import { and, eq, getTableColumns } from 'drizzle-orm';

export const load = async (event) => {
	const project = await dbpool.transaction(async (tx) => {
		const [base] = await tx
			.select({
				...getTableColumns(projectsTranslations),
				...getTableColumns(projects),
			})
			.from(projects)
			.where(eq(projects.id, event.params.projectId))
			.leftJoin(
				projectsTranslations,
				and(
					eq(projectsTranslations.id, projects.id),
					eq(projectsTranslations.locale, event.locals.locale)
				)
			)
			.limit(1);
		return base;
	});
	return {
		project,
	};
};

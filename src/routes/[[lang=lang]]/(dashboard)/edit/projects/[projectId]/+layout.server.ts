import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { db } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public.server';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.PROJECT_TITLE);
	const [project] = await joinTranslation(
		db
			.select({ title: projectsTranslations.title })
			.from(projects)
			.where(
				and(
					eq(projectsTranslations.id, event.params.projectId),
					eq(projectsTranslations.lang, event.locals.lang)
				)
			)
			.limit(1)
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id),
		event
	);
	return {
		...project,
	};
};

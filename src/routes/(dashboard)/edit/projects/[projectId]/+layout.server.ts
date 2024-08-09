import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { db } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public.server';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.LANG, LOAD_DEPENDENCIES.PROJECT_TITLE);
	const [project] = await joinTranslation(
		db
			.select({
				title: projectsTranslations.title,
			})
			.from(projects)
			.where(eq(projectsTranslations.id, event.params.projectId))
			.limit(1)
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id)
	);
	return {
		id: event.params.projectId,
		...project,
	};
};

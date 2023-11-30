import { dbpool } from '$lib/db/db.server';
import { projectsTranslations } from '$lib/db/schema/public';
import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.ProjectEditorBase);
	const [tt] = await dbpool
		.select({ title: projectsTranslations.title })
		.from(projectsTranslations)
		.where(
			and(
				eq(projectsTranslations.id, event.params.projectId),
				eq(projectsTranslations.lang, event.locals.lang)
			)
		)
		.limit(1);
	return {
		title: tt?.title,
	};
};

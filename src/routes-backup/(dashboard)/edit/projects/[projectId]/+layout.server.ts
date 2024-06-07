import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { db } from '$lib/db/db.server';
import { projectsTranslations } from '$lib/db/schema/public.server';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.PROJECT_EDITOR_LAYOUT);
	const [tt] = await db
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

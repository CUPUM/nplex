import { dbpool } from '$lib/db/db.server';
import { projects, projectsImages, projectsTranslations } from '$lib/db/schema/public';
import { random } from '$lib/db/sql.server';
import { and, eq, getTableColumns, isNotNull } from 'drizzle-orm';

export const load = async (event) => {
	const images = dbpool
		.selectDistinctOn([projectsImages.projectId], {
			storageName: projectsImages.storageName,
			projectId: projectsImages.projectId,
		})
		.from(projectsImages)
		.as('images_sq');

	const qProjects = await dbpool
		.select({
			storageName: images.storageName,
			...getTableColumns(projectsTranslations),
			...getTableColumns(projects),
		})
		.from(projects)
		.leftJoin(
			projectsTranslations,
			and(
				eq(projectsTranslations.id, projects.id),
				eq(projectsTranslations.locale, event.locals.locale)
			)
		)
		.where(isNotNull(projectsTranslations.title))
		.leftJoin(images, eq(images.projectId, projects.id))
		.orderBy(random());
	return {
		qProjects,
	};
};

import { authorize } from '$lib/auth/rbac.server';
import { db } from '$lib/db/db.server';
import {
	organizations,
	organizationsTranslations,
	projects,
	projectsImages,
	projectsTranslations,
} from '$lib/db/schema/public';
import { PRESENTATIONS } from '$lib/presentation/constants';
import { and, eq, getTableColumns } from 'drizzle-orm';

export const load = async (event) => {
	authorize(event);

	const editableProjects = db
		.select({
			...getTableColumns(projectsTranslations),
			...getTableColumns(projects),
			bannerStorageName: projectsImages.storageName,
		})
		.from(projects)
		.leftJoin(
			projectsTranslations,
			and(
				eq(projectsTranslations.id, projects.id),
				eq(projectsTranslations.lang, event.locals.lang)
			)
		)
		.leftJoin(projectsImages, eq(projects.bannerId, projectsImages.id));

	const editableOrganizations = db
		.select({
			...getTableColumns(organizationsTranslations),
			...getTableColumns(organizations),
		})
		.from(organizations)
		.leftJoin(
			organizationsTranslations,
			and(
				eq(organizationsTranslations.id, organizations.id),
				eq(organizationsTranslations.lang, event.locals.lang)
			)
		);

	return {
		setout: event.locals.setArrangement(PRESENTATIONS.FULL_WIDTH),
		editableProjects,
		editableOrganizations,
	};
};

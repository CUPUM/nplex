import { dbpool } from '$lib/db/db.server';
import {
	organizations,
	organizationsTranslations,
	projects,
	projectsImages,
	projectsTranslations,
} from '$lib/db/schema/public';
import { SETOUTS } from '$lib/setout/constants';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { and, eq, getTableColumns } from 'drizzle-orm';

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) {
		throw error(STATUS_CODES.UNAUTHORIZED, { message: 'No session found' });
	}

	const editableProjects = dbpool
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
				eq(projectsTranslations.locale, event.locals.locale)
			)
		)
		.leftJoin(projectsImages, eq(projects.bannerId, projectsImages.id));

	const editableOrganizations = dbpool
		.select({
			...getTableColumns(organizationsTranslations),
			...getTableColumns(organizations),
		})
		.from(organizations)
		.leftJoin(
			organizationsTranslations,
			and(
				eq(organizationsTranslations.id, organizations.id),
				eq(organizationsTranslations.locale, event.locals.locale)
			)
		);

	return {
		setout: event.locals.setSetout(SETOUTS.FULL_WIDTH),
		streamed: {
			editableProjects,
			editableOrganizations,
		},
	};
};

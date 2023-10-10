import { dbpool } from '$lib/db/db.server';
import {
	organizations,
	organizationsTranslations,
	projects,
	projectsTranslations,
} from '$lib/db/schema/public';
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
		})
		.from(projects)
		.leftJoin(
			projectsTranslations,
			and(
				eq(projectsTranslations.id, projects.id),
				eq(projectsTranslations.locale, event.locals.locale)
			)
		);
	// .where();

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
		streamed: {
			editableProjects,
			editableOrganizations,
		},
	};
};

import { authorize } from '$lib/crud/authorization/rbac.server';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { db } from '$lib/db/db.server';
import {
	organizations,
	organizationsTranslations,
	projectsOrganizations,
} from '$lib/db/schema/public.server';
import { and, eq, exists } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';

export const load = async (event) => {
	authorize(event);
	const projectOrganizations = await joinTranslation(
		db
			.select({
				...getColumns(organizationsTranslations),
				...getColumns(projectsOrganizations),
			})
			.from(projectsOrganizations)
			.where(eq(projectsOrganizations.projectId, event.params.projectId))
			.$dynamic(),
		organizationsTranslations,
		eq(projectsOrganizations.organizationId, organizationsTranslations.id),
		event
	);
	// const form = await superValidate(projectOrganizations, zod(projectsOrganizationsListSchema));
	return {
		// addForm,
		// updateForms,
		// listForm,
		lists: {
			organizations: joinTranslation(
				db
					.select({
						...getColumns(organizationsTranslations),
						...getColumns(organizations),
						isContributor: exists(
							db
								.select()
								.from(projectsOrganizations)
								.where(
									and(
										eq(projectsOrganizations.projectId, event.params.projectId),
										eq(projectsOrganizations.organizationId, organizations.id)
									)
								)
						).mapWith(Boolean),
					})
					.from(organizations)
					.$dynamic(),
				organizationsTranslations,
				eq(organizations.id, organizationsTranslations.id),
				event
			),
		},
	};
};

export const actions = {
	addOrganization: async (event) => {
		authorize(event);
	},
	deleteOrganization: async (event) => {
		authorize(event);
	},
	updateOrganization: async (event) => {
		authorize(event);
	},
};

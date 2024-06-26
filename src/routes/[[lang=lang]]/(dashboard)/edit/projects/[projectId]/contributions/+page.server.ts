import { authorize } from '$lib/auth/rbac.server';
import { STATUS_CODES } from '$lib/common/constants';
import { projectsContributionsUpdateSchema } from '$lib/db/crud.server';
import { db } from '$lib/db/db.server';
import {
	organizations,
	organizationsTranslations,
	projectsOrganizations,
} from '$lib/db/schema/public';
import { fail } from '@sveltejs/kit';
import { and, eq, getTableColumns, notInArray } from 'drizzle-orm';
import { tru } from 'drizzle-orm-helpers';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	authorize(event);
	const data = await db.transaction(async (tx) => {
		const allOrgs = await tx
			.select({
				...getTableColumns(organizationsTranslations),
				...getTableColumns(organizations),
			})
			.from(organizations)
			.leftJoin(
				organizationsTranslations,
				and(
					eq(organizations.id, organizationsTranslations.id),
					eq(organizationsTranslations.lang, event.locals.lang)
				)
			);
		const organizationIds = (
			await tx
				.select({ id: projectsOrganizations.organizationId })
				.from(projectsOrganizations)
				.where(eq(projectsOrganizations.projectId, event.params.projectId))
		).map((po) => po.id);
		return {
			allOrgs,
			organizationIds,
		};
	});
	const { allOrgs, organizationIds } = data;
	const form = await superValidate({ organizationIds }, projectsContributionsUpdateSchema);
	return {
		form,
		allOrgs,
	};
};

export const actions = {
	update: async (event) => {
		authorize(event);
		const form = await superValidate(event, projectsContributionsUpdateSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await db.transaction(async (tx) => {
				await tx
					.delete(projectsOrganizations)
					.where(
						and(
							eq(projectsOrganizations.projectId, event.params.projectId),
							form.data.organizationIds.length
								? notInArray(projectsOrganizations.organizationId, form.data.organizationIds)
								: tru
						)
					);
				if (form.data.organizationIds.length) {
					await tx
						.insert(projectsOrganizations)
						.values(
							form.data.organizationIds.map((organizationId) => ({
								organizationId,
								projectId: event.params.projectId,
							}))
						)
						.onConflictDoNothing({
							target: [projectsOrganizations.projectId, projectsOrganizations.organizationId],
						});
				}
			});
			return { form };
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
	},
};

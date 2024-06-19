import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	canEditProject,
	getProjectInterventionsByCategoriesList,
	getProjectSiteOwnershipsList,
	getProjectTypesList,
} from '$lib/crud/queries/projects';
import { projectGeneralFormSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import {
	projects,
	projectsInterventions,
	projectsTranslations,
} from '$lib/db/schema/public.server';
import { error, fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { toExcluded } from 'drizzle-orm-helpers/pg';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	authorize(event);
	const types = getProjectTypesList(event);
	const siteOwnerships = getProjectSiteOwnershipsList(event);
	const interventionsByCategories = getProjectInterventionsByCategoriesList(event);
	const [project] = await joinTranslations(
		db
			.select({
				...getColumns(projects),
				...aggTranslations(getColumns(projectsTranslations)),
			})
			.from(projects)
			.where(and(canEditProject(event.locals.user), eq(projects.id, event.params.projectId)))
			.limit(1)
			.groupBy(projects.id)
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id)
	);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const form = await superValidate(project, zod(projectGeneralFormSchema));
	return {
		form,
		types,
		siteOwnerships,
		interventionsByCategories,
	};
};

export const actions = {
	update: async (event) => {
		authorize(event);
		const form = await superValidate(event, zod(projectGeneralFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, interventionIds, ...project } = form.data;
		await db.transaction(async (tx) => {
			await tx.update(projects).set(project).where(eq(projects.id, event.params.projectId));
			await tx
				.insert(projectsTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, id: event.params.projectId })))
				.onConflictDoUpdate({
					target: [projectsTranslations.id, projectsTranslations.lang],
					set: toExcluded(getColumns(projectsTranslations)),
				});
			await tx
				.delete(projectsInterventions)
				.where(
					and(
						eq(projectsInterventions.projectId, event.params.projectId),
						interventionIds.length
							? notInArray(projectsInterventions.interventionId, interventionIds)
							: undefined
					)
				);
			if (interventionIds.length) {
				await tx
					.insert(projectsInterventions)
					.values(
						interventionIds.map((interventionId) => ({
							interventionId,
							projectId: event.params.projectId,
						}))
					)
					.onConflictDoNothing({
						target: [projectsInterventions.projectId, projectsInterventions.interventionId],
					});
			}
		});
		return { form };
	},
};

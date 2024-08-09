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
	projectsTypes,
} from '$lib/db/schema/public.server';
import { error, fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { coalesce, getColumns } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAgg, toExcluded } from 'drizzle-orm-helpers/pg';
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
				typesIds: coalesce(jsonAgg(projectsTypes.typeId), $emptyJsonArray),
				interventionsIds: coalesce(jsonAgg(projectsInterventions.interventionId), $emptyJsonArray),
			})
			.from(projects)
			.where(and(canEditProject(event.locals.user), eq(projects.id, event.params.projectId)))
			.limit(1)
			.leftJoin(projectsTypes, eq(projects.id, projectsTypes.projectId))
			.leftJoin(projectsInterventions, eq(projects.id, projectsInterventions.projectId))
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
		const { translations, interventionsIds, ...project } = form.data;
		await db.transaction(async (tx) => {
			const { ts, ...translationsColumns } = getColumns(projectsTranslations);
			await Promise.all([
				tx.update(projects).set(project).where(eq(projects.id, event.params.projectId)),
				tx
					.insert(projectsTranslations)
					.values(Object.values(translations).map((tt) => ({ ...tt, id: event.params.projectId })))
					.onConflictDoUpdate({
						target: [projectsTranslations.id, projectsTranslations.lang],
						set: toExcluded(translationsColumns),
					}),
				tx
					.delete(projectsInterventions)
					.where(
						and(
							eq(projectsInterventions.projectId, event.params.projectId),
							interventionsIds.length
								? notInArray(projectsInterventions.interventionId, interventionsIds)
								: undefined
						)
					),
				...(interventionsIds.length
					? [
							tx
								.insert(projectsInterventions)
								.values(
									interventionsIds.map((interventionId) => ({
										interventionId,
										projectId: event.params.projectId,
									}))
								)
								.onConflictDoNothing({
									target: [projectsInterventions.projectId, projectsInterventions.interventionId],
								}),
						]
					: []),
			]);
		});
		return { form };
	},
};

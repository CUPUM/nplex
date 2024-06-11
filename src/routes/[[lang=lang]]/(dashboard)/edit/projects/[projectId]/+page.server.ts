import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	getProjectInterventionsByCategoriesList,
	getProjectSiteOwnershipsList,
	getProjectTypesList,
	isEditableProject,
} from '$lib/crud/queries/projects';
import { projectsGeneralSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
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
			.where(and(isEditableProject(event.locals.user), eq(projects.id, event.params.projectId)))
			.limit(1)
			.groupBy(projects.id)
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id)
	);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const form = await superValidate(project, zod(projectsGeneralSchema));
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
		const form = await superValidate(event, zod(projectsGeneralSchema));
		// if (!form.valid) {
		// 	console.error(JSON.stringify(form.errors));
		// 	messageInvalid;
		// 	return message(form, { title: m.invalid(), description: m.invalid_data_details() });
		// }
		// try {
		// 	const { translations, interventionIds, ...project } = form.data;
		// 	await db.transaction(async (tx) => {
		// 		await tx.update(projects).set(project).where(eq(projects.id, event.params.projectId));
		// 		const { ts, ...set } = toExcluded(projectsTranslations);
		// 		await tx
		// 			.insert(projectsTranslations)
		// 			.values(Object.values(translations).map((tt) => ({ ...tt, id: event.params.projectId })))
		// 			.onConflictDoUpdate({
		// 				target: [projectsTranslations.id, projectsTranslations.lang],
		// 				set,
		// 			});
		// 		await tx
		// 			.delete(projectsInterventions)
		// 			.where(
		// 				and(
		// 					eq(projectsInterventions.projectId, event.params.projectId),
		// 					interventionIds.length
		// 						? notInArray(projectsInterventions.interventionId, interventionIds)
		// 						: tru
		// 				)
		// 			);
		// 		if (interventionIds.length) {
		// 			await tx
		// 				.insert(projectsInterventions)
		// 				.values(
		// 					interventionIds.map((interventionId) => ({
		// 						interventionId,
		// 						projectId: event.params.projectId,
		// 					}))
		// 				)
		// 				.onConflictDoNothing({
		// 					target: [projectsInterventions.projectId, projectsInterventions.interventionId],
		// 				});
		// 		}
		// 	});
		// 	return message(form, { title: m.success(), description: m.success_saved_data() });
		// } catch (e) {
		// 	console.error(e);
		// 	return message(
		// 		form,
		// 		{ title: m.error(), description: m.error_details() },
		// 		{ status: STATUS_CODES.INTERNAL_SERVER_ERROR }
		// 	);
		// }
	},
};

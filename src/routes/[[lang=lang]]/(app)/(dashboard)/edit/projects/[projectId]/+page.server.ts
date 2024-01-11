import * as m from '$i18n/messages';
import { authorizeSession } from '$lib/auth/authorization.server';
import { authorizeProjectUpdate } from '$lib/db/authorization.server';
import { projectGeneralUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import {
	getProjectCategorizedInterventionsList,
	getProjectSiteOwnershipsList,
	getProjectTypesList,
} from '$lib/db/queries.server';
import { projects, projectsInterventions, projectsTranslations } from '$lib/db/schema/public';
import { TRUE, excluded } from '$lib/db/sql.server';
import { withTranslations } from '$lib/db/utils.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';

// const updateSchema = proejct

export const load = async (event) => {
	const session = await authorizeSession(event);

	const [[project], interventions] = await Promise.all([
		withTranslations(projects, projectsTranslations, {
			field: (t) => t.id,
			reference: (tt) => tt.id,
		})
			.where(and(authorizeProjectUpdate(session), eq(projects.id, event.params.projectId)))
			.limit(1),
		dbpool
			.select({
				interventionId: projectsInterventions.interventionId,
			})
			.from(projectsInterventions)
			.where(eq(projectsInterventions.projectId, event.params.projectId)),
	]);
	const form = await superValidate(
		{ ...project, interventionIds: interventions.map((i) => i.interventionId) },
		projectGeneralUpdateSchema
	);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	return {
		form,
		types: getProjectTypesList(event),
		siteOwnerships: getProjectSiteOwnershipsList(event),
		categorizedInterventions: getProjectCategorizedInterventionsList(event),
	};
};

export const actions = {
	update: async (event) => {
		await authorizeSession(event);
		const form = await superValidate(event, projectGeneralUpdateSchema);
		if (!form.valid) {
			console.error(JSON.stringify(form.errors));
			return message(form, { title: m.invalid(), description: m.invalid_data_details() });
		}
		try {
			const { translations, interventionIds, ...project } = form.data;
			await dbpool.transaction(async (tx) => {
				await tx.update(projects).set(project).where(eq(projects.id, event.params.projectId));
				const { ts, ...set } = excluded(projectsTranslations);
				await tx
					.insert(projectsTranslations)
					.values(Object.values(translations))
					.onConflictDoUpdate({
						target: [projectsTranslations.id, projectsTranslations.lang],
						set,
					});
				await tx
					.delete(projectsInterventions)
					.where(
						and(
							eq(projectsInterventions.projectId, event.params.projectId),
							interventionIds.length
								? notInArray(projectsInterventions.interventionId, interventionIds)
								: TRUE()
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
			return message(form, { title: m.success(), description: m.success_saved_data() });
		} catch (e) {
			console.error(e);
			return message(
				form,
				{ title: m.error(), description: m.error_details() },
				{ status: STATUS_CODES.INTERNAL_SERVER_ERROR }
			);
		}
	},
};

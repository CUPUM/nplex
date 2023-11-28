import * as m from '$i18n/messages';
import { withAuth } from '$lib/auth/guard.server';
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
import { withTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	const session = await withAuth(event);

	const [project] = await withTranslations(projects, projectsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	})
		.where(and(authorizeProjectUpdate(session), eq(projects.id, event.params.projectId)))
		.limit(1);
	if (!project) {
		throw error(STATUS_CODES.NOT_FOUND, m.project_notFound());
	}
	const interventions = await dbpool
		.select({
			interventionId: projectsInterventions.interventionId,
		})
		.from(projectsInterventions)
		.where(eq(projectsInterventions.projectId, event.params.projectId));
	const form = superValidate(
		{ ...project, interventionIds: interventions.map((i) => i.interventionId) },
		projectGeneralUpdateSchema
	);
	// const pci = await getProjectCategorizedInterventionsList(event);
	// console.log(JSON.stringify(pci, undefined, 2));
	return {
		form,
		types: getProjectTypesList(event),
		siteOwnerships: getProjectSiteOwnershipsList(event),
		categorizedInterventions: getProjectCategorizedInterventionsList(event),
	};
};

export const actions = {
	update: async (event) => {
		await withAuth(event);
		const form = await superValidate(event, projectGeneralUpdateSchema);
		if (!form.valid) {
			console.error(JSON.stringify(form.errors));
			return message(form, { title: m.invalid(), description: m.invalidDataDetails() });
		}
		try {
			const { translations, interventionIds, ...project } = form.data;
			await dbpool.transaction(async (tx) => {
				await tx.update(projects).set(project).where(eq(projects.id, event.params.projectId));
				await tx
					.insert(projectsTranslations)
					.values(Object.values(translations))
					.onConflictDoUpdate({
						target: [projectsTranslations.id, projectsTranslations.locale],
						set: excluded(projectsTranslations),
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
			return message(form, { title: m.success(), description: m.successSavedData() });
		} catch (e) {
			console.error(e);
			return message(
				form,
				{ title: m.error(), description: m.errorDetails() },
				{ status: STATUS_CODES.INTERNAL_SERVER_ERROR }
			);
		}
	},
};

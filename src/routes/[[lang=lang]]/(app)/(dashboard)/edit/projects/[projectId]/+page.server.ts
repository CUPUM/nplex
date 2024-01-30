import * as m from '$i18n/messages';
import { projectGeneralUpdateSchema } from '$lib/db/crud.server';
import { db } from '$lib/db/db.server';
import {
	getProjectCategorizedInterventionsList,
	getProjectSiteOwnershipsList,
	getProjectTypesList,
	isEditableProject,
} from '$lib/db/queries.server';
import { projects, projectsInterventions, projectsTranslations } from '$lib/db/schema/public';
import { TRUE, excluded } from '$lib/db/sql.server';
import {
	coalesce,
	emptyJsonArray,
	getColumns,
	jsonAgg,
	withTranslations,
} from '$lib/db/utils.server';
import {
	projectsInterventionsSchema,
	projectsWithTranslationsSchema,
} from '$lib/db/validation.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';

const schema = projectsWithTranslationsSchema
	.pick({ id: true, typeId: true, costRange: true, siteOwnershipId: true, translations: true })
	.extend({ interventionIds: projectsInterventionsSchema.shape.interventionId.array() });

export const load = async (event) => {
	const session = await event.locals.authorize();
	const [[defaults], types, siteOwnerships, categorizedInterventions] = await Promise.all([
		withTranslations(projects, projectsTranslations, {
			field: (t) => t.id,
			reference: (tt) => tt.id,
			selection: {
				...getColumns(projects),
				interventionIds: coalesce(jsonAgg(projectsInterventions.interventionId), emptyJsonArray),
			},
		})
			.where(and(isEditableProject(session), eq(projects.id, event.params.projectId)))
			.limit(1)
			.leftJoin(projectsInterventions, eq(projects.id, projectsInterventions.projectId)),
		getProjectTypesList(event),
		getProjectSiteOwnershipsList(event),
		getProjectCategorizedInterventionsList(event),
	]);
	if (!defaults) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const form = await superValidate(
		zod(schema, {
			defaults,
		})
	);
	return {
		form,
		types,
		siteOwnerships,
		categorizedInterventions,
	};
};

export const actions = {
	update: async (event) => {
		await event.locals.authorize();
		const form = await superValidate(event, zod(projectGeneralUpdateSchema));
		if (!form.valid) {
			console.error(JSON.stringify(form.errors));
			return message(form, { title: m.invalid(), description: m.invalid_data_details() });
		}
		try {
			const { translations, interventionIds, ...project } = form.data;
			await db.transaction(async (tx) => {
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

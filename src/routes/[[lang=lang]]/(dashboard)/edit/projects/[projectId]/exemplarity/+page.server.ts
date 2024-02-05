import * as m from '$i18n/messages';
import { db } from '$lib/db/db.server';
import { getProjectCategorizedIndicatorsList, isEditableProject } from '$lib/db/queries.server';
import { projects, projectsExemplarityIndicators } from '$lib/db/schema/public';
import { coalesce, emptyJsonArray, jsonAgg } from '$lib/db/sql.server';
import { projectsExemplarityIndicatorsSchema } from '$lib/db/validation.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	indicatorsIds: projectsExemplarityIndicatorsSchema.shape.exemplarityIndicatorId.array(),
});

export const load = async (event) => {
	const session = await event.locals.authorize();
	const [[defaults], categorizedIndicators] = await Promise.all([
		db
			.select({
				indicatorsIds: coalesce(
					jsonAgg(projectsExemplarityIndicators.exemplarityIndicatorId),
					emptyJsonArray
				),
			})
			.from(projects)
			.where(and(isEditableProject(session), eq(projects.id, event.params.projectId)))
			.limit(1)
			.leftJoin(
				projectsExemplarityIndicators,
				eq(projects.id, projectsExemplarityIndicators.projectId)
			),
		getProjectCategorizedIndicatorsList(event),
	]);
	if (!defaults) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const form = await superValidate(zod(schema, { defaults }));
	return {
		form,
		categorizedIndicators,
	};
};

export const actions = {
	update: async (event) => {
		await event.locals.authorize();
		const form = await superValidate(event, zod(schema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		await db.transaction(async (tx) => {
			await tx
				.delete(projectsExemplarityIndicators)
				.where(
					and(
						eq(projectsExemplarityIndicators.projectId, event.params.projectId),
						form.data.indicatorsIds.length
							? notInArray(
									projectsExemplarityIndicators.exemplarityIndicatorId,
									form.data.indicatorsIds
								)
							: undefined
					)
				);
			if (form.data.indicatorsIds.length) {
				await tx
					.insert(projectsExemplarityIndicators)
					.values(
						form.data.indicatorsIds.map((exemplarityIndicatorId) => ({
							exemplarityIndicatorId,
							projectId: event.params.projectId,
						}))
					)
					.onConflictDoNothing({
						target: [
							projectsExemplarityIndicators.projectId,
							projectsExemplarityIndicators.exemplarityIndicatorId,
						],
					});
			}
		});
	},
};

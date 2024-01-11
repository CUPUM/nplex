import { authorizeSession } from '$lib/auth/authorization.server';
import { projectsExemplarityIndicatorsUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { getProjectCategorizedIndicatorsList } from '$lib/db/queries.server';
import { projectsExemplarityIndicators } from '$lib/db/schema/public';
import { coalesce, emptyJsonArray, jsonAgg } from '$lib/db/sql.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await authorizeSession(event);
	const [indicators] = await dbpool
		.select({
			indicatorIds: coalesce(
				jsonAgg(projectsExemplarityIndicators.exemplarityIndicatorId),
				emptyJsonArray()
			),
		})
		.from(projectsExemplarityIndicators)
		.where(eq(projectsExemplarityIndicators.projectId, event.params.projectId));
	console.log(indicators);
	const form = await superValidate(indicators, projectsExemplarityIndicatorsUpdateSchema);
	return {
		form,
		categorizedIndicators: await getProjectCategorizedIndicatorsList(event),
	};
};

export const actions = {
	update: async (event) => {
		await authorizeSession(event);
		const form = await superValidate(event, projectsExemplarityIndicatorsUpdateSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		await dbpool.transaction(async (tx) => {
			await tx
				.delete(projectsExemplarityIndicators)
				.where(
					and(
						eq(projectsExemplarityIndicators.projectId, event.params.projectId),
						form.data.indicatorIds.length
							? notInArray(
									projectsExemplarityIndicators.exemplarityIndicatorId,
									form.data.indicatorIds
								)
							: undefined
					)
				);
			if (form.data.indicatorIds.length) {
				await tx
					.insert(projectsExemplarityIndicators)
					.values(
						form.data.indicatorIds.map((exemplarityIndicatorId) => ({
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

import { withAuth } from '$lib/auth/guard.server';
import { projectsExemplarityIndicatorsUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { projectsExemplarityIndicators } from '$lib/db/schema/public';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withAuth(event);
	const indicatorIds = (
		await dbpool
			.select()
			.from(projectsExemplarityIndicators)
			.where(eq(projectsExemplarityIndicators.projectId, event.params.projectId))
	).map((pei) => pei.exemplarityIndicatorId);

	const form = await superValidate({ indicatorIds }, projectsExemplarityIndicatorsUpdateSchema);
	return { form };
};

export const actions = {
	update: async (event) => {
		await withAuth(event);
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
						notInArray(projectsExemplarityIndicators.exemplarityIndicatorId, form.data.indicatorIds)
					)
				);
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
		});
	},
};

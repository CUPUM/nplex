import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { canEditProject, getProjectIndicatorsByCategoriesList } from '$lib/crud/queries/projects';
import { projectExemplarityIndicatorsFormSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import { projects, projectsExemplarityIndicators } from '$lib/db/schema/public.server';
import { error, fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { coalesce } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAgg } from 'drizzle-orm-helpers/pg';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	authorize(event);
	const indicatorsByCategories = getProjectIndicatorsByCategoriesList(event);
	const [project] = await db
		.select({
			indicatorsIds: coalesce(
				jsonAgg(projectsExemplarityIndicators.exemplarityIndicatorId),
				$emptyJsonArray
			),
		})
		.from(projects)
		.where(and(canEditProject(event.locals.user), eq(projects.id, event.params.projectId)))
		.limit(1)
		.leftJoin(
			projectsExemplarityIndicators,
			eq(projects.id, projectsExemplarityIndicators.projectId)
		);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const form = await superValidate(project, zod(projectExemplarityIndicatorsFormSchema));
	return {
		form,
		indicatorsByCategories,
	};
};

export const actions = {
	update: async (event) => {
		authorize(event);
		const form = await superValidate(event, zod(projectExemplarityIndicatorsFormSchema));
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
		return { form };
	},
};

import { USER_ROLES } from '$lib/auth/constants';
import { guardRole } from '$lib/auth/guard.server';
import { projectInterventionCategoriesWithInterventionsUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import {
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
} from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { extractTranslations, reduceTranslations } from '$lib/db/utils.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await guardRole(event, USER_ROLES.ADMIN);

	const interventionCategories = (
		await dbpool.query.projectInterventionCategories.findMany({
			with: {
				translations: true,
				interventions: {
					with: {
						translations: true,
					},
				},
			},
		})
	).map((ic, i) => {
		return {
			...reduceTranslations(ic, i),
			interventions: ic.interventions.map(reduceTranslations),
		};
	});

	// const form = await superValidate(data, projectInterventionCategoriesAndInterventionsUpdateSchema);
	const form = await superValidate(
		{ interventionCategories },
		projectInterventionCategoriesWithInterventionsUpdateSchema
	);

	return { form };
};

export const actions = {
	createIntervention: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		const categoryId = event.url.searchParams.get('categoryId');
		if (!categoryId) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.insert(projectInterventions).values({ categoryId });
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	deleteIntervention: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		const interventionId = event.url.searchParams.get('interventionId');
		if (!interventionId) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.delete(projectInterventions).where(eq(projectInterventions.id, interventionId));
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(
			event,
			projectInterventionCategoriesWithInterventionsUpdateSchema
		);
		if (!form.valid) {
			console.info(form);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				// Categories
				const [pic, pict] = extractTranslations(form.data.interventionCategories);
				await tx
					.insert(projectInterventionCategories)
					.values(pic)
					.onConflictDoUpdate({
						target: projectInterventionCategories.id,
						set: excluded(projectInterventionCategories),
					});
				await tx
					.insert(projectInterventionCategoriesTranslations)
					.values(pict)
					.onConflictDoUpdate({
						target: [
							projectInterventionCategoriesTranslations.id,
							projectInterventionCategoriesTranslations.lang,
						],
						set: excluded(projectInterventionCategoriesTranslations),
					});
				// Interventions
				const [pi, pit] = extractTranslations(
					form.data.interventionCategories.flatMap((ic) => ic.interventions)
				);
				await tx
					.insert(projectInterventions)
					.values(pi)
					.onConflictDoUpdate({
						target: projectInterventions.id,
						set: excluded(projectInterventions),
					});
				await tx
					.insert(projectInterventionsTranslations)
					.values(pit)
					.onConflictDoUpdate({
						target: [projectInterventionsTranslations.id, projectInterventionsTranslations.lang],
						set: excluded(projectInterventionsTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
	},
};

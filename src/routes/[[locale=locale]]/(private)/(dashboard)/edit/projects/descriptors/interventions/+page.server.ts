import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectInterventionCategoriesAndInterventionsUpdateSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import {
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
} from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql';
import { extractTranslations, mapReduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);

	const data = await dbpool.transaction(async (tx) => {
		const interventionCategories = (
			await tx.query.projectInterventionCategories.findMany({
				with: {
					translations: true,
				},
			})
		).map(mapReduceTranslations);
		const interventions = (
			await tx.query.projectInterventions.findMany({
				with: {
					translations: true,
				},
			})
		).map(mapReduceTranslations);
		return {
			interventionCategories,
			interventions,
		};
	});

	const form = await superValidate(data, projectInterventionCategoriesAndInterventionsUpdateSchema);

	return { form };
};

export const actions = {
	createCategory: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
	},
	deleteCategory: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
	},
	createIntervention: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
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
		await withRole(event, USER_ROLES.ADMIN);
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
		await withRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(
			event,
			projectInterventionCategoriesAndInterventionsUpdateSchema
		);
		if (!form.valid) {
			console.info(form);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [pic, pict] = extractTranslations(form.data.interventionCategories);
				await tx
					.insert(projectInterventionCategories)
					.values(pic)
					.onConflictDoUpdate({
						target: projectInterventionCategories.id,
						set: {
							id: excluded(projectInterventionCategories.id),
							index: excluded(projectInterventionCategories.index),
						},
					});
				await tx
					.insert(projectInterventionCategoriesTranslations)
					.values(pict)
					.onConflictDoUpdate({
						target: [
							projectInterventionCategoriesTranslations.id,
							projectInterventionCategoriesTranslations.locale,
						],
						set: {
							title: excluded(projectInterventionCategoriesTranslations.title),
							description: excluded(projectInterventionCategoriesTranslations.description),
						},
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			throw error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur server' });
		}
	},
};

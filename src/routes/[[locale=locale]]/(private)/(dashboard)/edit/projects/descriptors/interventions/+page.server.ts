import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectInterventionCategoriesAndInterventionsUpdateSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import { locales } from '$lib/db/schema/i18n';
import {
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
} from '$lib/db/schema/public';
import { boolean, excluded } from '$lib/db/sql';
import { extractTranslations, translationsAgg } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);

	const interventionCategories = await dbpool
		.select({
			...getTableColumns(projectInterventionCategories),
			translations: translationsAgg(projectInterventionCategoriesTranslations),
		})
		.from(projectInterventionCategories)
		.leftJoin(locales, boolean(true))
		.leftJoin(
			projectInterventionCategoriesTranslations,
			and(
				eq(projectInterventionCategories.id, projectInterventionCategoriesTranslations.id),
				eq(locales.locale, projectInterventionCategoriesTranslations.locale)
			)
		)
		.groupBy(projectInterventionCategories.id);

	// console.log(interventionCategories);

	const interventions = await dbpool
		.select({
			...getTableColumns(projectInterventions),
			translations: translationsAgg(projectInterventionsTranslations),
		})
		.from(projectInterventions)
		.leftJoin(locales, boolean(true))
		.leftJoin(
			projectInterventionsTranslations,
			and(
				eq(projectInterventions.id, projectInterventionsTranslations.id),
				eq(locales.locale, projectInterventionsTranslations.locale)
			)
		)
		.groupBy(projectInterventions.id);

	// console.log(interventions);

	const form = await superValidate(
		{ interventionCategories, interventions },
		projectInterventionCategoriesAndInterventionsUpdateSchema
	);

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
		} catch (e) {
			console.error(e);
			throw error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur server' });
		}
	},
};

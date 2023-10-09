import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectExemplarityCategoriesWithIndicatorsUpdateSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
} from '$lib/db/schema/public';
import { extractTranslations, getAllExcluded, reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);
	const exemplarityCategories = (
		await dbpool.query.projectExemplarityCategories.findMany({
			with: {
				translations: true,
				indicators: {
					with: {
						translations: true,
					},
				},
			},
		})
	).map((ec, i) => {
		return {
			...reduceTranslations(ec, i),
			indicators: ec.indicators.map(reduceTranslations),
		};
	});
	// console.log(JSON.stringify(exemplarityCategories, undefined, 2));
	const form = await superValidate(
		{ exemplarityCategories },
		projectExemplarityCategoriesWithIndicatorsUpdateSchema,
		{ id: 'exemplarity-form' }
	);
	return { form };
};

export const actions = {
	createCategory: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		try {
			await dbpool.insert(projectExemplarityCategories).values({});
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	deleteCategory: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('categoryId');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool
				.delete(projectExemplarityCategories)
				.where(eq(projectExemplarityCategories.id, id));
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	createIndicator: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const categoryId = event.url.searchParams.get('categoryId');
		if (!categoryId) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.insert(projectExemplarityIndicators).values({ categoryId });
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	deleteIndicator: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('indicatorId');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool
				.delete(projectExemplarityIndicators)
				.where(eq(projectExemplarityIndicators.id, id));
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, projectExemplarityCategoriesWithIndicatorsUpdateSchema);
		if (!form.valid) {
			console.info(form.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				// Categories
				const [pec, pect] = extractTranslations(form.data.exemplarityCategories);
				await tx
					.insert(projectExemplarityCategories)
					.values(pec)
					.onConflictDoUpdate({
						target: projectExemplarityCategories.id,
						set: getAllExcluded(projectExemplarityCategories),
					});
				await tx
					.insert(projectExemplarityCategoriesTranslations)
					.values(pect)
					.onConflictDoUpdate({
						target: [
							projectExemplarityCategoriesTranslations.id,
							projectExemplarityCategoriesTranslations.locale,
						],
						set: getAllExcluded(projectExemplarityCategoriesTranslations),
					});
				// Indicators
				const [pei, peit] = extractTranslations(
					form.data.exemplarityCategories.flatMap((ec) => ec.indicators)
				);
				await tx
					.insert(projectExemplarityIndicators)
					.values(pei)
					.onConflictDoUpdate({
						target: projectExemplarityIndicators.id,
						set: getAllExcluded(projectExemplarityIndicators),
					});
				await tx
					.insert(projectExemplarityIndicatorsTranslations)
					.values(peit)
					.onConflictDoUpdate({
						target: [
							projectExemplarityIndicatorsTranslations.id,
							projectExemplarityIndicatorsTranslations.locale,
						],
						set: getAllExcluded(projectExemplarityIndicatorsTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
	},
};

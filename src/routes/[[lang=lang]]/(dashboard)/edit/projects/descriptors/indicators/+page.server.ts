import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	projectExemplarityCategoriesListSchema,
	projectExemplarityCategoriesWithTranslationsSchema,
	projectExemplarityCategoryCreateSchema,
	projectExemplarityIndicatorCreateSchema,
	projectExemplarityIndicatorsListSchema,
	projectExemplarityIndicatorsWithTranslationsSchema,
} from '$lib/crud/validation/projects-descriptors';
import { db } from '$lib/db/db.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
} from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { toExcluded } from 'drizzle-orm-helpers/pg';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event, 'projects.descriptors.interventions.update');
	const [
		projectExemplarityIndicatorsListForm,
		projectExemplarityIndicatorForms,
		projectExemplarityCategoryCreateForm,
		projectExemplarityCategoriesListForm,
		projectExemplarityIndicatorAndCategoryForms,
	] = await Promise.all([
		superValidate(zod(projectExemplarityIndicatorsListSchema), { id: 'indicators-list' }),
		joinTranslations(
			db
				.select({
					...aggTranslations(getColumns(projectExemplarityIndicatorsTranslations)),
					...getColumns(projectExemplarityIndicators),
				})
				.from(projectExemplarityIndicators)
				.groupBy(projectExemplarityIndicators.id)
				.$dynamic(),
			projectExemplarityIndicatorsTranslations,
			eq(projectExemplarityIndicators.id, projectExemplarityIndicatorsTranslations.id)
		).then((d) =>
			Promise.all(
				d.map((indicator) =>
					superValidate(indicator, zod(projectExemplarityIndicatorsWithTranslationsSchema), {
						id: indicator.id,
					})
				)
			)
		),
		superValidate(zod(projectExemplarityCategoryCreateSchema)),
		superValidate(zod(projectExemplarityCategoriesListSchema), { id: 'categories-list' }),
		joinTranslations(
			db
				.select({
					...aggTranslations(getColumns(projectExemplarityCategoriesTranslations)),
					...getColumns(projectExemplarityCategories),
				})
				.from(projectExemplarityCategories)
				.groupBy(projectExemplarityCategories.id)
				.$dynamic(),
			projectExemplarityCategoriesTranslations,
			eq(projectExemplarityCategories.id, projectExemplarityCategoriesTranslations.id)
		).then((d) =>
			Promise.all(
				d.map((category) =>
					Promise.all([
						superValidate(category, zod(projectExemplarityCategoriesWithTranslationsSchema), {
							id: category.id,
						}),
						superValidate(
							{ categoryId: category.id },
							zod(projectExemplarityIndicatorCreateSchema),
							{
								id: `${category.id}-indicator`,
							}
						),
					])
				)
			)
		),
	]);
	return {
		projectExemplarityIndicatorsListForm,
		projectExemplarityIndicatorForms,
		projectExemplarityCategoryCreateForm,
		projectExemplarityCategoriesListForm,
		projectExemplarityIndicatorAndCategoryForms,
	};
};

export const actions = {
	createIndicator: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityIndicators.create');
		const form = await superValidate(event, zod(projectExemplarityIndicatorCreateSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, ...indicator } = form.data;
		await db.transaction(async (tx) => {
			const [inserted] = await tx
				.insert(projectExemplarityIndicators)
				.values(indicator)
				.returning({ id: projectExemplarityIndicators.id });
			if (!inserted) {
				throw tx.rollback();
			}
			await tx
				.insert(projectExemplarityIndicatorsTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, ...inserted })));
		});
		return { form };
	},
	updateIndicator: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityIndicators.update');
		const form = await superValidate(
			event,
			zod(projectExemplarityIndicatorsWithTranslationsSchema)
		);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, id, ...indicator } = form.data;
		await db.transaction(async (tx) => {
			Promise.all([
				tx
					.update(projectExemplarityIndicators)
					.set(indicator)
					.where(eq(projectExemplarityIndicators.id, id)),
				tx
					.insert(projectExemplarityIndicatorsTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [
							projectExemplarityIndicatorsTranslations.id,
							projectExemplarityIndicatorsTranslations.lang,
						],
						set: toExcluded(getColumns(projectExemplarityIndicatorsTranslations)),
					}),
			]);
		});
		return { form };
	},
	deleteIndicator: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityIndicators.delete');
		const form = await superValidate(event, zod(projectExemplarityIndicatorsListSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const [deleted] = await db
			.delete(projectExemplarityIndicators)
			.where(eq(projectExemplarityIndicators.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND);
		}
		return { form };
	},
	createCategory: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityCategories.create');
		const form = await superValidate(event, zod(projectExemplarityCategoryCreateSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, ...category } = form.data;
		await db.transaction(async (tx) => {
			const [inserted] = await tx
				.insert(projectExemplarityCategories)
				.values(category)
				.returning({ id: projectExemplarityCategories.id });
			if (!inserted) {
				tx.rollback();
				error(STATUS_CODES.INTERNAL_SERVER_ERROR);
			}
			await tx
				.insert(projectExemplarityCategoriesTranslations)
				.values(Object.values(translations).map((d) => ({ ...d, ...inserted })));
		});
		return { form };
	},
	updateCategory: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityCategories.update');
		const form = await superValidate(
			event,
			zod(projectExemplarityCategoriesWithTranslationsSchema)
		);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, id, ...category } = form.data;
		await db.transaction(async (tx) => {
			await Promise.all([
				tx
					.update(projectExemplarityCategories)
					.set(category)
					.where(eq(projectExemplarityCategories.id, id)),
				tx
					.insert(projectExemplarityCategoriesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [
							projectExemplarityCategoriesTranslations.id,
							projectExemplarityCategoriesTranslations.lang,
						],
						set: toExcluded(getColumns(projectExemplarityCategoriesTranslations)),
					}),
			]);
		});
		return { form };
	},
	deleteCategory: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityCategories.delete');
		const form = await superValidate(event, zod(projectExemplarityCategoriesListSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const [deleted] = await db
			.delete(projectExemplarityCategories)
			.where(eq(projectExemplarityCategories.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND);
		}
		return { form };
	},
};

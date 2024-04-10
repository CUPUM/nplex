import * as m from '$i18n/messages';
import { authorize } from '$lib/auth/rbac.server';
import { excluded } from '$lib/db/custom-types.server';
import { db } from '$lib/db/db.server';
import { withTranslations } from '$lib/db/queries.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
} from '$lib/db/schema/public';
import {
	newProjectExemplarityCategorySchema,
	newProjectExemplarityIndicatorSchema,
	projectExemplarityCategoriesWithTranslationsSchema,
	projectExemplarityIndicatorsWithTranslationsSchema,
} from '$lib/db/validation.server';
import {
	messageError,
	messageInvalid,
	messageNoRowsDeleted,
	messageSuccess,
} from '$lib/forms/messages';
import { eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const rootSchema = z.object({ id: z.string() });

export const load = async (event) => {
	authorize(event, 'projects.descriptors.exemplarityIndicators.update');
	const indicators = withTranslations(
		projectExemplarityIndicators,
		projectExemplarityIndicatorsTranslations,
		{
			field: (t) => t.id,
			reference: (tt) => tt.id,
		}
	);
	const categories = withTranslations(
		projectExemplarityCategories,
		projectExemplarityCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
	const [rootForm, newCategoryForm, categoryForms, newIndicatorForm, indicatorForms] =
		await Promise.all([
			superValidate(zod(rootSchema)),
			superValidate(zod(newProjectExemplarityCategorySchema)),
			Promise.all(
				await categories.then((data) =>
					data.map((defaults) =>
						superValidate(zod(projectExemplarityCategoriesWithTranslationsSchema, { defaults }), {
							id: defaults.id,
						})
					)
				)
			),
			superValidate(zod(newProjectExemplarityIndicatorSchema)),
			Promise.all(
				await indicators.then((data) =>
					data.map((defaults) =>
						superValidate(zod(projectExemplarityIndicatorsWithTranslationsSchema, { defaults }), {
							id: defaults.id,
						})
					)
				)
			),
		]);
	return {
		rootForm,
		newCategoryForm,
		categoryForms,
		newIndicatorForm,
		indicatorForms,
	};
};

export const actions = {
	createIndicator: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityIndicators.create');
		const form = await superValidate(event, zod(newProjectExemplarityIndicatorSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_exemplarity_indicator());
		}
		try {
			const { translations, ...pt } = form.data;
			await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectExemplarityIndicators)
					.values(pt)
					.returning({ id: projectExemplarityIndicators.id });
				await tx
					.insert(projectExemplarityIndicatorsTranslations)
					.values(Object.values(translations).map((tt) => ({ ...tt, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	updateIndicator: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityIndicators.update');
		const form = await superValidate(
			event,
			zod(projectExemplarityIndicatorsWithTranslationsSchema)
		);
		if (!form.valid) {
			return messageInvalid(form, m.project_exemplarity_indicator());
		}
		try {
			const { translations, id, ...pt } = form.data;
			await db.transaction(async (tx) => {
				await Promise.all([
					tx
						.update(projectExemplarityIndicators)
						.set(pt)
						.where(eq(projectExemplarityIndicators.id, id)),
					tx
						.insert(projectExemplarityIndicatorsTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [
								projectExemplarityIndicatorsTranslations.id,
								projectExemplarityIndicatorsTranslations.lang,
							],
							set: excluded(projectExemplarityIndicatorsTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	deleteIndicator: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityIndicators.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_exemplarity_indicator());
		}
		try {
			const deleted = await db
				.delete(projectExemplarityIndicators)
				.where(eq(projectExemplarityIndicators.id, form.data.id))
				.returning();
			if (!deleted.length) {
				return messageNoRowsDeleted(form);
			}
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	createCategory: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityCategories.create');
		const form = await superValidate(event, zod(newProjectExemplarityCategorySchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_exemplarity_category());
		}
		try {
			const { translations, ...category } = form.data;
			await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectExemplarityCategories)
					.values(category)
					.returning({ id: projectExemplarityCategories.id });
				await tx
					.insert(projectExemplarityCategoriesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	updateCategory: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityCategories.update');
		const form = await superValidate(
			event,
			zod(projectExemplarityCategoriesWithTranslationsSchema)
		);
		if (!form.valid) {
			return messageInvalid(form, m.project_exemplarity_category());
		}
		try {
			const { translations, id, ...pt } = form.data;
			await db.transaction(async (tx) => {
				await Promise.all([
					tx
						.update(projectExemplarityCategories)
						.set(pt)
						.where(eq(projectExemplarityCategories.id, id)),
					tx
						.insert(projectExemplarityCategoriesTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [
								projectExemplarityCategoriesTranslations.id,
								projectExemplarityCategoriesTranslations.lang,
							],
							set: excluded(projectExemplarityCategoriesTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	deleteCategory: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityCategories.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_exemplarity_category());
		}
		try {
			const deleted = await db
				.delete(projectExemplarityCategories)
				.where(eq(projectExemplarityCategories.id, form.data.id))
				.returning();
			if (!deleted.length) {
				return messageNoRowsDeleted(form);
			}
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
};

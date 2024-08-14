import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import { projectTypesList } from '$lib/crud/queries/projects';
import {
	projectInterventionCategoriesFormSchema,
	projectInterventionCategoryCreateFormSchema,
	projectInterventionCreateFormSchema,
	projectInterventionsCategoriesWithTranslationsSchema,
	projectInterventionsFormSchema,
	projectInterventionsWithTranslationsSchema,
} from '$lib/crud/validation/projects-descriptors';
import { db } from '$lib/db/db.server';
import {
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
	projectInterventionsTranslations,
	projectTypesToInterventions,
} from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { coalesce, getColumns } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAgg, toExcluded } from 'drizzle-orm-helpers/pg';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event, 'projects.descriptors.interventions.update');
	const [
		projectInterventionsForm,
		projectInterventionForms,
		projectInterventionCategoryCreateForm,
		projectInterventionsCategoriesForm,
		projectInterventionAndCategoryForms,
	] = await Promise.all([
		superValidate(zod(projectInterventionsFormSchema), { id: 'interventions' }),
		joinTranslations(
			db
				.select({
					...aggTranslations(getColumns(projectInterventionsTranslations)),
					...getColumns(projectInterventions),
					typesIds: coalesce(jsonAgg(projectTypesToInterventions.typeId), $emptyJsonArray).as(
						'types_ids'
					),
				})
				.from(projectInterventions)
				.groupBy(projectInterventions.id)
				.leftJoin(
					projectTypesToInterventions,
					eq(projectTypesToInterventions.interventionId, projectInterventions.id)
				)
				.$dynamic(),
			projectInterventionsTranslations,
			eq(projectInterventions.id, projectInterventionsTranslations.id)
		).then((d) =>
			Promise.all(
				d.map((intervention) =>
					superValidate(intervention, zod(projectInterventionsWithTranslationsSchema), {
						id: intervention.id,
					})
				)
			)
		),
		superValidate(zod(projectInterventionCategoryCreateFormSchema)),
		superValidate(zod(projectInterventionCategoriesFormSchema), { id: 'categories' }),
		joinTranslations(
			db
				.select({
					...aggTranslations(getColumns(projectInterventionsCategoriesTranslations)),
					...getColumns(projectInterventionsCategories),
				})
				.from(projectInterventionsCategories)
				.groupBy(projectInterventionsCategories.id)
				.$dynamic(),
			projectInterventionsCategoriesTranslations,
			eq(projectInterventionsCategories.id, projectInterventionsCategoriesTranslations.id)
		).then((d) =>
			Promise.all(
				d.map((category) =>
					Promise.all([
						superValidate(category, zod(projectInterventionsCategoriesWithTranslationsSchema), {
							id: category.id,
						}),
						superValidate({ categoryId: category.id }, zod(projectInterventionCreateFormSchema), {
							id: `${category.id}-intervention`,
						}),
					])
				)
			)
		),
	]);
	return {
		projectTypes: projectTypesList,
		projectInterventionsForm,
		projectInterventionForms,
		projectInterventionCategoryCreateForm,
		projectInterventionsCategoriesForm,
		projectInterventionAndCategoryForms,
	};
};

export const actions = {
	createIntervention: async (event) => {
		authorize(event, 'projects.descriptors.interventions.create');
		const form = await superValidate(event, zod(projectInterventionCreateFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, typesIds, ...intervention } = form.data;
		await db.transaction(async (tx) => {
			const [inserted] = await tx
				.insert(projectInterventions)
				.values(intervention)
				.returning({ id: projectInterventions.id });
			if (!inserted) {
				throw tx.rollback();
			}
			await tx
				.insert(projectInterventionsTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, ...inserted })));
			if (typesIds.length) {
				await tx
					.insert(projectTypesToInterventions)
					.values(typesIds.map((typeId) => ({ interventionId: inserted.id, typeId })));
			}
		});
		return { form };
	},
	updateIntervention: async (event) => {
		authorize(event, 'projects.descriptors.interventions.update');
		const form = await superValidate(event, zod(projectInterventionsWithTranslationsSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, id, typesIds, ...intervention } = form.data;
		await db.transaction(async (tx) => {
			Promise.all([
				tx.update(projectInterventions).set(intervention).where(eq(projectInterventions.id, id)),
				tx
					.insert(projectInterventionsTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [projectInterventionsTranslations.id, projectInterventionsTranslations.lang],
						set: toExcluded(getColumns(projectInterventionsTranslations)),
					}),
				tx
					.delete(projectTypesToInterventions)
					.where(
						and(
							eq(projectTypesToInterventions.interventionId, id),
							typesIds.length ? notInArray(projectTypesToInterventions.typeId, typesIds) : undefined
						)
					),
				...(typesIds.length
					? [
							tx
								.insert(projectTypesToInterventions)
								.values(typesIds.map((typeId) => ({ interventionId: id, typeId })))
								.onConflictDoNothing(),
						]
					: []),
			]);
		});
		return { form };
	},
	deleteIntervention: async (event) => {
		authorize(event, 'projects.descriptors.interventions.delete');
		const form = await superValidate(event, zod(projectInterventionsFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const [deleted] = await db
			.delete(projectInterventions)
			.where(eq(projectInterventions.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND);
		}
		return { form };
	},
	createCategory: async (event) => {
		authorize(event, 'projects.descriptors.interventionCategories.create');
		const form = await superValidate(event, zod(projectInterventionCategoryCreateFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, ...category } = form.data;
		await db.transaction(async (tx) => {
			const [inserted] = await tx
				.insert(projectInterventionsCategories)
				.values(category)
				.returning({ id: projectInterventionsCategories.id });
			if (!inserted) {
				tx.rollback();
				error(STATUS_CODES.INTERNAL_SERVER_ERROR);
			}
			await tx
				.insert(projectInterventionsCategoriesTranslations)
				.values(Object.values(translations).map((d) => ({ ...d, ...inserted })));
		});
		return { form };
	},
	updateCategory: async (event) => {
		authorize(event, 'projects.descriptors.interventionCategories.update');
		const form = await superValidate(
			event,
			zod(projectInterventionsCategoriesWithTranslationsSchema)
		);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, id, ...category } = form.data;
		await db.transaction(async (tx) => {
			await Promise.all([
				tx
					.update(projectInterventionsCategories)
					.set(category)
					.where(eq(projectInterventionsCategories.id, id)),
				tx
					.insert(projectInterventionsCategoriesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [
							projectInterventionsCategoriesTranslations.id,
							projectInterventionsCategoriesTranslations.lang,
						],
						set: toExcluded(getColumns(projectInterventionsCategoriesTranslations)),
					}),
			]);
		});
		return { form };
	},
	deleteCategory: async (event) => {
		authorize(event, 'projects.descriptors.interventionCategories.delete');
		const form = await superValidate(event, zod(projectInterventionCategoriesFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const [deleted] = await db
			.delete(projectInterventionsCategories)
			.where(eq(projectInterventionsCategories.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND);
		}
		return { form };
	},
};

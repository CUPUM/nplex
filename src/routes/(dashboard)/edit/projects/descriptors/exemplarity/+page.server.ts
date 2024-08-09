import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	projectExemplarityCategoriesListSchema,
	projectExemplarityCategoriesWithTranslationsSchema,
	projectExemplarityCategoryCreateSchema,
	projectExemplarityMarkerCreateSchema,
	projectExemplarityMarkersListSchema,
	projectExemplarityMarkersWithTranslationsSchema,
} from '$lib/crud/validation/projects-descriptors';
import { db } from '$lib/db/db.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityMarkers,
	projectExemplarityMarkersTranslations,
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
		projectExemplarityMarkersListForm,
		projectExemplarityMarkerForms,
		projectExemplarityCategoryCreateForm,
		projectExemplarityCategoriesListForm,
		projectExemplarityMarkerAndCategoryForms,
	] = await Promise.all([
		superValidate(zod(projectExemplarityMarkersListSchema), { id: 'markers-list' }),
		joinTranslations(
			db
				.select({
					...aggTranslations(getColumns(projectExemplarityMarkersTranslations)),
					...getColumns(projectExemplarityMarkers),
				})
				.from(projectExemplarityMarkers)
				.groupBy(projectExemplarityMarkers.id)
				.$dynamic(),
			projectExemplarityMarkersTranslations,
			eq(projectExemplarityMarkers.id, projectExemplarityMarkersTranslations.id)
		).then((d) =>
			Promise.all(
				d.map((marker) =>
					superValidate(marker, zod(projectExemplarityMarkersWithTranslationsSchema), {
						id: marker.id,
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
						superValidate({ categoryId: category.id }, zod(projectExemplarityMarkerCreateSchema), {
							id: `${category.id}-marker`,
						}),
					])
				)
			)
		),
	]);
	return {
		projectExemplarityMarkersListForm,
		projectExemplarityMarkerForms,
		projectExemplarityCategoryCreateForm,
		projectExemplarityCategoriesListForm,
		projectExemplarityMarkerAndCategoryForms,
	};
};

export const actions = {
	createMarker: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityMarkers.create');
		const form = await superValidate(event, zod(projectExemplarityMarkerCreateSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, ...marker } = form.data;
		await db.transaction(async (tx) => {
			const [inserted] = await tx
				.insert(projectExemplarityMarkers)
				.values(marker)
				.returning({ id: projectExemplarityMarkers.id });
			if (!inserted) {
				throw tx.rollback();
			}
			await tx
				.insert(projectExemplarityMarkersTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, ...inserted })));
		});
		return { form };
	},
	updateMarker: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityMarkers.update');
		const form = await superValidate(event, zod(projectExemplarityMarkersWithTranslationsSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, id, ...marker } = form.data;
		await db.transaction(async (tx) => {
			Promise.all([
				tx
					.update(projectExemplarityMarkers)
					.set(marker)
					.where(eq(projectExemplarityMarkers.id, id)),
				tx
					.insert(projectExemplarityMarkersTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [
							projectExemplarityMarkersTranslations.id,
							projectExemplarityMarkersTranslations.lang,
						],
						set: toExcluded(getColumns(projectExemplarityMarkersTranslations)),
					}),
			]);
		});
		return { form };
	},
	deleteMarker: async (event) => {
		authorize(event, 'projects.descriptors.exemplarityMarkers.delete');
		const form = await superValidate(event, zod(projectExemplarityMarkersListSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const [deleted] = await db
			.delete(projectExemplarityMarkers)
			.where(eq(projectExemplarityMarkers.id, form.data.delete))
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

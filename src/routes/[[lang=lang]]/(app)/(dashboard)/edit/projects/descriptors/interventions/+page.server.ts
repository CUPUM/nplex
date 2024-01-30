import * as m from '$i18n/messages';
import { db } from '$lib/db/db.server';
import {
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
	projectInterventionsTranslations,
	projectTypes,
	projectTypesToInterventions,
	projectTypesTranslations,
} from '$lib/db/schema/public';
import { coalesce, emptyJsonArray, excluded, jsonAgg } from '$lib/db/sql.server';
import { getColumns, withTranslations } from '$lib/db/utils.server';
import {
	newProjectInterventionCategorySchema,
	newProjectInterventionSchema,
	projectInterventionsCategoriesWithTranslationsSchema,
	projectInterventionsWithTranslationsSchema,
} from '$lib/db/validation.server';
import {
	messageError,
	messageInvalid,
	messageNoRowsDeleted,
	messageSuccess,
} from '$lib/forms/messages';
import { eq, notInArray } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const rootSchema = z.object({ id: z.string() });

export const load = async (event) => {
	await event.locals.authorize('projects.descriptors.interventions.update');
	const pit = db
		.select({
			interventionId: projectInterventions.id,
			projectTypeIds: coalesce(jsonAgg(projectTypesToInterventions.typeId), emptyJsonArray()).as(
				'types'
			),
		})
		.from(projectInterventions)
		.leftJoin(
			projectTypesToInterventions,
			eq(projectTypesToInterventions.interventionId, projectInterventions.id)
		)
		.groupBy(projectInterventions.id)
		.as('pit');
	const pi = withTranslations(projectInterventions, projectInterventionsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	}).as('pi');
	const interventionsWithTypes = db
		.select({ ...getColumns(pi), projectTypeIds: pit.projectTypeIds })
		.from(pi)
		.leftJoin(pit, eq(pit.interventionId, pi.id));
	const categories = withTranslations(
		projectInterventionsCategories,
		projectInterventionsCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
	const [types, rootForm, newCategoryForm, categoryForms, newInterventionForm, interventionForms] =
		await Promise.all([
			withTranslations(projectTypes, projectTypesTranslations, {
				field: (t) => t.id,
				reference: (tt) => tt.id,
			}),
			superValidate(zod(rootSchema)),
			superValidate(zod(newProjectInterventionCategorySchema)),
			Promise.all(
				await categories.then((data) =>
					data.map((defaults) =>
						superValidate(zod(projectInterventionsCategoriesWithTranslationsSchema, { defaults }), {
							id: defaults.id,
						})
					)
				)
			),
			superValidate(zod(newProjectInterventionSchema)),
			Promise.all(
				await interventionsWithTypes.then((data) =>
					data.map((defaults) =>
						superValidate(zod(projectInterventionsWithTranslationsSchema, { defaults }), {
							id: defaults.id,
						})
					)
				)
			),
		]);
	return {
		types,
		rootForm,
		newCategoryForm,
		categoryForms,
		newInterventionForm,
		interventionForms,
	};
};

export const actions = {
	createIntervention: async (event) => {
		await event.locals.authorize('projects.descriptors.interventions.create');
		const form = await superValidate(event, zod(newProjectInterventionSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_intervention());
		}
		try {
			const { translations, projectTypesIds, ...pt } = form.data;
			await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectInterventions)
					.values(pt)
					.returning({ id: projectInterventions.id });
				await tx
					.insert(projectInterventionsTranslations)
					.values(Object.values(translations).map((tt) => ({ ...tt, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	updateIntervention: async (event) => {
		await event.locals.authorize('projects.descriptors.interventions.update');
		const form = await superValidate(event, zod(projectInterventionsWithTranslationsSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_intervention());
		}
		try {
			const { translations, id, projectTypesIds, ...pt } = form.data;
			await db.transaction(async (tx) => {
				await Promise.all([
					tx.update(projectInterventions).set(pt).where(eq(projectInterventions.id, id)),
					tx
						.insert(projectInterventionsTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [projectInterventionsTranslations.id, projectInterventionsTranslations.lang],
							set: excluded(projectInterventionsTranslations),
						}),
					tx
						.delete(projectTypesToInterventions)
						.where(notInArray(projectTypesToInterventions.typeId, projectTypesIds)),
					tx
						.insert(projectTypesToInterventions)
						.values(projectTypesIds.map((d) => ({ interventionId: id, typeId: d })))
						.onConflictDoNothing(),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	deleteIntervention: async (event) => {
		await event.locals.authorize('projects.descriptors.interventions.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_intervention());
		}
		try {
			const deleted = await db
				.delete(projectInterventions)
				.where(eq(projectInterventions.id, form.data.id))
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
		await event.locals.authorize('projects.descriptors.interventionCategories.create');
		const form = await superValidate(event, zod(newProjectInterventionCategorySchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_intervention());
		}
		try {
			const { translations, ...category } = form.data;
			await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectInterventionsCategories)
					.values(category)
					.returning({ id: projectInterventionsCategories.id });
				await tx
					.insert(projectInterventionsCategoriesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	updateCategory: async (event) => {
		await event.locals.authorize('projects.descriptors.interventionCategories.update');
		const form = await superValidate(
			event,
			zod(projectInterventionsCategoriesWithTranslationsSchema)
		);
		if (!form.valid) {
			return messageInvalid(form, m.project_intervention());
		}
		try {
			const { translations, id, ...pt } = form.data;
			await db.transaction(async (tx) => {
				await Promise.all([
					tx
						.update(projectInterventionsCategories)
						.set(pt)
						.where(eq(projectInterventionsCategories.id, id)),
					tx
						.insert(projectInterventionsCategoriesTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [
								projectInterventionsCategoriesTranslations.id,
								projectInterventionsCategoriesTranslations.lang,
							],
							set: excluded(projectInterventionsCategoriesTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	deleteCategory: async (event) => {
		await event.locals.authorize('projects.descriptors.interventionCategories.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_intervention());
		}
		try {
			const deleted = await db
				.delete(projectInterventionsCategories)
				.where(eq(projectInterventionsCategories.id, form.data.id))
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

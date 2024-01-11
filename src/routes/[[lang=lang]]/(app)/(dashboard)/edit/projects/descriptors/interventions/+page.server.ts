import * as m from '$i18n/messages';
import { guardRoleAdmin, guardRoleContentManagement } from '$lib/auth/authorization.server';
import { dbpool } from '$lib/db/db.server';
import {
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
	projectInterventionsTranslations,
} from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { withTranslations } from '$lib/db/utils.server';
import {
	projectInterventionsCategoriesWithTranslationsSchema,
	projectInterventionsWithTranslationsSchema,
} from '$lib/db/validation.server';
import {
	messageInvalidProjectDescriptor,
	messageServerError,
	messageServerSuccess,
} from '$lib/forms/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { eq } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';

const rootSchema = projectInterventionsWithTranslationsSchema.pick({ id: true });
const newInterventionSchema = projectInterventionsWithTranslationsSchema.omit({ id: true });
const newCategorySchema = projectInterventionsCategoriesWithTranslationsSchema.omit({
	id: true,
});

export const load = async (event) => {
	await guardRoleContentManagement(event);
	const interventions = withTranslations(projectInterventions, projectInterventionsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
	const categories = withTranslations(
		projectInterventionsCategories,
		projectInterventionsCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
	const [rootForm, newCategoryForm, categoryForms, newInterventionForm, interventionForms] =
		await Promise.all([
			superValidate(rootSchema),
			superValidate(newCategorySchema),
			Promise.all(
				await categories.then((data) =>
					data.map((category) =>
						superValidate(category, projectInterventionsCategoriesWithTranslationsSchema, {
							id: category.id,
						})
					)
				)
			),
			superValidate(newInterventionSchema),
			Promise.all(
				await interventions.then((data) =>
					data.map((intervention) =>
						superValidate(intervention, projectInterventionsWithTranslationsSchema, {
							id: intervention.id,
						})
					)
				)
			),
		]);
	return {
		rootForm,
		newCategoryForm,
		categoryForms,
		newInterventionForm,
		interventionForms,
	};
};

export const actions = {
	createIntervention: async (event) => {
		await guardRoleContentManagement(event);
		const form = await superValidate(event, newInterventionSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			const { translations, ...pt } = form.data;
			await dbpool.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectInterventions)
					.values(pt)
					.returning({ id: projectInterventions.id });
				await tx
					.insert(projectInterventionsTranslations)
					.values(Object.values(translations).map((tt) => ({ ...tt, id })));
			});
		} catch (e) {
			console.error(e);
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
	updateIntervention: async (event) => {
		await guardRoleContentManagement(event);
		const form = await superValidate(event, projectInterventionsWithTranslationsSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			const { translations, id, ...pt } = form.data;
			await dbpool.transaction(async (tx) => {
				await Promise.all([
					tx.update(projectInterventions).set(pt).where(eq(projectInterventions.id, id)),
					tx
						.insert(projectInterventionsTranslations)
						.values(Object.values(translations))
						.onConflictDoUpdate({
							target: [projectInterventionsTranslations.id, projectInterventionsTranslations.lang],
							set: excluded(projectInterventionsTranslations),
						}),
				]);
			});
		} catch (e) {
			console.error(e);
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
	deleteIntervention: async (event) => {
		await guardRoleContentManagement(event);
		const form = await superValidate(event, rootSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			await dbpool.delete(projectInterventions).where(eq(projectInterventions.id, form.data.id));
		} catch (e) {
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
	createInterventionCategory: async (event) => {
		await guardRoleAdmin(event);
		const form = await superValidate(event, newInterventionSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			const { translations, ...pt } = form.data;
			await dbpool.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectInterventions)
					.values(pt)
					.returning({ id: projectInterventions.id });
				await tx
					.insert(projectInterventionsTranslations)
					.values(Object.values(translations).map((tt) => ({ ...tt, id })));
			});
		} catch (e) {
			console.error(e);
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
	updateInterventionCategory: async (event) => {
		await guardRoleAdmin(event);
		const form = await superValidate(event, projectInterventionsWithTranslationsSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			const { translations, id, ...pt } = form.data;
			await dbpool.transaction(async (tx) => {
				await Promise.all([
					tx.update(projectInterventions).set(pt).where(eq(projectInterventions.id, id)),
					tx
						.insert(projectInterventionsTranslations)
						.values(Object.values(translations))
						.onConflictDoUpdate({
							target: [projectInterventionsTranslations.id, projectInterventionsTranslations.lang],
							set: excluded(projectInterventionsTranslations),
						}),
				]);
			});
		} catch (e) {
			console.error(e);
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
	deleteInterventionCategory: async (event) => {
		await guardRoleAdmin(event);
		const form = await superValidate(event, rootSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			await dbpool.delete(projectInterventions).where(eq(projectInterventions.id, form.data.id));
		} catch (e) {
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
};

import * as m from '$i18n/messages';
import { guardRoleContentManagement } from '$lib/auth/authorization.server';
import { dbpool } from '$lib/db/db.server';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { withTranslations } from '$lib/db/utils.server';
import { projectTypesWithTranslationsSchema } from '$lib/db/validation.server';
import {
	messageInvalidProjectDescriptor,
	messageServerError,
	messageServerSuccess,
} from '$lib/forms/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { eq } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';

const newTypeSchema = projectTypesWithTranslationsSchema.omit({ id: true });
const typesSchema = projectTypesWithTranslationsSchema.pick({ id: true });

export const load = async (event) => {
	await guardRoleContentManagement(event);
	const types = await withTranslations(projectTypes, projectTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
	const [newTypeForm, typesForm, ...typeForms] = await Promise.all([
		superValidate(newTypeSchema),
		superValidate(typesSchema),
		...types.map((type) =>
			superValidate(type, projectTypesWithTranslationsSchema, { id: type.id })
		),
	]);
	return { typeForms, typesForm, newTypeForm };
};

export const actions = {
	create: async (event) => {
		await guardRoleContentManagement(event);
		const form = await superValidate(event, newTypeSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			const { translations, ...pt } = form.data;
			await dbpool.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectTypes)
					.values(pt)
					.returning({ id: projectTypes.id });
				await tx
					.insert(projectTypesTranslations)
					.values(Object.values(translations).map((tt) => ({ ...tt, id })));
			});
		} catch (e) {
			console.error(e);
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
	update: async (event) => {
		await guardRoleContentManagement(event);
		const form = await superValidate(event, projectTypesWithTranslationsSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			const { translations, id, ...pt } = form.data;
			await dbpool.transaction(async (tx) => {
				await Promise.all([
					tx.update(projectTypes).set(pt).where(eq(projectTypes.id, id)),
					tx
						.insert(projectTypesTranslations)
						.values(Object.values(translations))
						.onConflictDoUpdate({
							target: [projectTypesTranslations.id, projectTypesTranslations.lang],
							set: excluded(projectTypesTranslations),
						}),
				]);
			});
		} catch (e) {
			console.error(e);
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
	delete: async (event) => {
		await guardRoleContentManagement(event);
		const form = await superValidate(event, typesSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			await dbpool.delete(projectTypes).where(eq(projectTypes.id, form.data.id));
		} catch (e) {
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
};

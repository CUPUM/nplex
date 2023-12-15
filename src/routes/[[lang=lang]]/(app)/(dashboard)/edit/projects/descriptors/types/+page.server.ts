import * as m from '$i18n/messages';
import { withContentManagementRole } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { withTranslations } from '$lib/db/utils.server';
import { withTranslationsSchema } from '$lib/db/validation.server';
import {
	messageInvalidProjectDescriptor,
	messageServerError,
	messageServerSuccess,
} from '$lib/forms/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const updateSchema = withTranslationsSchema(
	createInsertSchema(projectTypes).required({ id: true }),
	createInsertSchema(projectTypesTranslations)
);

const createSchema = updateSchema.omit({ id: true });

const deleteSchema = z.object({ ownershipId: z.string() });

export const load = async (event) => {
	await withContentManagementRole(event);
	const types = await withTranslations(projectTypes, projectTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
	const forms = Promise.all([
		...types.map((type) => superValidate(type, updateSchema, { id: type.id })),
	]);
	const newForm = superValidate(createSchema);
	const deleteForm = superValidate(deleteSchema);
	return { forms, deleteForm, newForm };
};

export const actions = {
	create: async (event) => {
		await withContentManagementRole(event);
		const form = await superValidate(event, createSchema);
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
		await withContentManagementRole(event);
		const form = await superValidate(event, updateSchema);
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
		await withContentManagementRole(event);
		const form = await superValidate(event, deleteSchema);
		if (!form.valid) {
			return message(form, messageInvalidProjectDescriptor(m.project_type()));
		}
		try {
			await dbpool.delete(projectTypes).where(eq(projectTypes.id, form.data.ownershipId));
		} catch (e) {
			return message(form, messageServerError(), { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		return message(form, messageServerSuccess());
	},
};

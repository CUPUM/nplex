import * as m from '$i18n/messages';
import { authorize } from '$lib/auth/rbac.server';
import { db } from '$lib/db/db.server';
import { withTranslations } from '$lib/db/queries.server';
import { organizationTypes, organizationTypesTranslations } from '$lib/db/schema/public';
import {
	newOrganizationTypeSchema,
	organizationTypesWithTranslationsSchema,
} from '$lib/db/validation.server';
import {
	messageError,
	messageInvalid,
	messageNoRowsDeleted,
	messageSuccess,
} from '$lib/forms/messages';
import { eq } from 'drizzle-orm';
import { excluded } from 'drizzle-orm-helpers';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const typesSchema = organizationTypesWithTranslationsSchema.pick({ id: true });

export const load = async (event) => {
	authorize(event, 'organizations.descriptors.types.update');
	const types = await withTranslations(organizationTypes, organizationTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
	const [newTypeForm, typesForm, ...typeForms] = await Promise.all([
		superValidate(zod(newOrganizationTypeSchema)),
		superValidate(zod(typesSchema)),
		...types.map((defaults) =>
			superValidate(zod(organizationTypesWithTranslationsSchema, { defaults }), { id: defaults.id })
		),
	]);
	return { typeForms, typesForm, newTypeForm };
};

export const actions = {
	create: async (event) => {
		authorize(event, 'organizations.descriptors.types.create');
		const form = await superValidate(event, zod(newOrganizationTypeSchema));
		if (!form.valid) {
			return messageInvalid(form, m.organization_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, ...pt } = form.data;
				const [{ id }] = await tx
					.insert(organizationTypes)
					.values(pt)
					.returning({ id: organizationTypes.id });
				await tx
					.insert(organizationTypesTranslations)
					.values(Object.values(translations).map((tt) => ({ ...tt, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	update: async (event) => {
		authorize(event, 'organizations.descriptors.types.update');
		const form = await superValidate(event, zod(organizationTypesWithTranslationsSchema));
		if (!form.valid) {
			return messageInvalid(form, m.organization_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, id, ...pt } = form.data;
				await Promise.all([
					tx.update(organizationTypes).set(pt).where(eq(organizationTypes.id, id)),
					tx
						.insert(organizationTypesTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [organizationTypesTranslations.id, organizationTypesTranslations.lang],
							set: excluded(organizationTypesTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	delete: async (event) => {
		authorize(event, 'organizations.descriptors.types.delete');
		const form = await superValidate(event, zod(typesSchema));
		if (!form.valid) {
			return messageInvalid(form, m.organization_type());
		}
		try {
			const deleted = await db
				.delete(organizationTypes)
				.where(eq(organizationTypes.id, form.data.id))
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

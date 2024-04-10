import * as m from '$i18n/messages';
import { authorize } from '$lib/auth/rbac.server';
import { excluded } from '$lib/db/custom-types.server';
import { db } from '$lib/db/db.server';
import { withTranslations } from '$lib/db/queries.server';
import {
	projectImplantationTypes,
	projectImplantationTypesTranslations,
} from '$lib/db/schema/public';
import {
	newProjectImplantationTypeSchema,
	projectImplantationTypesSchema,
	projectImplantationTypesWithTranslationsSchema,
} from '$lib/db/validation.server';
import {
	messageError,
	messageInvalid,
	messageNoRowsDeleted,
	messageSuccess,
} from '$lib/forms/messages';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const rootSchema = projectImplantationTypesSchema.pick({ id: true });

export const load = async (event) => {
	authorize(event, 'projects.descriptors.implantationTypes.update');
	const implantationTypes = await withTranslations(
		projectImplantationTypes,
		projectImplantationTypesTranslations,
		{
			field: (t) => t.id,
			reference: (tt) => tt.id,
		}
	);
	const [newImplantationTypeForm, implantationTypesForm, ...implantationTypeForms] =
		await Promise.all([
			superValidate(zod(newProjectImplantationTypeSchema)),
			superValidate(zod(rootSchema)),
			...implantationTypes.map((defaults) =>
				superValidate(zod(projectImplantationTypesWithTranslationsSchema, { defaults }), {
					id: defaults.id,
				})
			),
		]);
	return { implantationTypesForm, implantationTypeForms, newImplantationTypeForm };
};

export const actions = {
	create: async (event) => {
		authorize(event, 'projects.descriptors.implantationTypes.create');
		const form = await superValidate(event, zod(newProjectImplantationTypeSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, ...pi } = form.data;
				const [{ id }] = await tx
					.insert(projectImplantationTypes)
					.values(pi)
					.returning({ id: projectImplantationTypes.id });
				await tx
					.insert(projectImplantationTypesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	update: async (event) => {
		authorize(event, 'projects.descriptors.implantationTypes.update');
		const form = await superValidate(event, zod(projectImplantationTypesWithTranslationsSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, id, ...pi } = form.data;
				await Promise.all([
					tx.update(projectImplantationTypes).set(pi).where(eq(projectImplantationTypes.id, id)),
					tx
						.insert(projectImplantationTypesTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [
								projectImplantationTypesTranslations.id,
								projectImplantationTypesTranslations.lang,
							],
							set: excluded(projectImplantationTypesTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	delete: async (event) => {
		authorize(event, 'projects.descriptors.implantationTypes.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_type());
		}
		try {
			const deleted = await db
				.delete(projectImplantationTypes)
				.where(eq(projectImplantationTypes.id, form.data.id))
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

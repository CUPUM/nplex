import * as m from '$i18n/messages';
import { authorize } from '$lib/auth/rbac.server';
import { db } from '$lib/db/db.server';
import { withTranslations } from '$lib/db/queries.server';
import { projectImageTypes, projectImageTypesTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import {
	newProjectImageTypeSchema,
	projectImageTypesSchema,
	projectImageTypesWithTranslationsSchema,
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

const rootSchema = projectImageTypesSchema.pick({ id: true });

export const load = async (event) => {
	authorize(event, 'projects.descriptors.imageTypes.update');
	const imageTypes = await withTranslations(projectImageTypes, projectImageTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
	const [newImageTypeForm, imageTypesForm, ...imageTypeForms] = await Promise.all([
		superValidate(zod(newProjectImageTypeSchema)),
		superValidate(zod(rootSchema)),
		...imageTypes.map((defaults) =>
			superValidate(zod(projectImageTypesWithTranslationsSchema, { defaults }), {
				id: defaults.id,
			})
		),
	]);
	return { imageTypesForm, imageTypeForms, newImageTypeForm };
};

export const actions = {
	create: async (event) => {
		authorize(event, 'projects.descriptors.imageTypes.create');
		const form = await superValidate(event, zod(newProjectImageTypeSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_image_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, ...pl } = form.data;
				const [{ id }] = await tx
					.insert(projectImageTypes)
					.values(pl)
					.returning({ id: projectImageTypes.id });
				await tx
					.insert(projectImageTypesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	update: async (event) => {
		authorize(event, 'projects.descriptors.imageTypes.update');
		const form = await superValidate(event, zod(projectImageTypesWithTranslationsSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_image_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, id, ...pi } = form.data;
				await Promise.all([
					tx.update(projectImageTypes).set(pi).where(eq(projectImageTypes.id, id)),
					tx
						.insert(projectImageTypesTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [projectImageTypesTranslations.id, projectImageTypesTranslations.lang],
							set: excluded(projectImageTypesTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	delete: async (event) => {
		authorize(event, 'projects.descriptors.imageTypes.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_image_type());
		}
		try {
			const deleted = await db
				.delete(projectImageTypes)
				.where(eq(projectImageTypes.id, form.data.id))
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

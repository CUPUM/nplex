import * as m from '$i18n/messages';
import { db } from '$lib/db/db.server';
import {
	projectBuildingLevelTypes,
	projectBuildingLevelTypesTranslations,
} from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { joinTranslations } from '$lib/db/utils.server';
import {
	newProjectBuildingLevelTypeSchema,
	projectBuildingLevelTypesSchema,
	projectBuildingLevelTypesWithTranslationsSchema,
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

const rootSchema = projectBuildingLevelTypesSchema.pick({ id: true });

export const load = async (event) => {
	await event.locals.authorize('projects.descriptors.buildingLevelTypes.update');
	const levelTypes = await joinTranslations(
		projectBuildingLevelTypes,
		projectBuildingLevelTypesTranslations,
		{
			field: (t) => t.id,
			reference: (tt) => tt.id,
		}
	);
	const [newLevelTypeForm, levelTypesForm, ...levelTypeForms] = await Promise.all([
		superValidate(zod(newProjectBuildingLevelTypeSchema)),
		superValidate(zod(rootSchema)),
		...levelTypes.map((defaults) =>
			superValidate(zod(projectBuildingLevelTypesWithTranslationsSchema, { defaults }), {
				id: defaults.id,
			})
		),
	]);
	return { levelTypesForm, levelTypeForms, newLevelTypeForm };
};

export const actions = {
	create: async (event) => {
		await event.locals.authorize('projects.descriptors.buildingLevelTypes.create');
		const form = await superValidate(event, zod(newProjectBuildingLevelTypeSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_descriptors_level_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, ...pl } = form.data;
				const [{ id }] = await tx
					.insert(projectBuildingLevelTypes)
					.values(pl)
					.returning({ id: projectBuildingLevelTypes.id });
				await tx
					.insert(projectBuildingLevelTypesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	update: async (event) => {
		await event.locals.authorize('projects.descriptors.buildingLevelTypes.update');
		const form = await superValidate(event, zod(projectBuildingLevelTypesWithTranslationsSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_descriptors_level_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, id, ...pi } = form.data;
				await Promise.all([
					tx.update(projectBuildingLevelTypes).set(pi).where(eq(projectBuildingLevelTypes.id, id)),
					tx
						.insert(projectBuildingLevelTypesTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [
								projectBuildingLevelTypesTranslations.id,
								projectBuildingLevelTypesTranslations.lang,
							],
							set: excluded(projectBuildingLevelTypesTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	delete: async (event) => {
		await event.locals.authorize('projects.descriptors.buildingLevelTypes.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_descriptors_level_type());
		}
		try {
			const deleted = await db
				.delete(projectBuildingLevelTypes)
				.where(eq(projectBuildingLevelTypes.id, form.data.id))
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

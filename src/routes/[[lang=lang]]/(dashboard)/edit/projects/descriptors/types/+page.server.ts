import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	newProjectTypeFormSchema,
	projectTypesFormSchema,
	projectTypesWithTranslationsSchema,
} from '$lib/crud/validation/projects-descriptors';
import { db } from '$lib/db/db.server';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public.server';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event, 'projects.descriptors.types.update');
	const types = await joinTranslations(
		db
			.select({
				...getColumns(projectTypes),
				...aggTranslations(getColumns(projectTypesTranslations)),
			})
			.from(projectTypes)
			.groupBy(projectTypes.id)
			.$dynamic(),
		projectTypesTranslations,
		eq(projectTypes.id, projectTypesTranslations.id)
	);
	const [newProjectTypeForm, projectTypesForm, projectTypeForms] = await Promise.all([
		superValidate(zod(newProjectTypeFormSchema)),
		superValidate(zod(projectTypesFormSchema)),
		Promise.all(
			types.map((type) =>
				superValidate(type, zod(projectTypesWithTranslationsSchema), { id: type.id })
			)
		),
	]);
	return {
		projectTypeForms,
		projectTypesForm,
		newProjectTypeForm,
	};
};

export const actions = {
	create: async (event) => {
		authorize(event, 'projects.descriptors.types.create');
		// const form = await superValidate(event, zod(newProjectTypeSchema));
		// if (!form.valid) {
		// 	return messageInvalid(form, m.project_type());
		// }
		// try {
		// 	await db.transaction(async (tx) => {
		// 		const { translations, ...pt } = form.data;
		// 		const [{ id }] = await tx
		// 			.insert(projectTypes)
		// 			.values(pt)
		// 			.returning({ id: projectTypes.id });
		// 		await tx
		// 			.insert(projectTypesTranslations)
		// 			.values(Object.values(translations).map((tt) => ({ ...tt, id })));
		// 	});
		// } catch (e) {
		// 	return messageError(form);
		// }
		// return messageSuccess(form);
	},
	update: async (event) => {
		authorize(event, 'projects.descriptors.types.update');
		// const form = await superValidate(event, zod(projectTypesWithTranslationsSchema));
		// if (!form.valid) {
		// 	return messageInvalid(form, m.project_type());
		// }
		// try {
		// 	await db.transaction(async (tx) => {
		// 		const { translations, id, ...pt } = form.data;
		// 		await Promise.all([
		// 			tx.update(projectTypes).set(pt).where(eq(projectTypes.id, id)),
		// 			tx
		// 				.insert(projectTypesTranslations)
		// 				.values(Object.values(translations).map((d) => ({ ...d, id })))
		// 				.onConflictDoUpdate({
		// 					target: [projectTypesTranslations.id, projectTypesTranslations.lang],
		// 					set: toExcluded(projectTypesTranslations),
		// 				}),
		// 		]);
		// 	});
		// } catch (e) {
		// 	return messageError(form);
		// }
		// return messageSuccess(form);
	},
	delete: async (event) => {
		authorize(event, 'projects.descriptors.types.delete');
		// const form = await superValidate(event, zod(typesSchema));
		// if (!form.valid) {
		// 	return messageInvalid(form, m.project_type());
		// }
		// try {
		// 	const deleted = await db
		// 		.delete(projectTypes)
		// 		.where(eq(projectTypes.id, form.data.id))
		// 		.returning();
		// 	if (!deleted.length) {
		// 		return messageNoRowsDeleted(form);
		// 	}
		// } catch (e) {
		// 	return messageError(form);
		// }
		// return messageSuccess(form);
	},
};

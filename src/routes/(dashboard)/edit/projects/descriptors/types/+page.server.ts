import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	projectTypeCreateFormSchema,
	projectTypesFormSchema,
	projectTypesWithTranslationsSchema,
} from '$lib/crud/validation/projects-descriptors';
import { db } from '$lib/db/db.server';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { toExcluded } from 'drizzle-orm-helpers/pg';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event, 'projects.descriptors.types.update');
	const [projectTypeCreateForm, projectTypesForm, projectTypeForms] = await Promise.all([
		superValidate(zod(projectTypeCreateFormSchema)),
		superValidate(zod(projectTypesFormSchema)),
		joinTranslations(
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
		).then((d) =>
			Promise.all(
				d.map((type) =>
					superValidate(type, zod(projectTypesWithTranslationsSchema), { id: type.id })
				)
			)
		),
	]);
	return {
		projectTypeForms,
		projectTypesForm,
		projectTypeCreateForm,
	};
};

export const actions = {
	create: async (event) => {
		authorize(event, 'projects.descriptors.types.create');
		const form = await superValidate(event, zod(projectTypeCreateFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, ...pt } = form.data;
			const [inserted] = await tx
				.insert(projectTypes)
				.values(pt)
				.returning({ id: projectTypes.id });
			if (!inserted) {
				tx.rollback();
				error(STATUS_CODES.INTERNAL_SERVER_ERROR);
			}
			await tx
				.insert(projectTypesTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, ...inserted })));
		});
		return { form };
	},
	update: async (event) => {
		authorize(event, 'projects.descriptors.types.update');
		const form = await superValidate(event, zod(projectTypesWithTranslationsSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, id, ...type } = form.data;
			Promise.all([
				tx.update(projectTypes).set(type).where(eq(projectTypes.id, id)),
				tx
					.insert(projectTypesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [projectTypesTranslations.id, projectTypesTranslations.lang],
						set: toExcluded(getColumns(projectTypesTranslations)),
					}),
			]);
		});
		return { form };
	},
	delete: async (event) => {
		authorize(event, 'projects.descriptors.types.delete');
		const form = await superValidate(event, zod(projectTypesFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		const [deleted] = await db
			.delete(projectTypes)
			.where(eq(projectTypes.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND, { message: 'Could not find any corresponding row.' });
		}
		return { form };
	},
};

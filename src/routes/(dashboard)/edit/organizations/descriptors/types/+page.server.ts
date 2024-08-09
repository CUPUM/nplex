import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	organizationTypeCreateSchema,
	organizationTypesListSchema,
	organizationTypesWithTranslationsSchema,
} from '$lib/crud/validation/organizations-descriptors';
import { db } from '$lib/db/db.server';
import { organizationTypes, organizationTypesTranslations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { toExcluded } from 'drizzle-orm-helpers/pg';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event, 'organizations.descriptors.types.update');
	const [organizationTypeCreateForm, organizationTypesForm, organizationTypeForms] =
		await Promise.all([
			superValidate(zod(organizationTypeCreateSchema)),
			superValidate(zod(organizationTypesListSchema)),
			joinTranslations(
				db
					.select({
						...getColumns(organizationTypes),
						...aggTranslations(getColumns(organizationTypesTranslations)),
					})
					.from(organizationTypes)
					.groupBy(organizationTypes.id)
					.$dynamic(),
				organizationTypesTranslations,
				eq(organizationTypes.id, organizationTypesTranslations.id)
			).then((d) =>
				Promise.all(
					d.map((type) =>
						superValidate(type, zod(organizationTypesWithTranslationsSchema), { id: type.id })
					)
				)
			),
		]);
	return {
		organizationTypeForms,
		organizationTypesForm,
		organizationTypeCreateForm,
	};
};

export const actions = {
	create: async (event) => {
		authorize(event, 'organizations.descriptors.types.create');
		const form = await superValidate(event, zod(organizationTypeCreateSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, ...pt } = form.data;
			const [inserted] = await tx
				.insert(organizationTypes)
				.values(pt)
				.returning({ id: organizationTypes.id });
			if (!inserted) {
				tx.rollback();
				error(STATUS_CODES.INTERNAL_SERVER_ERROR);
			}
			await tx
				.insert(organizationTypesTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, ...inserted })));
		});
		return { form };
	},
	update: async (event) => {
		authorize(event, 'organizations.descriptors.types.update');
		const form = await superValidate(event, zod(organizationTypesWithTranslationsSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, id, ...type } = form.data;
			await Promise.all([
				tx.update(organizationTypes).set(type).where(eq(organizationTypes.id, id)),
				tx
					.insert(organizationTypesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [organizationTypesTranslations.id, organizationTypesTranslations.lang],
						set: toExcluded(getColumns(organizationTypesTranslations)),
					}),
			]);
		});
		return { form };
	},
	delete: async (event) => {
		authorize(event, 'organizations.descriptors.types.delete');
		const form = await superValidate(event, zod(organizationTypesListSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		const [deleted] = await db
			.delete(organizationTypes)
			.where(eq(organizationTypes.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND, { message: 'Could not find any corresponding row.' });
		}
		return { form };
	},
};

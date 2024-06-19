import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	organizationExpertiseCreateSchema,
	organizationExpertisesListSchema,
	organizationExpertisesWithTranslationsSchema,
} from '$lib/crud/validation/organizations-descriptors';
import { db } from '$lib/db/db.server';
import {
	organizationExpertises,
	organizationExpertisesTranslations,
} from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { toExcluded } from 'drizzle-orm-helpers/pg';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event, 'organizations.descriptors.types.update');
	const [organizationExpertiseCreateForm, organizationExpertisesForm, organizationExpertiseForms] =
		await Promise.all([
			superValidate(zod(organizationExpertiseCreateSchema)),
			superValidate(zod(organizationExpertisesListSchema)),
			joinTranslations(
				db
					.select({
						...getColumns(organizationExpertises),
						...aggTranslations(getColumns(organizationExpertisesTranslations)),
					})
					.from(organizationExpertises)
					.groupBy(organizationExpertises.id)
					.$dynamic(),
				organizationExpertisesTranslations,
				eq(organizationExpertises.id, organizationExpertisesTranslations.id)
			).then((d) =>
				Promise.all(
					d.map((type) =>
						superValidate(type, zod(organizationExpertisesWithTranslationsSchema), { id: type.id })
					)
				)
			),
		]);
	return {
		organizationExpertiseForms,
		organizationExpertisesForm,
		organizationExpertiseCreateForm,
	};
};

export const actions = {
	create: async (event) => {
		authorize(event, 'organizations.descriptors.types.create');
		const form = await superValidate(event, zod(organizationExpertiseCreateSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, ...pt } = form.data;
			const [inserted] = await tx
				.insert(organizationExpertises)
				.values(pt)
				.returning({ id: organizationExpertises.id });
			if (!inserted) {
				tx.rollback();
				error(STATUS_CODES.INTERNAL_SERVER_ERROR);
			}
			await tx
				.insert(organizationExpertisesTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, ...inserted })));
		});
		return { form };
	},
	update: async (event) => {
		authorize(event, 'organizations.descriptors.types.update');
		const form = await superValidate(event, zod(organizationExpertisesWithTranslationsSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, id, ...type } = form.data;
			await Promise.all([
				tx.update(organizationExpertises).set(type).where(eq(organizationExpertises.id, id)),
				tx
					.insert(organizationExpertisesTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [
							organizationExpertisesTranslations.id,
							organizationExpertisesTranslations.lang,
						],
						set: toExcluded(getColumns(organizationExpertisesTranslations)),
					}),
			]);
		});
		return { form };
	},
	delete: async (event) => {
		authorize(event, 'organizations.descriptors.types.delete');
		const form = await superValidate(event, zod(organizationExpertisesListSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		const [deleted] = await db
			.delete(organizationExpertises)
			.where(eq(organizationExpertises.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND, { message: 'Could not find any corresponding row.' });
		}
		return { form };
	},
};

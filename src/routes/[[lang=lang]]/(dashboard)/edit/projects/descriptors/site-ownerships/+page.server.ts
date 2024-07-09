import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	projectSiteOwnershipCreateSchema,
	projectSiteOwnershipsListSchema,
	projectSiteOwnershipsWithTranslationsSchema,
} from '$lib/crud/validation/projects-descriptors';
import { db } from '$lib/db/db.server';
import {
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
} from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { toExcluded } from 'drizzle-orm-helpers/pg';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event, 'projects.descriptors.siteOwnerships.update');
	const [createForm, listForm, forms] = await Promise.all([
		superValidate(zod(projectSiteOwnershipCreateSchema)),
		superValidate(zod(projectSiteOwnershipsListSchema)),
		joinTranslations(
			db
				.select({
					...getColumns(projectSiteOwnerships),
					...aggTranslations(getColumns(projectSiteOwnershipsTranslations)),
				})
				.from(projectSiteOwnerships)
				.groupBy(projectSiteOwnerships.id)
				.$dynamic(),
			projectSiteOwnershipsTranslations,
			eq(projectSiteOwnerships.id, projectSiteOwnershipsTranslations.id)
		).then((d) =>
			Promise.all(
				d.map((ownership) =>
					superValidate(ownership, zod(projectSiteOwnershipsWithTranslationsSchema), {
						id: ownership.id,
					})
				)
			)
		),
	]);
	return {
		forms,
		createForm,
		listForm,
	};
};

export const actions = {
	create: async (event) => {
		authorize(event, 'projects.descriptors.siteOwnerships.create');
		const form = await superValidate(event, zod(projectSiteOwnershipCreateSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, ...pt } = form.data;
			const [inserted] = await tx
				.insert(projectSiteOwnerships)
				.values(pt)
				.returning({ id: projectSiteOwnerships.id });
			if (!inserted) {
				tx.rollback();
				error(STATUS_CODES.INTERNAL_SERVER_ERROR);
			}
			await tx
				.insert(projectSiteOwnershipsTranslations)
				.values(Object.values(translations).map((tt) => ({ ...tt, ...inserted })));
		});
		return {
			form,
		};
	},
	update: async (event) => {
		authorize(event, 'projects.descriptors.siteOwnerships.update');
		const form = await superValidate(event, zod(projectSiteOwnershipsWithTranslationsSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db.transaction(async (tx) => {
			const { translations, id, ...ownership } = form.data;
			Promise.all([
				tx.update(projectSiteOwnerships).set(ownership).where(eq(projectSiteOwnerships.id, id)),
				tx
					.insert(projectSiteOwnershipsTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })))
					.onConflictDoUpdate({
						target: [projectSiteOwnershipsTranslations.id, projectSiteOwnershipsTranslations.lang],
						set: toExcluded(getColumns(projectSiteOwnershipsTranslations)),
					}),
			]);
		});
		return {
			form,
		};
	},
	delete: async (event) => {
		authorize(event, 'projects.descriptors.siteOwnerships.delete');
		const form = await superValidate(event, zod(projectSiteOwnershipsListSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		const [deleted] = await db
			.delete(projectSiteOwnerships)
			.where(eq(projectSiteOwnerships.id, form.data.delete))
			.returning();
		if (!deleted) {
			error(STATUS_CODES.NOT_FOUND, { message: 'Could not find any corresponding row.' });
		}
		return {
			form,
		};
	},
};

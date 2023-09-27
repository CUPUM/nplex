import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectTypeInsertSchema, projectTypeTranslationInsertSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import { locales } from '$lib/db/schema/i18n';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public';
import { boolean, excluded } from '$lib/db/sql';
import { translationsAgg, withTranslationsSchema } from '$lib/db/utils';
import { LOCALES_ARR } from '$lib/i18n/constants';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const typesUpdateSchema = z.object({
	types: z.array(
		withTranslationsSchema(projectTypeInsertSchema, projectTypeTranslationInsertSchema)
	),
});

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);

	const types = await dbpool
		.select({
			...getTableColumns(projectTypes),
			translations: translationsAgg(projectTypesTranslations),
		})
		.from(projectTypes)
		.leftJoin(locales, boolean(true))
		.leftJoin(
			projectTypesTranslations,
			and(
				eq(projectTypes.id, projectTypesTranslations.id),
				eq(locales.locale, projectTypesTranslations.locale)
			)
		)
		.groupBy(projectTypes.id)
		.orderBy(projectTypes.index);

	const form = await superValidate({ types }, typesUpdateSchema);

	// console.log(JSON.stringify(form.data, undefined, 2));

	return { form, types };
};

export const actions = {
	create: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		try {
			await dbpool.insert(projectTypes).values({});
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	delete: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('type_id');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.delete(projectTypes).where(eq(projectTypes.id, id));
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, typesUpdateSchema);
		console.log(form);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const pt = form.data.types.map(({ translations, ...t }, index) => ({ ...t, index }));
				await tx
					.insert(projectTypes)
					.values(pt)
					.onConflictDoUpdate({
						target: projectTypes.id,
						set: {
							id: excluded(projectTypes.id),
							index: excluded(projectTypes.index),
						},
					});
				const tt = form.data.types.flatMap((t) =>
					LOCALES_ARR.map((locale) => ({ ...t.translations[locale], id: t.id, locale }))
				);
				await tx
					.insert(projectTypesTranslations)
					.values(tt)
					.onConflictDoUpdate({
						target: [projectTypesTranslations.id, projectTypesTranslations.locale],
						set: {
							title: excluded(projectTypesTranslations.title),
							description: excluded(projectTypesTranslations.description),
						},
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
	},
};

import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectTypesUpdateSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import { locales } from '$lib/db/schema/i18n';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public';
import { boolean, excluded } from '$lib/db/sql';
import { extractTranslations, translationsAgg } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

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

	const form = await superValidate({ types }, projectTypesUpdateSchema);

	return { form };
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
		const id = event.url.searchParams.get('typeId');
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
		const form = await superValidate(event, projectTypesUpdateSchema);
		if (!form.valid) {
			console.info(form.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [pt, ptt] = extractTranslations(form.data.types);
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
				await tx
					.insert(projectTypesTranslations)
					.values(ptt)
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
			throw error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur serveur' });
		}
	},
};

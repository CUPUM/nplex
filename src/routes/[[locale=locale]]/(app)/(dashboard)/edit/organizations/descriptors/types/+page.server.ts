import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { organizationTypesUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { organizationTypes, organizationTypesTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { extractTranslations, reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);
	const types = (
		await dbpool.query.organizationTypes.findMany({
			with: {
				translations: true,
			},
		})
	).map(reduceTranslations);
	const form = await superValidate({ types }, organizationTypesUpdateSchema);
	return { form };
};

export const actions = {
	create: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		try {
			await dbpool.insert(organizationTypes).values({});
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
			await dbpool.delete(organizationTypes).where(eq(organizationTypes.id, id));
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, organizationTypesUpdateSchema);
		if (!form.valid) {
			console.info(form.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [ot, ott] = extractTranslations(form.data.types);
				await tx
					.insert(organizationTypes)
					.values(ot)
					.onConflictDoUpdate({
						target: organizationTypes.id,
						set: excluded(organizationTypes),
					});
				await tx
					.insert(organizationTypesTranslations)
					.values(ott)
					.onConflictDoUpdate({
						target: [organizationTypesTranslations.id, organizationTypesTranslations.locale],
						set: excluded(organizationTypesTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			throw error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur serveur' });
		}
	},
};

import { authorizeRole } from '$lib/auth/authorization.server';
import { USER_ROLES } from '$lib/auth/constants';
import { organizationTypesUpdateSchema } from '$lib/db/crud.server';
import { db } from '$lib/db/db.server';
import { organizationTypes, organizationTypesTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { extractTranslations, reduceTranslations } from '$lib/db/utils.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await authorizeRole(event, USER_ROLES.ADMIN);
	const types = (
		await db.query.organizationTypes.findMany({
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
		await authorizeRole(event, USER_ROLES.ADMIN);
		try {
			await db.insert(organizationTypes).values({});
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	delete: async (event) => {
		await authorizeRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('typeId');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await db.delete(organizationTypes).where(eq(organizationTypes.id, id));
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await authorizeRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, organizationTypesUpdateSchema);
		if (!form.valid) {
			console.info(form.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await db.transaction(async (tx) => {
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
						target: [organizationTypesTranslations.id, organizationTypesTranslations.lang],
						set: excluded(organizationTypesTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur serveur' });
		}
	},
};

import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectTypesUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { extractTranslations, reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);

	const types = (
		await dbpool.query.projectTypes.findMany({
			with: {
				translations: true,
			},
		})
	).map(reduceTranslations);

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
						set: excluded(projectTypes),
					});
				await tx
					.insert(projectTypesTranslations)
					.values(ptt)
					.onConflictDoUpdate({
						target: [projectTypesTranslations.id, projectTypesTranslations.lang],
						set: excluded(projectTypesTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			throw error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur serveur' });
		}
	},
};

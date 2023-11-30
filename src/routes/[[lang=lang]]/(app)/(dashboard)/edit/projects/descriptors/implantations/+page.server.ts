import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectImplantationTypesUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import {
	projectImplantationTypes,
	projectImplantationTypesTranslations,
} from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { extractTranslations, reduceTranslations } from '$lib/db/utils.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);
	const implantationTypes = (
		await dbpool.query.projectImplantationTypes.findMany({ with: { translations: true } })
	).map(reduceTranslations);
	const form = await superValidate({ implantationTypes }, projectImplantationTypesUpdateSchema);
	return { form };
};

export const actions = {
	create: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		try {
			await dbpool.insert(projectImplantationTypes).values({});
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	delete: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('implantationTypeId');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.delete(projectImplantationTypes).where(eq(projectImplantationTypes.id, id));
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, projectImplantationTypesUpdateSchema);
		if (!form.valid) {
			console.error(form.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [pso, psot] = extractTranslations(form.data.implantationTypes);
				await tx
					.insert(projectImplantationTypes)
					.values(pso)
					.onConflictDoUpdate({
						target: projectImplantationTypes.id,
						set: excluded(projectImplantationTypes),
					});
				await tx
					.insert(projectImplantationTypesTranslations)
					.values(psot)
					.onConflictDoUpdate({
						target: [
							projectImplantationTypesTranslations.id,
							projectImplantationTypesTranslations.lang,
						],
						set: excluded(projectImplantationTypesTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
};

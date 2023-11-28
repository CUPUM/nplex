import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectBuildingLevelTypesUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import {
	projectBuildingLevelTypes,
	projectBuildingLevelTypesTranslations,
} from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { extractTranslations, reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);
	const buildingLevelTypes = (
		await dbpool.query.projectBuildingLevelTypes.findMany({ with: { translations: true } })
	).map(reduceTranslations);
	const form = await superValidate({ buildingLevelTypes }, projectBuildingLevelTypesUpdateSchema);
	return { form };
};

export const actions = {
	create: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		try {
			const verticalIndex = Number(event.url.searchParams.get('verticalIndex')) ?? 0;
			await dbpool.insert(projectBuildingLevelTypes).values({ verticalIndex });
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	delete: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('levelTypeId');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.delete(projectBuildingLevelTypes).where(eq(projectBuildingLevelTypes.id, id));
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, projectBuildingLevelTypesUpdateSchema);
		if (!form.valid) {
			console.error(form.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [pso, psot] = extractTranslations(form.data.buildingLevelTypes);
				await tx
					.insert(projectBuildingLevelTypes)
					.values(pso)
					.onConflictDoUpdate({
						target: projectBuildingLevelTypes.id,
						set: excluded(projectBuildingLevelTypes),
					});
				await tx
					.insert(projectBuildingLevelTypesTranslations)
					.values(psot)
					.onConflictDoUpdate({
						target: [
							projectBuildingLevelTypesTranslations.id,
							projectBuildingLevelTypesTranslations.lang,
						],
						set: excluded(projectBuildingLevelTypesTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
};

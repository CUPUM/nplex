import { USER_ROLES } from '$lib/auth/constants';
import { guardRole } from '$lib/auth/guard.server';
import {
	projectImageTemporalitiesUpdateSchema,
	projectImageTypesUpdateSchema,
} from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import {
	projectImageTemporalities,
	projectImageTemporalitiesTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
} from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { extractTranslations, reduceTranslations } from '$lib/db/utils.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async (event) => {
	await guardRole(event, USER_ROLES.ADMIN);
	const data = await dbpool.transaction(async (tx) => {
		const imageTypes = (
			await tx.query.projectImageTypes.findMany({
				with: { translations: true },
			})
		).map(reduceTranslations);
		const imageTemporalities = (
			await tx.query.projectImageTemporalities.findMany({
				with: { translations: true },
			})
		).map(reduceTranslations);
		return { imageTypes, imageTemporalities };
	});
	const { imageTypes, imageTemporalities } = data;
	const imageTypesForm = await superValidate({ imageTypes }, projectImageTypesUpdateSchema, {
		id: 'types',
	});
	const imageTemporalitiesForm = await superValidate(
		{ imageTemporalities },
		projectImageTemporalitiesUpdateSchema,
		{ id: 'temporalities' }
	);
	return { imageTypesForm, imageTemporalitiesForm };
};

export const actions = {
	createImageType: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		try {
			await dbpool.insert(projectImageTypes).values({});
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	deleteImageType: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('imageTypeId');
		if (!id) {
			throw fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.delete(projectImageTypes).where(eq(projectImageTypes.id, id));
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	updateImageTypes: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, projectImageTypesUpdateSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [pit, pitt] = extractTranslations(form.data.imageTypes);
				await tx
					.insert(projectImageTypes)
					.values(pit)
					.onConflictDoUpdate({
						target: projectImageTypes.id,
						set: excluded(projectImageTypes),
					});
				await tx
					.insert(projectImageTypesTranslations)
					.values(pitt)
					.onConflictDoUpdate({
						target: [projectImageTypesTranslations.id, projectImageTypesTranslations.lang],
						set: excluded(projectImageTypesTranslations),
					});
			});
		} catch (e) {
			console.error(e);
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur serveur' });
		}
	},
	createImageTemporalities: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		try {
			await dbpool.insert(projectImageTemporalities).values({});
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	deleteImageTemporalities: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('imageTemporalityId');
		if (!id) {
			throw fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.delete(projectImageTemporalities).where(eq(projectImageTemporalities.id, id));
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	updateImageTemporalities: async (event) => {
		await guardRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, projectImageTemporalitiesUpdateSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [pit, pitt] = extractTranslations(form.data.imageTemporalities);
				await tx
					.insert(projectImageTemporalities)
					.values(pit)
					.onConflictDoUpdate({
						target: projectImageTemporalities.id,
						set: excluded(projectImageTemporalities),
					});
				await tx
					.insert(projectImageTemporalitiesTranslations)
					.values(pitt)
					.onConflictDoUpdate({
						target: [
							projectImageTemporalitiesTranslations.id,
							projectImageTemporalitiesTranslations.lang,
						],
						set: excluded(projectImageTemporalitiesTranslations),
					});
			});
		} catch (e) {
			console.error(e);
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: 'Erreur serveur' });
		}
	},
};

import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectSiteOwnershipsUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { projectSiteOwnerships, projectSiteOwnershipsTranslations } from '$lib/db/schema/public';
import { extractTranslations, getAllExcluded, reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async (event) => {
	await withRole(event, USER_ROLES.ADMIN);
	const siteOwnerships = (
		await dbpool.query.projectSiteOwnerships.findMany({ with: { translations: true } })
	).map(reduceTranslations);
	const form = await superValidate({ siteOwnerships }, projectSiteOwnershipsUpdateSchema);
	return { form };
};

export const actions = {
	create: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		try {
			await dbpool.insert(projectSiteOwnerships).values({});
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	delete: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const id = event.url.searchParams.get('siteOwnershipId');
		if (!id) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			await dbpool.delete(projectSiteOwnerships).where(eq(projectSiteOwnerships.id, id));
		} catch (e) {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
	update: async (event) => {
		await withRole(event, USER_ROLES.ADMIN);
		const form = await superValidate(event, projectSiteOwnershipsUpdateSchema);
		if (!form.valid) {
			console.error(form.errors);
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbpool.transaction(async (tx) => {
				const [pso, psot] = extractTranslations(form.data.siteOwnerships);
				await tx
					.insert(projectSiteOwnerships)
					.values(pso)
					.onConflictDoUpdate({
						target: projectSiteOwnerships.id,
						set: getAllExcluded(projectSiteOwnerships),
					});
				await tx
					.insert(projectSiteOwnershipsTranslations)
					.values(psot)
					.onConflictDoUpdate({
						target: [
							projectSiteOwnershipsTranslations.id,
							projectSiteOwnershipsTranslations.locale,
						],
						set: getAllExcluded(projectSiteOwnershipsTranslations),
					});
			});
			return { form };
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
};

import * as m from '$i18n/messages';
import { withContentManagementRole } from '$lib/auth/guard.server';
import {
	projectSiteOwnershipsSchema,
	projectSiteOwnershipsTranslationsSchema,
} from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { projectSiteOwnerships, projectSiteOwnershipsTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import { withTranslations } from '$lib/db/utils.server';
import { withTranslationsSchema } from '$lib/db/validation.server';
import {
	messageInvalidProjectDescriptor,
	messageServerError,
	messageServerSuccess,
} from '$lib/forms/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const updateSchema = withTranslationsSchema(
	projectSiteOwnershipsSchema,
	projectSiteOwnershipsTranslationsSchema
);

const deleteSchema = z.object({ del: z.string() });

export const load = async (event) => {
	await withContentManagementRole(event);
	const [ownership] = await withTranslations(
		projectSiteOwnerships,
		projectSiteOwnershipsTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	)
		.where(eq(projectSiteOwnerships.id, event.params.ownershipId))
		.limit(1);
	if (!ownership) {
		throw error(STATUS_CODES.NOT_FOUND);
	}
	const form = await superValidate(ownership, updateSchema);
	const del = await superValidate(deleteSchema);
	return { form, del };
};

export const actions = {
	update: async (event) => {
		await withContentManagementRole(event);
		const form = await superValidate(event, updateSchema);
		if (!form.valid) {
			return message(
				form,
				messageInvalidProjectDescriptor(m.project_ownership_type().toLowerCase())
			);
		}
		const { translations, ...pso } = form.data;
		try {
			await dbpool.transaction(async (tx) => {
				await tx
					.update(projectSiteOwnerships)
					.set(pso)
					.where(eq(projectSiteOwnerships.id, event.params.ownershipId));
				await tx
					.insert(projectSiteOwnershipsTranslations)
					.values(Object.values(translations))
					.onConflictDoUpdate({
						target: [projectSiteOwnershipsTranslations.id, projectSiteOwnershipsTranslations.lang],
						set: excluded(projectSiteOwnershipsTranslations),
					});
			});
		} catch (e) {
			return message(form, messageServerError());
		}
		return message(form, messageServerSuccess());
	},
	delete: async (event) => {
		await withContentManagementRole(event);
		const del = await superValidate(event, deleteSchema);
		if (!del.valid) {
			return message(del, messageInvalidProjectDescriptor('id'));
		}
		try {
			await dbpool.delete(projectSiteOwnerships).where(del);
		} catch (e) {}
	},
};

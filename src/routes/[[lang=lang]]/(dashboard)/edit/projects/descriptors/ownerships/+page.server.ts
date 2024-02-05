import * as m from '$i18n/messages';
import { authorize } from '$lib/auth/rbac.server';
import { db } from '$lib/db/db.server';
import { withTranslations } from '$lib/db/queries.server';
import { projectSiteOwnerships, projectSiteOwnershipsTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql.server';
import {
	newProjectSiteOwnershipSchema,
	projectSiteOwnershipsSchema,
	projectSiteOwnershipsWithTranslationsSchema,
} from '$lib/db/validation.server';
import {
	messageError,
	messageInvalid,
	messageNoRowsDeleted,
	messageSuccess,
} from '$lib/forms/messages';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const rootSchema = projectSiteOwnershipsSchema.pick({ id: true });

export const load = async (event) => {
	authorize(event, 'projects.descriptors.siteOwnerships.update');
	const siteOwnerships = await withTranslations(
		projectSiteOwnerships,
		projectSiteOwnershipsTranslations,
		{
			field: (t) => t.id,
			reference: (tt) => tt.id,
		}
	);
	const [newSiteOwnershipForm, siteOwnershipsForm, ...siteOwnershipForms] = await Promise.all([
		superValidate(zod(newProjectSiteOwnershipSchema)),
		superValidate(zod(rootSchema)),
		...siteOwnerships.map((defaults) =>
			superValidate(zod(projectSiteOwnershipsWithTranslationsSchema, { defaults }), {
				id: defaults.id,
			})
		),
	]);
	return { siteOwnershipsForm, siteOwnershipForms, newSiteOwnershipForm };
};

export const actions = {
	create: async (event) => {
		authorize(event, 'projects.descriptors.siteOwnerships.create');
		const form = await superValidate(event, zod(newProjectSiteOwnershipSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, ...pso } = form.data;
				const [{ id }] = await tx
					.insert(projectSiteOwnerships)
					.values(pso)
					.returning({ id: projectSiteOwnerships.id });
				await tx
					.insert(projectSiteOwnershipsTranslations)
					.values(Object.values(translations).map((d) => ({ ...d, id })));
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	update: async (event) => {
		authorize(event, 'projects.descriptors.siteOwnerships.update');
		const form = await superValidate(event, zod(projectSiteOwnershipsWithTranslationsSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_type());
		}
		try {
			await db.transaction(async (tx) => {
				const { translations, id, ...pso } = form.data;
				await Promise.all([
					tx.update(projectSiteOwnerships).set(pso).where(eq(projectSiteOwnerships.id, id)),
					tx
						.insert(projectSiteOwnershipsTranslations)
						.values(Object.values(translations).map((d) => ({ ...d, id })))
						.onConflictDoUpdate({
							target: [
								projectSiteOwnershipsTranslations.id,
								projectSiteOwnershipsTranslations.lang,
							],
							set: excluded(projectSiteOwnershipsTranslations),
						}),
				]);
			});
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
	delete: async (event) => {
		authorize(event, 'projects.descriptors.siteOwnerships.delete');
		const form = await superValidate(event, zod(rootSchema));
		if (!form.valid) {
			return messageInvalid(form, m.project_type());
		}
		try {
			const deleted = await db
				.delete(projectSiteOwnerships)
				.where(eq(projectSiteOwnerships.id, form.data.id))
				.returning();
			if (!deleted.length) {
				return messageNoRowsDeleted(form);
			}
		} catch (e) {
			return messageError(form);
		}
		return messageSuccess(form);
	},
};

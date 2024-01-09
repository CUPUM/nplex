import * as m from '$i18n/messages';
import { guardRoleContentManagement } from '$lib/auth/guard.server';
import {
	projectSiteOwnershipsSchema,
	projectSiteOwnershipsTranslationsSchema,
} from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { projectSiteOwnerships, projectSiteOwnershipsTranslations } from '$lib/db/schema/public';
import { withTranslationsSchema } from '$lib/db/validation.server';
import {
	messageInvalidProjectDescriptor,
	messageServerError,
	messageServerSuccess,
} from '$lib/forms/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { message, superValidate } from 'sveltekit-superforms/server';

const createSchema = withTranslationsSchema(
	projectSiteOwnershipsSchema.omit({ id: true }),
	projectSiteOwnershipsTranslationsSchema
);

export const load = async (event) => {
	await guardRoleContentManagement(event);
	const form = await superValidate(createSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		await guardRoleContentManagement(event);
		const form = await superValidate(event, createSchema);
		if (!form.valid) {
			console.log(JSON.stringify(form));
			return message(
				form,
				messageInvalidProjectDescriptor(m.project_ownership_type().toLowerCase())
			);
		}
		const { translations, ...pso } = form.data;
		try {
			await dbpool.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projectSiteOwnerships)
					.values(pso)
					.returning({ id: projectSiteOwnerships.id });
				await tx
					.insert(projectSiteOwnershipsTranslations)
					.values(Object.values(translations).map((psot) => ({ ...psot, id })));
			});
		} catch (e) {
			return message(form, messageServerError());
		}
		event.locals.redirect(
			STATUS_CODES.MOVED_TEMPORARILY,
			'/edit/projects/descriptors/ownerships',
			messageServerSuccess()
		);
	},
};

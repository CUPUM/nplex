import { projectTitleSchema } from '$routes/(authed)/editer/projet/schemas';
import { STATUS_CODES } from '$utils/enums';
import { composeFailureMessages } from '$utils/validation';
import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';

export const actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				title: projectTitleSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, {
				error: parsed.error.formErrors.fieldErrors,
				messages: { error: composeFailureMessages(parsed.error) },
			});
		}
		const newProject = await event.locals.db
			.from('projects')
			.insert(parsed.data)
			.select('id')
			.single();
		if (newProject.error) {
			return fail(STATUS_CODES.InternalServerError, {
				messages: { error: composeFailureMessages(newProject.error) },
			});
		}
		if (!newProject.data.id) {
			return fail(STATUS_CODES.InternalServerError, {
				messages: { error: ["Problème de récupération de l'identifiant du nouveau projet."] },
			});
		}
		throw redirect(STATUS_CODES.TemporaryRedirect, `/editer/projet/${newProject.data.id}`);
	},
};

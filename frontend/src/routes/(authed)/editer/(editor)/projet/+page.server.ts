import { STATUS_CODES } from '$utils/enums';
import { errorMessages } from '$utils/validation';
import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { titleSchema } from './[projectId]/common';

export const actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				title: titleSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, {
				error: parsed.error.formErrors.fieldErrors,
				messages: { error: errorMessages(parsed.error) },
			});
		}
		const newProject = await event.locals.db
			.from('projects')
			.insert(parsed.data)
			.select('id')
			.single();
		if (newProject.error) {
			return fail(STATUS_CODES.InternalServerError, {
				messages: { error: errorMessages(newProject.error) },
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

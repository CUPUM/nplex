import { projectCreateSchema } from '$routes/(authed)/editer/projet/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateFormData } from '$utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	create: async (event) => {
		const validated = await validateFormData(event, projectCreateSchema);
		if (validated.failure) {
			return validated.failure;
		}
		const newProject = await event.locals.db
			.from('projects')
			.insert(validated.data)
			.select('id')
			.single();
		if (newProject.error) {
			throw error(STATUS_CODES.InternalServerError, newProject.error);
		}
		if (!newProject.data.id) {
			return fail(STATUS_CODES.InternalServerError, {
				messages: {
					error: [
						"Problème de récupération de l'identifiant du nouveau projet. Essayez de rafraîchir la page.",
					],
				},
			});
		}
		throw redirect(STATUS_CODES.TemporaryRedirect, `/editer/projet/${newProject.data.id}`);
	},
};

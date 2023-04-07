import { actorCreateSchema } from '$routes/(authed)/editer/intervenant-e/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateFormData } from '$utils/validation';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	create: async (event) => {
		const validated = await validateFormData(event, actorCreateSchema);
		if (validated.failure) return validated.failure;
		const newActor = await event.locals.db
			.from('actors')
			.insert(validated.data)
			.select('id')
			.single();
		if (newActor.error) {
			return fail(STATUS_CODES.InternalServerError, {
				messages: { error: ['Une erreur est survenue lors de la création de la nouvelle fiche.'] },
			});
		}
		throw redirect(STATUS_CODES.MovedTemporarily, `/editer/intervenant-e/${newActor.data.id}`);
	},
};

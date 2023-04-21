import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import { projectPlaceUpdateSchema } from '$routes/(authed)/editer/projet/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateFormData } from '$utils/validation';
import { error } from '@sveltejs/kit';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const validated = await validateFormData(event, projectPlaceUpdateSchema);
		console.log(validated);
		if (validated.failure) return validated.failure;

		try {
			const projectUpdate = event.locals.db
				.from('projects')
				.update(validated.data)
				.eq('id', event.params.projectId)
				.then((res) => {
					if (res.error) throw res.error;
				});

			await Promise.all([projectUpdate]);
		} catch (err) {
			throw error(STATUS_CODES.InternalServerError, JSON.stringify(err));
		}
	},
};

import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import { interventionUpdateSchema } from '$routes/(authed)/editer/descripteurs/projets/interventions/schemas';
import { validateFormData } from '$utils/validation';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const validated = await validateFormData(event, interventionUpdateSchema);
		console.log(validated);
		if (validated.failure) return validated.failure;
		// const up = event.locals.db.from('project_intervention').upsert(validated.data.intervention);
	},
};

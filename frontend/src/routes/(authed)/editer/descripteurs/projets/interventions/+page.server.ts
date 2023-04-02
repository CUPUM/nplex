import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import {
	interventionCreateSchema,
	interventionTypeSchema,
	interventionUpdateSchema,
} from '$routes/(authed)/editer/descripteurs/projets/interventions/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateAction, validateFormData, validateSearchParams } from '$utils/validation';
import { error } from '@sveltejs/kit';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const validated = await validateFormData(event, interventionUpdateSchema);
		console.log(validated);
		if (validated.failure) return validated.failure;
		const upInterventions = await event.locals.db
			.from('project_intervention')
			.upsert(validated.data.intervention)
			.then((res) => {
				if (res.error) throw error(STATUS_CODES.InternalServerError, res.error);
			});
		return { success: true };
	},
	'set-type': async (event) => {
		const validated = validateSearchParams(event, interventionTypeSchema);
		if (validated.failure) return validated.failure;
		const ins = await event.locals.db.from('project_intervention_by_type').insert(validated.data);
		if (ins.error) throw error(STATUS_CODES.InternalServerError, ins.error);
	},
	'unset-type': async (event) => {
		const validated = validateSearchParams(event, interventionTypeSchema);
		if (validated.failure) return validated.failure;
		const del = await event.locals.db
			.from('project_intervention_by_type')
			.delete()
			.match(validated.data);
		if (del.error) throw error(STATUS_CODES.InternalServerError, del.error);
		return { success: true };
	},
	'delete': async (event) => {},
	'create': async (event) => {
		const validated = validateAction(await event.request.formData(), interventionCreateSchema);
		if (validated.failure) return validated.failure;
		const { types, ...intervention } = validated.data;
		const insIntervention = await event.locals.db
			.from('project_intervention')
			.insert(intervention)
			.select('id')
			.single();
		if (insIntervention.error) throw error(STATUS_CODES.InternalServerError, insIntervention.error);
		const insTypes = await event.locals.db
			.from('project_intervention_by_type')
			.insert(types.map((t) => ({ type: t, intervention: insIntervention.data.id })));
		if (insTypes.error) throw error(STATUS_CODES.InternalServerError, insTypes.error);
		return { success: true };
	},
};

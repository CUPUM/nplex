import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import {
	interventionTypeSchema,
	interventionUpdateSchema,
} from '$routes/(authed)/editer/descripteurs/projets/interventions/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateFormData, validateSearchParams } from '$utils/validation';
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

		// const upTypes = event.locals.db
		// 	.from('project_intervention_by_type')
		// 	.upsert(validated.data.project_types, {
		// 		onConflict: 'intervention, type',
		// 		ignoreDuplicates: true,
		// 	})
		// 	.then((res) => {
		// 		if (res.error) throw error(STATUS_CODES.InternalServerError, res.error);
		// 	});

		// const delTypes = event.locals.db.from('project_intervention_by_type').delete().not('');

		// await Promise.all([upInterventions, upTypes, delTypes]);
		return { updated: true };
	},
	'set-type': async (event) => {
		const validated = validateSearchParams(event, interventionTypeSchema);
		if (validated.failure) return validated.failure;
		const ins = await event.locals.db.from('project_intervention_by_type').insert(validated.data);
		if (ins.error) {
			throw error(STATUS_CODES.InternalServerError, ins.error);
		}
	},
	'unset-type': async (event) => {
		const validated = validateSearchParams(event, interventionTypeSchema);
		if (validated.failure) return validated.failure;
		const del = await event.locals.db
			.from('project_intervention_by_type')
			.delete()
			.match(validated.data);
		if (del.error) {
			throw error(STATUS_CODES.InternalServerError, del.error);
		}
	},
	'delete': async (event) => {},
	'create': async (event) => {},
};

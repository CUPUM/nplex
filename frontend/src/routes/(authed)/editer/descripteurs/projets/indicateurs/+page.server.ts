import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import {
	desciptorIndicatorsUpdateSchema,
	descriptorIndicatorCreateSchema,
} from '$routes/(authed)/editer/descripteurs/projets/indicateurs/schemas';
import { STATUS_CODES } from '$utils/enums';
import { validateFormData } from '$utils/validation';
import { error, fail } from '@sveltejs/kit';
import { INDICATORS_KEY, INDICATORS_KEY_NEW } from './common';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const validated = await validateFormData(event, desciptorIndicatorsUpdateSchema);
		if (validated.failure) return validated.failure;
		const up = await event.locals.db
			.from('project_exemplarity_indicator')
			.upsert(validated.data[INDICATORS_KEY])
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, res.error);
				}
				return { updated: true };
			});
		return { updated: true };
	},
	create: async (event) => {
		const validated = await validateFormData(event, descriptorIndicatorCreateSchema);
		if (validated.failure) return validated.failure;
		const ins = await event.locals.db
			.from('project_exemplarity_indicator')
			.insert(validated.data[INDICATORS_KEY_NEW])
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, res.error);
				}
			});
		return { created: true };
	},
	delete: async (event) => {
		const indicatorId = event.url.searchParams.get('id');
		if (!indicatorId) {
			fail(STATUS_CODES.BadRequest, {
				messages: {
					error: ["Aucun identificateur d'indicateur trouvé dans la requête pour supprimer."],
				},
			});
		}
		const del = await event.locals.db
			.from('project_exemplarity_indicator')
			.delete()
			.eq('id', indicatorId);
		if (del.error) {
			throw error(STATUS_CODES.InternalServerError, del.error);
		}
		return { deleted: true };
	},
};

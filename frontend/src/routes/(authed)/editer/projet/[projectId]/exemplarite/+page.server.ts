import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import { projectIndicatorsSchema } from '$routes/(authed)/editer/projet/schemas';
import { STATUS_CODES } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { validateFormData } from '$utils/validation';
import { error } from '@sveltejs/kit';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const validated = await validateFormData(event, projectIndicatorsSchema);
		if (validated.failure) return validated.failure;

		const del = event.locals.db
			.from('projects_exemplarity_indicators')
			.delete()
			.eq('project', event.params.projectId)
			.not('indicator', 'in', toPgArr(validated.data.indicator))
			.then((res) => {
				if (res.error) throw res.error;
			});

		const up = event.locals.db
			.from('projects_exemplarity_indicators')
			.upsert(
				validated.data.indicator.map((ind) => ({
					indicator: ind,
					project: event.params.projectId,
				})),
				{ onConflict: 'project, indicator', ignoreDuplicates: true }
			)
			.then((res) => {
				if (res.error) throw res.error;
			});

		await Promise.all([del, up]).catch((rej) => {
			throw error(STATUS_CODES.InternalServerError, JSON.stringify(rej));
		});
	},
};

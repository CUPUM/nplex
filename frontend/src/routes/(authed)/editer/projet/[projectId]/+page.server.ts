import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import { STATUS_CODES } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { validateFormData } from '$utils/validation';
import { error } from '@sveltejs/kit';
import { projectGeneralUpdateSchema } from '../schemas';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const validated = await validateFormData(event, projectGeneralUpdateSchema);
		if (validated.failure) return validated.failure;
		try {
			const generalUpdate = await event.locals.db
				.from('projects')
				.update(validated.data.project)
				.eq('id', event.params.projectId)
				.then((res) => {
					if (res.error) {
						throw res.error;
					}
				});

			const interventionsDelete = event.locals.db
				.from('projects_interventions')
				.delete()
				.eq('project', event.params.projectId)
				.not('intervention', 'in', toPgArr(validated.data.intervention))
				.then((res) => {
					if (res.error) throw res.error;
				});

			const interventionsUp = event.locals.db
				.from('projects_interventions')
				.upsert(
					validated.data.intervention.map((iid) => ({
						project: event.params.projectId,
						intervention: iid,
					})),
					{ onConflict: 'project, intervention', ignoreDuplicates: true }
				)
				.then((res) => {
					if (res.error) throw res.error;
				});

			await Promise.all([generalUpdate, interventionsDelete, interventionsUp]);
		} catch (err) {
			throw error(STATUS_CODES.InternalServerError, JSON.stringify(err));
		}
	},
};

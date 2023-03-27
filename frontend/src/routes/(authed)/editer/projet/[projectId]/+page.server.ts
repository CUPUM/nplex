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
			// projects table
			const generalUpdate = event.locals.db
				.from('projects')
				.update(validated.data.project)
				.eq('id', event.params.projectId)
				.then((res) => {
					if (res.error) {
						throw res.error;
					}
				});
			// project_works table
			const interventionsDelete = event.locals.db
				.from('projects_interventions')
				.delete()
				.eq('project', event.params.projectId)
				.not('intervention', 'in', toPgArr(validated.data.intervention))
				.then((del) => {
					if (del.error) {
						throw del.error;
					}
					return event.locals.db
						.from('projects_interventions')
						.upsert(
							validated.data.intervention.map((iid) => ({
								project: event.params.projectId,
								intervention: iid,
							}))
						)
						.then((up) => {
							if (up.error) {
								console.error(up.error);
								throw up.error;
							}
						});
				});
		} catch (err) {
			throw error(STATUS_CODES.InternalServerError, JSON.stringify(err));
		}
	},
};

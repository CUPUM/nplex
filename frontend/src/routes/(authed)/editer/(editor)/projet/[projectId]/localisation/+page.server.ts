import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error, fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { EDITOR_FORM_ACTION } from '../../../common';
import { locationSchema } from './common';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const formData = await event.request.formData();
		// console.log(formData);
		const parsed = zfd
			.formData({
				location: locationSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			console.error(parsed.error);
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);

		// Project location update.
		const locationUpdate = db
			.from('projects_location')
			.update(parsed.data.location)
			.eq('project_id', event.params.projectId)
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, res.error);
				}
			});
	},
};

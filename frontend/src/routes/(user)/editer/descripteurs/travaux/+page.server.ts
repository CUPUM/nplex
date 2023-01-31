import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async (event) => {
		console.log(event);
	},
	delete: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				id: zfd.numeric(z.number().positive()),
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		console.log(parsed);
		const db = await getDb(event);
		const del = db
			.from('project_work')
			.delete({ count: 'exact' })
			.eq('id', parsed.data.id)
			.then((res) => {
				console.log(res);
				if (res.error) {
					console.log(res.error);
					throw error(STATUS_CODES.InternalServerError, { ...res.error });
				}
			});
	},
};

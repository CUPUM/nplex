import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				site_ownership_id: zfd.numeric(z.number().optional()),
				site_usage_category_id: zfd.numeric(z.number().optional()),
				site_usage_id: zfd.numeric(z.number().optional()),
				// secondary_usages: zfd.repeatableOfType(zfd.numeric(z.number().optional())),
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { formErrors: parsed.error.formErrors.fieldErrors });
		}
		const db = await getDb(event);
		const update = await db
			.from('projects')
			.update({
				id: event.params.projectId,
				...parsed.data,
			})
			.eq('id', event.params.projectId)
			.single();
		if (update.error) {
			console.log(update.error);
			return fail(STATUS_CODES.InternalServerError, { error: update.error.message });
		}
		return { success: true };
	},
};

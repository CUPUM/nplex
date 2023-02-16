import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error, fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { orgNameSchema } from './common';

export const actions: Actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				name: orgNameSchema,
			})
			.safeParse(formData);
		console.log(parsed);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const newOrg = await db.from('organizations').insert(parsed.data).select('id').single();
		if (newOrg.error) {
			throw error(STATUS_CODES.InternalServerError);
		}
		throw redirect(STATUS_CODES.TemporaryRedirect, `/editer/organisation/${newOrg.data.id}`);
	},
};

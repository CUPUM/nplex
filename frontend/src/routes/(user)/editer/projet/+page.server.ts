import { errmsg, getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { titleSchema } from './common';

export const actions: Actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				title: titleSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const insert = await db.from('projects').insert(parsed.data).select('id').single();
		if (insert.error) {
			return fail(STATUS_CODES.InternalServerError, {
				error: errmsg(insert.error),
			});
		}
		if (!insert.data.id) {
			return fail(STATUS_CODES.InternalServerError, {
				error: "Problème de récupération de l'identifiant du projet",
			});
		}
		throw redirect(STATUS_CODES.MovedTemporarily, `/editer/projet/${insert.data?.id}`);
	},
};

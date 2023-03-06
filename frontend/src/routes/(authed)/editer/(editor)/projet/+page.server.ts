import { errmsg, getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { titleSchema } from './[projectId]/common';

export const actions: Actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				title: titleSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, {
				error: parsed.error.formErrors.fieldErrors,
			});
		}
		const db = await getDb(event);
		const newProject = await db.from('projects').insert(parsed.data).select('id').single();
		if (newProject.error) {
			return fail(STATUS_CODES.InternalServerError, {
				error: { internal: errmsg(newProject.error) },
			});
		}
		if (!newProject.data.id) {
			return fail(STATUS_CODES.InternalServerError, {
				error: { internal: "Problème de récupération de l'identifiant du projet" },
			});
		}
		throw redirect(STATUS_CODES.TemporaryRedirect, `/editer/projet/${newProject.data.id}`);
	},
};

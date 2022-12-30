import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const titleSchema = zfd.text(
	z
		.string()
		.trim()
		.min(1)
		.refine((s) => s.split(' ').length >= 2, {
			message: 'Le titre du projet doit être composé d’au minimum 2 mots',
		})
);

export const actions: Actions = {
	create: async (event) => {
		const d = await event.request.formData();
		const v = zfd
			.formData({
				title: titleSchema,
			})
			.safeParse(d);
		if (!v.success) {
			return fail(STATUS_CODES.BadRequest, v.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const createRes = await db.from('projects').insert(v.data).select('id').single();
		if (createRes.error) {
			throw error(500, createRes.error);
		}
		throw redirect(302, `/editer/projet/${createRes.data?.id}`);
	},
};

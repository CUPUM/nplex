import { getDb } from '$utils/database/client';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async (event) => {},
	/**
	 * Delete a project by its id.
	 */
	delete: async (event) => {
		if (!event.locals.session) return fail(401);
		const formData = Object.fromEntries(await event.request.formData());
		if (!formData.id) return fail(401);
		const db = await getDb(event);
		const deleteRes = await db.from('projects').delete().eq('id', formData.id).single();
		if (deleteRes.error) throw error(500, deleteRes.error);
		throw redirect(301, '/editer');
	},
};

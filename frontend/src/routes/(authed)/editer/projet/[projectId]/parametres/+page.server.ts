import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	update: async (event) => {},
	publish: async (event) => {
		const pub = await event.locals.db
			.from('projects_publication_status')
			.update({ published: new Date().toISOString() })
			.eq('project', event.params.projectId);
		if (pub.error) {
			throw error(STATUS_CODES.InternalServerError, pub.error);
		}
	},
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
	/**
	 * Search across all visible users using a string.
	 */
	searchUser: async (event) => {
		// console.log(event);
	},
};

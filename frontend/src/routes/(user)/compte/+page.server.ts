import { getDb } from '$utils/database';
import { dbAdmin } from '$utils/databaseAdmin';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	/**
	 * Update user profile info.
	 */
	update: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		const d = Object.fromEntries(await event.request.formData());
		const db = await getDb(event);
		const update = await db
			.from('users')
			.update(d)
			.eq('id', event.locals.session.user.id)
			.single();
		if (update.error) {
			return fail(400, { ...update.error });
		}
	},

	/**
	 * Delete current user.
	 */
	delete: async ({ request, locals }) => {
		if (!locals.session) {
			return fail(401);
		}
		const d = await request.formData();
		const id = d.get('id');
		if (!id || id !== locals.session.user.id) {
			return fail(400);
		}
		const res = await dbAdmin.auth.admin.deleteUser(id);
		if (res.error) {
			throw error(500);
		}
		throw redirect(302, '/');
	},
};

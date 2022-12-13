import { getDb } from '$utils/database';
import { dbAdmin } from '$utils/databaseAdmin';
import { StatusCode } from '$utils/enums';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	/**
	 * Update user profile info.
	 */
	update: async (event) => {
		if (!event.locals.session) {
			return fail(StatusCode.Unauthorized);
		}
		const formData = Object.fromEntries(await event.request.formData());
		const db = await getDb(event);
		const update = await db
			.from('users')
			.update(formData)
			.eq('id', event.locals.session.user.id)
			.single();
		if (update.error) {
			return fail(StatusCode.BadRequest, { ...update.error });
		}
	},

	/**
	 * Delete current user.
	 */
	delete: async ({ request, locals }) => {
		if (!locals.session) {
			return fail(StatusCode.Unauthorized);
		}
		const formData = await request.formData();
		const id = formData.get('id');
		if (!id || id !== locals.session.user.id) {
			return fail(StatusCode.BadRequest);
		}
		const deleteRes = await dbAdmin.auth.admin.deleteUser(id);
		if (deleteRes.error) {
			throw error(StatusCode.InternalServerError);
		}
		throw redirect(StatusCode.MovedPermanently, '/');
	},
};

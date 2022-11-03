import { adminDbClient } from '$utils/database/admin';
import { dbClient } from '$utils/database/database';
import { error, invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	/**
	 * Update user profile info.
	 */
	update: async ({ request, locals }) => {
		if (!locals.session) {
			return invalid(401);
		}
		const formData = Object.fromEntries(await request.formData());
		// Do some zod validation here...
		const db = dbClient.createForServer(locals.session.access_token);
		const update = await db
			.from('users')
			.update({ ...formData, id: undefined })
			.eq('id', locals.session.user.id)
			.single();
		if (update.error) {
			throw error(500, { ...update.error, notify: true });
		}
		return formData;
	},

	/**
	 * Delete current user.
	 */
	delete: async ({ request, locals }) => {
		if (!locals.session) {
			return invalid(401);
		}
		const formData = Object.fromEntries(await request.formData());
		if (formData.id !== locals.session.user.id) {
			return invalid(401, {
				error: {
					message: 'Votre identificateur ne correspond pas au compte que vous tentez de supprimer',
				},
				...formData,
			});
		}
		const res = await adminDbClient.auth.admin.deleteUser(formData.id);
		if (res.error) throw error(500);
		throw redirect(302, '/');
	},
};

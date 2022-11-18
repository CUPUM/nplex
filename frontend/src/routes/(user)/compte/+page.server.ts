import { getDb } from '$utils/database';
import { dbAdmin } from '$utils/databaseAdmin';
import { error, invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	/**
	 * Update user profile info.
	 */
	update: async (event) => {
		if (!event.locals.session) {
			return invalid(401);
		}
		const formData = Object.fromEntries(await event.request.formData());
		// Do some zod validation here...
		const db = await getDb(event);
		const update = await db
			.from('users')
			.update({ ...formData, id: undefined })
			.eq('id', event.locals.session.user.id)
			.single();
		if (update.error) {
			throw error(500, { ...update.error });
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
		if (formData.id !== locals.session.id) {
			return invalid(401, {
				error: {
					message:
						'Votre identificateur ne correspond pas au compte que vous tentez de supprimer',
				},
				...formData,
			});
		}
		const res = await dbAdmin.auth.admin.deleteUser(formData.id);
		if (res.error) throw error(500);
		throw redirect(302, '/');
	},
};

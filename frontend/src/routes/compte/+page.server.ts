import { adminDbClient } from '$utils/database/admin';
import { dbClient } from '$utils/database/database';
import { error, invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

type ProfileFormData = {
	id: string;
	first_name: string;
	last_name: string;
};

export const actions: Actions = {
	/**
	 * Update user profile info.
	 */
	update: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as ProfileFormData;

		if (formData.first_name === 'test') {
			return invalid(400, {
				error: {
					message: 'Erreur du nom!',
				},
				...formData,
			});
		}

		const db = dbClient.createForServer(locals.session.access_token);
		const update = await db.from('users').update(formData).eq('id', locals.session.user.id).single();

		if (update.error) {
			throw error(500, { ...update.error, notify: true });
		}
		return formData;
	},
	/**
	 * Delete current user.
	 */
	delete: async ({ request, cookies, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as ProfileFormData;
		if (formData.id !== locals.session.user.id) {
			return invalid(500, {
				error: {
					message: 'Votre identificateur ne correspond pas au compte que vous tentez de supprimer',
				},
				...formData,
			});
		}
		console.log(formData.id);
		const res = await adminDbClient.auth.admin.deleteUser(formData.id);
		console.log(res);
		if (res.error) throw error(500);
		return;
	},
};

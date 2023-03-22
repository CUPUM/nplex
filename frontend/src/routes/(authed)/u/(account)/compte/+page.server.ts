import { dbAdmin } from '$utils/database/admin';
import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { profileSchema, validateFormData } from '$utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	/**
	 * Update user profile info.
	 */
	update: async (event) => {
		const validated = await validateFormData(event, profileSchema);
		if (validated.failure) return validated.failure;
		const db = await getDb(event);
		const update = await db
			.from('users')
			.update(validated.data)
			.eq('id', event.locals.session!.user.id)
			.single();
		if (update.error) {
			throw error(STATUS_CODES.InternalServerError, update.error);
		}
	},
	role: async (event) => {
		// const validated = await validateFormData(event, roleRequestSchema);
		// if (!validated.success) return validated.failure;
		// const roleUpdate = dbAdmin
		// 	.from('users_roles')
		// 	.update({ request: validated.data.role, requested_at: new Date().toISOString() })
		// 	.eq('user_id', event.locals.session?.user.id)
		// 	.single();
		// const notif = dbAdmin.from('notifications').insert({
		// 	title: 'Demande de changement de rôle',
		// 	body: "Lorem ipsum je me suis fait mal à l'orteil.",
		// 	created_by_id: event.locals.session?.user.id,
		// });
	},
	/**
	 * Delete current user.
	 */
	delete: async ({ request, locals }) => {
		if (!locals.session) {
			return fail(STATUS_CODES.Unauthorized);
		}
		const formData = await request.formData();
		const id = formData.get('id');
		if (!id || id !== locals.session.user.id) {
			return fail(STATUS_CODES.BadRequest);
		}
		const deleteRes = await dbAdmin.auth.admin.deleteUser(id);
		if (deleteRes.error) {
			throw error(STATUS_CODES.InternalServerError);
		}
		throw redirect(STATUS_CODES.MovedPermanently, '/');
	},
};

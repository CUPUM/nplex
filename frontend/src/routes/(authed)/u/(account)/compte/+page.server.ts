import { dbAdmin } from '$utils/database/admin';
import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { roleSchema } from '$utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const profileSchema = zfd.formData(
	z
		.object({
			first_name: zfd.text(z.string().min(1)),
			last_name: zfd.text(z.string().nullable().default(null)),
			public_email: zfd.text(z.string().email().nullable().default(null)),
			about: zfd.text(z.string().nullable().default(null)),
		})
		.passthrough()
);

const roleRequestSchema = zfd.formData({
	role: roleSchema,
});

export const actions = {
	/**
	 * Update user profile info.
	 */
	update: async (event) => {
		if (!event.locals.session) {
			return fail(STATUS_CODES.Unauthorized);
		}
		const formData = await event.request.formData();
		const parsed = profileSchema.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { error: parsed.error.formErrors.fieldErrors });
		}
		const db = await getDb(event);
		const update = await db
			.from('users')
			.update(parsed.data)
			.eq('id', event.locals.session.user.id)
			.single();
		if (update.error) {
			return fail(STATUS_CODES.BadRequest, { ...update.error });
		}
	},
	role: async (event) => {
		const formData = await event.request.formData();
		const parsed = roleRequestSchema.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { error: parsed.error.formErrors.fieldErrors });
		}
		const roleUp = dbAdmin
			.from('users_roles')
			.update({ request: parsed.data.role, requested_at: new Date().toISOString() })
			.eq('user_id', event.locals.session?.user.id)
			.single();
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

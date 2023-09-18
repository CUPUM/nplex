import { withAuth } from '$lib/auth/guard.server';
import { authorizeUserUpdate } from '$lib/db/authorizations';
import { dbhttp } from '$lib/db/db.server';
import { users, usersInsertSchema } from '$lib/db/schema/accounts';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/client';

const updateProfileSchema = usersInsertSchema.pick({
	firstName: true,
	middleName: true,
	lastName: true,
	publicEmail: true,
});

export const load = async (event) => {
	const session = await withAuth(event);
	const [profile] = await dbhttp.select().from(users).where(eq(users.id, session.user.id)).limit(1);
	const form = await superValidate(profile, updateProfileSchema);
	return { profile, form };
};

export const actions = {
	update: async (event) => {
		const session = await withAuth(event);
		const form = await superValidate(event, updateProfileSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			await dbhttp.update(users).set(form.data).where(authorizeUserUpdate(session));
		} catch (err) {
			console.error(err);
			throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
		}
	},
};

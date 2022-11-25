import { getDb } from '$utils/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { session } = await event.parent();
	if (!session) {
		throw error(400);
	}
	const db = await getDb(event);
	const profileRes = await db
		.from('users')
		// .select('*')
		.select(
			`
				*,
				role:users_roles!users_roles_user_id_fkey(
					*
				)
			`
		)
		.eq('id', session.user.id)
		.single();
	if (profileRes.error || !profileRes.data) {
		throw error(500, profileRes.error);
	}

	return {
		profile: profileRes.data,
	};
};

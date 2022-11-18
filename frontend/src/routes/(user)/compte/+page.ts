import { getDb } from '$utils/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { session } = await event.parent();
	if (!session) return {};
	const db = await getDb(event);
	// Get extended user profile with collections and their contents.
	const profileRes = await db
		.from('users')
		// .select('*')
		.select(
			`
				*,
				role:users_roles!users_roles_user_id_fkey(
					role
				)
			`
		)
		.eq('id', session.user.id)
		.single();
	if (profileRes.error || !profileRes.data) {
		throw error(500, profileRes.error);
	}

	console.log(profileRes.data);

	return {
		profile: profileRes.data,
	};
};

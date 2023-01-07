import { getDb } from '$utils/database';
import { LOAD_DEPENDENCIES, STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from '../$types';

export const load = (async (event) => {
	event.depends(LOAD_DEPENDENCIES.USER_PROFILE);
	const { session } = await event.parent();
	if (!session) {
		throw error(STATUS_CODES.Unauthorized);
	}
	const db = await getDb(event);
	// User's profile data.
	const profileRes = await db
		.from('users')
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
	if (profileRes.error) {
		throw error(STATUS_CODES.InternalServerError, profileRes.error);
	}
	// Getting list of roles for form.
	const rolesRes = await db.from('user_role_details').select('*');
	if (rolesRes.error) {
		throw error(STATUS_CODES.InternalServerError, rolesRes.error);
	}

	return {
		profile: profileRes.data,
		roles: rolesRes.data,
	};
}) satisfies LayoutLoad;

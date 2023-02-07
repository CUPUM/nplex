import { maybeSingle } from '$types/utils';
import { getDb } from '$utils/database/client';
import { LOAD_DEPENDENCIES, STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	event.depends(LOAD_DEPENDENCIES.USER_PROFILE);

	const { session } = await event.parent();
	if (!session) {
		throw error(STATUS_CODES.Unauthorized);
	}

	const db = await getDb(event);

	const profile = db
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
		.limit(1)
		.single()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			console.log(res.data);
			return maybeSingle({
				...res.data,
				role: maybeSingle(res.data.role)!,
			})!;
		});

	const roles = await db
		.from('role_details')
		.select('*')
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			console.log(res);
			return res.data;
		});

	return {
		profile,
		roles,
	};
}) satisfies LayoutLoad;

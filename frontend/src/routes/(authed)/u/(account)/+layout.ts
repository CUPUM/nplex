import { fixTypes } from '$types/database/utils';
import { getDb } from '$utils/database/client';
import { LOAD_DEPENDENCIES, STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
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
				occupation:user_occupation(*)
			`
		)
		.eq('id', session.user.id)
		.limit(1)
		.single()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return fixTypes(res.data).toMaybeSingle<{ occupation: true }>().data;
		});

	const roles = await db
		.from('role_details')
		.select('*')
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	return {
		profile,
		roles,
	};
};

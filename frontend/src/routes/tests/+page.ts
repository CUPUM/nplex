import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const db = await getDb();
	const rolesRes = await db.from('user_role_details').select('*');
	if (rolesRes.error) {
		throw error(STATUS_CODES.InternalServerError, rolesRes.error);
	}
	return {
		roles: rolesRes.data,
	};
}) satisfies PageLoad;

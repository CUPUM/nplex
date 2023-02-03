import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const db = await getDb();
	const rolesRes = await db.from('app_role_details').select('*');
	// const d = await event.fetch(`/api/geo/${CITIES.Montreal.param}/find-districts.json`);
	// console.log(await d.json());
	if (rolesRes.error) {
		throw error(STATUS_CODES.InternalServerError, rolesRes.error);
	}
	return {
		roles: rolesRes.data,
	};
}) satisfies PageLoad;

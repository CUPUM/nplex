import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const db = await getDb(event);
	const descriptors = db
		.rpc('get_project_descriptors')
		.single()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, { ...res.error });
			}
			return res.data;
		});
	return {
		descriptors,
	};
}) satisfies LayoutLoad;

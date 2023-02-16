import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const db = await getDb(event);

	const org = await db.from('organizations').select('*').eq('id', event.params.orgId).single();

	if (org.error) {
		throw error(STATUS_CODES.InternalServerError, org.error);
	}

	return {
		organization: org.data,
	};
}) satisfies LayoutLoad;

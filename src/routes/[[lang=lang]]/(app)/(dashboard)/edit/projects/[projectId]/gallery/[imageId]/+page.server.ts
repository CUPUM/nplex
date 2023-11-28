import { withAuth } from '$lib/auth/guard.server';
import { getProjectImageTemporalitiesList, getProjectImageTypesList } from '$lib/db/queries.server';

export const load = async (event) => {
	await withAuth(event);
	const imageTypes = getProjectImageTypesList(event);
	const imageTemporalities = getProjectImageTemporalitiesList(event);
	return {
		streamed: {
			imageTypes,
			imageTemporalities,
		},
	};
};

export const actions = {};

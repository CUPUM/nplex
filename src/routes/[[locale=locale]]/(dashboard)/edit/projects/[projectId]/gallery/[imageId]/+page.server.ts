import { withAuth } from '$lib/auth/guard.server';
import { selectProjectImageTemporalities, selectProjectImageTypes } from '$lib/db/queries.server';

export const load = async (event) => {
	await withAuth(event);
	const imageTypes = selectProjectImageTypes(event);
	const imageTemporalities = selectProjectImageTemporalities(event);
	return {
		streamed: {
			imageTypes,
			imageTemporalities,
		},
	};
};

export const actions = {};

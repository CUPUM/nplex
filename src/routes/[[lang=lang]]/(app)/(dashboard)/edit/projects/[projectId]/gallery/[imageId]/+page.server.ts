import { guardAuth } from '$lib/auth/guard.server';
import { getProjectImageTemporalitiesList, getProjectImageTypesList } from '$lib/db/queries.server';

export const load = async (event) => {
	await guardAuth(event);
	const imageTypes = getProjectImageTypesList(event);
	const imageTemporalities = getProjectImageTemporalitiesList(event);
	return {
		imageTypes,
		imageTemporalities,
	};
};

export const actions = {};

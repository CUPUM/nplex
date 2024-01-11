import { authorizeSession } from '$lib/auth/authorization.server';
import { getProjectImageTemporalitiesList, getProjectImageTypesList } from '$lib/db/queries.server';

export const load = async (event) => {
	await authorizeSession(event);
	const imageTypes = getProjectImageTypesList(event);
	const imageTemporalities = getProjectImageTemporalitiesList(event);
	return {
		imageTypes,
		imageTemporalities,
	};
};

export const actions = {};

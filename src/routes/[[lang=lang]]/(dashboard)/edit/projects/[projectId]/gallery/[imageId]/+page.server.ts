import { getProjectImageTemporalitiesList, getProjectImageTypesList } from '$lib/db/queries.server';

export const load = async (event) => {
	await event.locals.authorize();
	const imageTypes = getProjectImageTypesList(event);
	const imageTemporalities = getProjectImageTemporalitiesList(event);
	return {
		imageTypes,
		imageTemporalities,
	};
};

export const actions = {};

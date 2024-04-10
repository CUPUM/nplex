import { authorize } from '$lib/auth/rbac.server';
import { getProjectImageTemporalitiesList, getProjectImageTypesList } from '$lib/db/queries.server';

export const load = async (event) => {
	authorize(event);
	const imageTypes = getProjectImageTypesList(event);
	const imageTemporalities = getProjectImageTemporalitiesList(event);
	return {
		imageTypes,
		imageTemporalities,
	};
};

export const actions = {
	default: async (event) => {},
};

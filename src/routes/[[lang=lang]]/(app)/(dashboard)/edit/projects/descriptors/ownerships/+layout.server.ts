import { guardRoleContentManagement } from '$lib/auth/guard.server';
import { getProjectSiteOwnershipsList } from '$lib/db/queries.server';

export const load = async (event) => {
	await guardRoleContentManagement(event);
	const siteOwnerships = getProjectSiteOwnershipsList(event);
	return { siteOwnerships };
};

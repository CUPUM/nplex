import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { getProjectSiteOwnershipsList } from '$lib/db/queries.server';

export const load = async (event) => {
	await withRole(event, USER_ROLES.EDITOR, USER_ROLES.ADMIN);
	const siteOwnerships = getProjectSiteOwnershipsList(event);
	return { siteOwnerships };
};

import { authorizeRole } from '$lib/auth/authorization.server';
import { USER_ROLES } from '$lib/auth/constants';

export const load = async (event) => {
	await authorizeRole(event, USER_ROLES.ADMIN);
};

import { USER_ROLES } from '$lib/auth/constants';
import { guardRole } from '$lib/auth/guard.server';

export const load = async (event) => {
	await guardRole(event, USER_ROLES.ADMIN);
};

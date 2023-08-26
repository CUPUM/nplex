import { z } from 'zod';
import { USERS_ROLES_ARR, type UserRole } from './constants';

/**
 * Validate a given input user role.
 */
export function isUserRole(maybeUserRole: unknown): maybeUserRole is UserRole {
	return USERS_ROLES_ARR.indexOf(maybeUserRole as UserRole) > -1;
}

const joinedRoles = USERS_ROLES_ARR.join(', ');

export const userRoleSchema = z.custom<UserRole>(
	(data) => {
		return isUserRole(data);
	},
	(d) => {
		try {
			const str = typeof d === 'string' ? d : JSON.stringify(d);
			return {
				message: `Given role "${str}" is not valid. Roles must be one of ${joinedRoles}.`,
			};
		} catch (error) {
			console.error(error);
			return {
				message:
					'A parsing error occured during the userRoleSchema error message preparation. Either-way, the given role is not valid. See console for logs',
			};
		}
	}
);

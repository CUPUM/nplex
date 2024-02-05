import { z } from 'zod';
import {
	OAUTH_PROVIDERS_ARR,
	USER_ROLES_ARR,
	type OAuthProvider,
	type UserRole,
} from './constants';

/**
 * Validate a given input user role.
 */
export function isUserRole(maybeUserRole: unknown): maybeUserRole is UserRole {
	return USER_ROLES_ARR.indexOf(maybeUserRole as UserRole) > -1;
}

const joinedRoles = USER_ROLES_ARR.join(', ');

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
					'A parsing error occured within the userRoleSchema error message preparation. Either-way, the given role is not valid. See console for logs.',
			};
		}
	}
);

export function isOAuthProvider(maybeOAuthProvider: unknown): maybeOAuthProvider is OAuthProvider {
	return OAUTH_PROVIDERS_ARR.indexOf(maybeOAuthProvider as OAuthProvider) > -1;
}

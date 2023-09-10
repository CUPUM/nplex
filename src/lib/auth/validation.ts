import type { User } from 'lucia';
import { z } from 'zod';
import { AUTH_PROVIDERS_ARR, USER_ROLES_ARR, type AuthProvider, type UserRole } from './constants';

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

const joinedProviders = AUTH_PROVIDERS_ARR.join(', ');

/**
 * Confirm that a given value is a member of the app's expected providers enum.
 */
export function isAuthProvider(maybeAuthProvider: unknown): maybeAuthProvider is AuthProvider {
	return AUTH_PROVIDERS_ARR.indexOf(maybeAuthProvider as AuthProvider) > -1;
}

export const authProviderSchema = z.custom<AuthProvider>(
	(data) => {
		return isAuthProvider(data);
	},
	(d) => {
		try {
			const str = typeof d === 'string' ? d : JSON.stringify(d);
			return {
				message: `Given auth provider key "${str}" is not valid. Auth providers must be one of ${joinedProviders}.`,
			};
		} catch (error) {
			console.error(error);
			return {
				message:
					'A parsing error occured within the authProviderSchema error message preparation. Either-way, the given auth provider is not valid. See console for logs.',
			};
		}
	}
);

export function isEmailUser<U extends Pick<User, 'id' | 'email'>>(
	user: U
): user is U & { email: NonNullable<User['email']> } {
	return user.email != null;
}

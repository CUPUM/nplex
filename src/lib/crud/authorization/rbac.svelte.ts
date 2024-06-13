import type { Role } from '$lib/auth/constants';
import type { User } from 'lucia';
import { PERMISSIONS, type PermissionRule } from './constants';

/**
 * Verify that a client is authenticated and, optionally, that they have required role.
 */
export function authorize(user: Pick<User, 'role'> | null, rule?: PermissionRule) {
	if (!rule) {
		return user != null;
	}
	return user ? (PERMISSIONS[rule] as Role[]).includes(user.role) : false;
}

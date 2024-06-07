import { browser } from '$app/environment';
import { page } from '$app/stores';
import type { Role } from '$lib/auth/constants';
import type { User } from 'lucia';
import { PERMISSIONS, type PermissionRule } from './constants';

let user = $state<User | null>();

if (browser) {
	page.subscribe(({ data }) => {
		user = data.user;
	});
}

/**
 * Verify that a client is authenticated and, optionally, that they have required role.
 */
export function authorize(rule?: PermissionRule) {
	if (!rule) {
		return user != null;
	}
	return user && (PERMISSIONS[rule] as Role[]).includes(user.role);
}

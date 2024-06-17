import { browser } from '$app/environment';
import { page } from '$app/stores';
import type { User } from 'lucia';
import { type PermissionRule } from './constants';
import { roleHasPermission } from './rbac';

let currentUser = $state<User | null>();

if (browser) {
	page.subscribe(({ data }) => {
		if (data) {
			currentUser = data.user;
		}
	});
}

/**
 * Verify that a client is authenticated and, optionally, that they have required role.
 */
export function authorize(rule?: PermissionRule) {
	if (!currentUser) {
		return false;
	}
	if (rule) {
		return roleHasPermission(currentUser.role, rule);
	}
	return true;
}

import { page } from '$app/stores';
import { derived } from 'svelte/store';
import { USER_ROLES, type UserRole } from './constants';

/**
 * CRUD-related actions.
 */
type PermissionAction = 'create' | 'read' | 'update' | 'delete';

/**
 * Collection of role-based CRUD permissions used as a basis for both client-side styling (disabling
 * links, buttons, etc.) and server-side authorization (route-guarding, form-action guarding,
 * etc.);
 */
export const PERMISSIONS = {
	'projects.descriptors.types.create': [USER_ROLES.ADMIN],
	'projects.descriptors.types.update': [USER_ROLES.ADMIN],
	'projects.descriptors.types.delete': [USER_ROLES.EDITOR],
	'projects.descriptors.interventionCategories.create': [],
	'projects.descriptors.interventionCategories.update': [],
	'projects.descriptors.interventionCategories.delete': [],
} as const satisfies Record<`${string}.${PermissionAction}`, UserRole[]>;

export type PermissionKey = keyof typeof PERMISSIONS;

/**
 * Client-side role-based authorization state helper.
 */
export const authorize = derived(page, ($p) => {
	return function (key: PermissionKey) {
		if (!$p.data.user) {
			return false;
		}
		return (PERMISSIONS[key] as UserRole[]).includes($p.data.user.role);
	};
});

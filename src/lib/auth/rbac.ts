import { page } from '$app/stores';
import { derived } from 'svelte/store';
import { USER_ROLES, type UserRole } from './constants';

/**
 * CRUD-related operations.
 */
type Operation = 'create' | 'read' | 'update' | 'delete';

/**
 * Collection of role-based CRUD permissions used as a basis for both client-side styling (disabling
 * links, buttons, etc.) and server-side authorization (route-guarding, form-action guarding,
 * etc.);
 */
export const PERMISSIONS = {
	'projects.descriptors.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.types.create': [USER_ROLES.ADMIN],
	'projects.descriptors.types.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.types.delete': [USER_ROLES.ADMIN],
	'projects.descriptors.interventions.create': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.interventions.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.interventions.delete': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.interventionCategories.create': [USER_ROLES.ADMIN],
	'projects.descriptors.interventionCategories.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.interventionCategories.delete': [USER_ROLES.ADMIN],
	'projects.descriptors.siteOwnerships.create': [USER_ROLES.ADMIN],
	'projects.descriptors.siteOwnerships.update': [USER_ROLES.ADMIN],
	'projects.descriptors.siteOwnerships.delete': [USER_ROLES.ADMIN],
	'projects.descriptors.exemplarityIndicators.create': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.exemplarityIndicators.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.exemplarityIndicators.delete': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.exemplarityCategories.create': [USER_ROLES.ADMIN],
	'projects.descriptors.exemplarityCategories.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'projects.descriptors.exemplarityCategories.delete': [USER_ROLES.ADMIN],
	'projects.descriptors.implantationTypes.create': [USER_ROLES.ADMIN, USER_ROLES.EDITOR],
	'projects.descriptors.implantationTypes.update': [USER_ROLES.ADMIN, USER_ROLES.EDITOR],
	'projects.descriptors.implantationTypes.delete': [USER_ROLES.ADMIN],
	'projects.descriptors.buildingLevelTypes.create': [USER_ROLES.ADMIN, USER_ROLES.EDITOR],
	'projects.descriptors.buildingLevelTypes.update': [USER_ROLES.ADMIN, USER_ROLES.EDITOR],
	'projects.descriptors.buildingLevelTypes.delete': [USER_ROLES.ADMIN],
	'projects.descriptors.imageTypes.create': [USER_ROLES.ADMIN, USER_ROLES.EDITOR],
	'projects.descriptors.imageTypes.update': [USER_ROLES.ADMIN, USER_ROLES.EDITOR],
	'projects.descriptors.imageTypes.delete': [USER_ROLES.ADMIN, USER_ROLES.EDITOR],
	'organizations.descriptors.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'organizations.descriptors.types.create': [USER_ROLES.ADMIN],
	'organizations.descriptors.types.update': [USER_ROLES.EDITOR, USER_ROLES.ADMIN],
	'organizations.descriptors.types.delete': [USER_ROLES.ADMIN],
} as const satisfies Record<`${string}.${Operation}`, UserRole[]>;

export type PermissionKey = keyof typeof PERMISSIONS;

/**
 * Client-side role-based authorization state helper.
 */
export const authorize = derived<typeof page, (key?: PermissionKey) => boolean>(
	page,
	($p) => (key?: PermissionKey) => {
		if (!$p.data.user) {
			// No session
			return false;
		}
		if (!key) {
			// Only check for signin
			return true;
		}
		return (PERMISSIONS[key] as UserRole[]).includes($p.data.user.role);
	}
);

// /**
//  * Authorize a server-side request event by requiring a user. If no key is defined, this guard
//  * simply checks that a user is authenticated. If a RBAC key is provided, role requirements are
//  * checked isomorhpically to the client-side authorize.
//  *
//  * Failure to fulfill authorization requirements lead to '401 Unauthorized' error being thrown.
//  * Otherwise, the function asserts the presence of user and session in locals.
//  */
// export function authorize<E extends RequestEvent | ServerLoadEvent>(
// 	event: E,
// 	key?: PermissionKey
// ): asserts event is E & { locals: SetNonNullable<App.Locals, 'user' | 'session'> } {
// 	if (!event.locals.user) {
// 		error(STATUS_CODES.UNAUTHORIZED, m.auth_no_session());
// 	}
// 	if (key && !(PERMISSIONS[key] as UserRole[]).includes(event.locals.user.role)) {
// 		error(STATUS_CODES.UNAUTHORIZED, m.auth_insufficient_role());
// 	}
// }

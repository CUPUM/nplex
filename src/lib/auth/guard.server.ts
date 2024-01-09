import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import { USER_ROLES, USER_ROLES_CONTENT_MANAGEMENT, type UserRole } from './constants';

/**
 * Helper to require auth inside server load functions and actions.
 */
export async function guardAuth(event: RequestEvent | ServerLoadEvent) {
	const session = await event.locals.auth.validate();
	if (!session) {
		error(STATUS_CODES.UNAUTHORIZED, m.auth_no_session());
	}
	return session;
}

/**
 * Role guard to protect endpoints, actions, or server load functions.
 */
export async function guardRole<R extends UserRole>(
	event: RequestEvent | ServerLoadEvent,
	...role: R[]
) {
	const session = await guardAuth(event);
	// /**
	//  * Event-specific guard.
	//  */
	// function isRequiredRole(maybeRole: unknown): maybeRole is R {
	// 	return role.indexOf(maybeRole as R) > -1;
	// }
	// if (!isRequiredRole(session.user.role) && !dev) {
	// 	throw error(STATUS_CODES.UNAUTHORIZED, m.auth_insufficient_role());
	// }
	return session;
}

/**
 * Role guard helper preset for editors and admins RBAC.
 */
export async function guardRoleContentManagement(event: RequestEvent | ServerLoadEvent) {
	return guardRole(event, ...USER_ROLES_CONTENT_MANAGEMENT);
}

/**
 * Role guard helper for admin RBAC.
 */
export async function guardRoleAdmin(event: RequestEvent | ServerLoadEvent) {
	return guardRole(event, USER_ROLES.ADMIN);
}

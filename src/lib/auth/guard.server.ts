import { dev } from '$app/environment';
import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import type { UserRole } from './constants';

/**
 * Helper to require auth inside server load functions and actions.
 */
export async function withAuth(event: RequestEvent | ServerLoadEvent) {
	const session = await event.locals.auth.validate();
	if (!session) {
		throw error(STATUS_CODES.UNAUTHORIZED, m.auth_noSession());
	}
	return session;
}

/**
 * Role guard to protect endpoints, actions, or server load functions.
 */
export async function withRole<R extends UserRole>(
	event: RequestEvent | ServerLoadEvent,
	...role: R[]
) {
	const session = await withAuth(event);
	/**
	 * Event-specific guard.
	 */
	function isRequiredRole(maybeRole: unknown): maybeRole is R {
		return role.indexOf(maybeRole as R) > -1;
	}
	if (!isRequiredRole(session.user.role) && !dev) {
		throw error(STATUS_CODES.UNAUTHORIZED, m.auth_insufficientRole());
	}
	return session;
}

import { STATUS_CODES } from '$lib/utils/constants';
import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import type { UserRole } from './constants';

/**
 * Helper to require auth inside server load functions and actions.
 */
export async function withAuth(
	event: RequestEvent | ServerLoadEvent
	// throwing: ReturnType<typeof redirect> | ReturnType<typeof error> = error(
	// 	STATUS_CODES.UNAUTHORIZED
	// )
) {
	const session = await event.locals.auth.validate();
	if (!session) {
		throw error(STATUS_CODES.UNAUTHORIZED);
	}
	return session;
}

/**
 * Role guard to protect endpoints, actions, or server load functions.
 */
export async function withRole(event: RequestEvent | ServerLoadEvent, ...role: UserRole[]) {
	const session = await withAuth(event);
	// if (role.indexOf(session.user.role) < 0) {
	// 	throw error(STATUS_CODES.UNAUTHORIZED);
	// }
	return session;
}

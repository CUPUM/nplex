import * as m from '$i18n/messages';
import type { UserRole } from '$lib/auth/constants';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, type Handle, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import type { Session } from 'lucia';
import { PERMISSIONS, type PermissionKey } from './authorization';

/**
 * Helper to require auth inside server load functions and actions.
 */
async function withAuth(event: RequestEvent | ServerLoadEvent) {
	const session = await event.locals.auth.validate();
	if (!session) {
		error(STATUS_CODES.UNAUTHORIZED, m.auth_no_session());
	}
	return session;
}

/**
 * Role guard to protect endpoints, actions, or server load functions.
 */
async function withRole<R extends UserRole>(event: RequestEvent | ServerLoadEvent, roles: R[]) {
	const session = await withAuth(event);
	function isRequiredRole(maybeRole: unknown): maybeRole is R {
		return roles.indexOf(maybeRole as R) > -1;
	}
	// if (!dev) {
	if (!isRequiredRole(session.user.role)) {
		throw error(STATUS_CODES.UNAUTHORIZED, m.auth_insufficient_role());
	}
	// }
	return session;
}

function createEventAuthorization<E extends RequestEvent | ServerLoadEvent>(event: E) {
	/**
	 * Event-specific RBAC helper that uses the same set of policies made available in the client
	 * derived `$authorize(key)` store.
	 */
	return (async (key?: PermissionKey) => {
		if (!key) {
			return withAuth(event);
		}
		return await withRole(event, PERMISSIONS[key]);
	}) satisfies (key?: PermissionKey) => Promise<Session>;
}

export type AuthorizeRequest = ReturnType<typeof createEventAuthorization>;

/**
 * Authorization: Providing RBAC helper.
 *
 * Database client: Closing the request-scoped pool. In this case we simply end the connection of
 * the global pool since we are in a serverless environment and global = request-scoped.
 */
const handle = (async ({ event, resolve }) => {
	event.locals.authorize = createEventAuthorization(event);
	const res = await resolve(event);
	// if (!dev) {
	// 	await pool.end();
	// }
	return res;
}) satisfies Handle;

export default handle;

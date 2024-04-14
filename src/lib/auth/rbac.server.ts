import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import type { SetNonNullable } from 'type-fest';
import type { UserRole } from './constants';
import { PERMISSIONS, type PermissionKey } from './rbac';

/**
 * Authorize a server-side request event by requiring a user. If no key is defined, this guard
 * simply checks that a user is authenticated. If a RBAC key is provided, role requirements are
 * checked isomorhpically to the client-side authorize.
 *
 * Failure to fulfill authorization requirements lead to '401 Unauthorized' error being thrown.
 * Otherwise, the function asserts the presence of user and session in locals.
 */
export function authorize<E extends RequestEvent | ServerLoadEvent>(
	event: E,
	key?: PermissionKey
): asserts event is E & { locals: SetNonNullable<App.Locals, 'user' | 'session'> } {
	if (!event.locals.user) {
		error(STATUS_CODES.UNAUTHORIZED, m.auth_no_session());
	}
	if (key && !(PERMISSIONS[key] as UserRole[]).includes(event.locals.user.role)) {
		error(STATUS_CODES.UNAUTHORIZED, m.auth_insufficient_role());
	}
}

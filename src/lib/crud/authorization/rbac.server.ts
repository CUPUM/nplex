import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { error, redirect, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import type { Session, User } from 'lucia';
import { type PermissionRule } from './constants';

/**
 * Redirects to login if no authentication is found. Else throw error if sufficient role permissions
 * are met by the authenticated user. UI handling should be handled using error boudaries.
 */
export function authorize<E extends ServerLoadEvent | RequestEvent>(
	event: E,
	rule?: PermissionRule,
	errorData?: App.Error
): asserts event is E & { locals: { user: User; session: Session } } {
	if (!event.locals.user) {
		redirect(STATUS_CODES.TEMPORARY_REDIRECT, '/login');
	}
	if (rule) {
		error(STATUS_CODES.UNAUTHORIZED, errorData || m.auth_insufficient_role());
	}
}

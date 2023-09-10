import { STATUS_CODES } from '$lib/utils/constants';
import { error, redirect, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';

/**
 * Helper to require auth inside server load functions and actions.
 */
export async function withAuth(
	event: RequestEvent | ServerLoadEvent,
	throwing: ReturnType<typeof redirect> | ReturnType<typeof error> = error(
		STATUS_CODES.UNAUTHORIZED
	)
) {
	const session = await event.locals.auth.validate();
	if (!session) {
		throw throwing;
	}
	return session;
}

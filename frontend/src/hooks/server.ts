import { Cookie } from '$utils/enums';
import { safeJsonParse } from '$utils/json';
import type { Handle } from '@sveltejs/kit';

const TOKEN_EXPIRY_MARGIN = 10000;

/**
 * Server-side generic handle hook:
 *
 * - Parse client cookies and pass relevant ones to endpoints using event.locals, for server-side
 *   auth-dependent behaviors.
 * - For consistency, mirror relevant client cookies to event.locals under their original key.
 * - To do: validate app version correspondance between client and server.
 */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = safeJsonParse(event.cookies.get(Cookie.Session));

	const res = await resolve(event);

	return res;
};

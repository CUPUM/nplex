import { Cookie } from '$utils/values/keys';
import type { Handle } from '@sveltejs/kit';

/**
 * Server-side generic handle hook:
 *
 * - Parse client cookies and pass relevant ones to endpoints using event.locals, for server-side auth-dependent
 *   behaviors.
 * - For consistency, mirror relevant client cookies to event.locals under their original key.
 * - To do: validate app version correspondance between client and server.
 */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = JSON.parse(event.cookies.get(Cookie.Session) ?? null);

	// Proceed with resolution.
	const res = await resolve(event);

	// Post-resolution handling
	// ...

	return res;
};

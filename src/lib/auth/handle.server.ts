import type { Handle } from '@sveltejs/kit';
import { auth } from './auth.server';

/**
 * Authentication and authorization helpers.
 */
const handle = (async ({ event, resolve }) => {
	const sessionId = event.cookies.get(auth.sessionCookieName);
	if (!sessionId) {
		event.locals.authed = null;
		return await resolve(event);
	}
	const { session, user } = await auth.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		});
		event.locals.authed = { user, session };
	}
	if (!session) {
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		});
		event.locals.authed = null;
	}
	return await resolve(event);
}) satisfies Handle;

export default handle;

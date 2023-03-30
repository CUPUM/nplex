import type { AuthSession } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';
import { clearSession, setSessionCookie, tokenData } from '../common';
import type { RequestHandler } from './$types';

/**
 * Use this endpoint to initialize or update a session cookie, EXCLUDING signouts. It verifies the
 * previous cookies or the posted data, sets an updated cookie accordingly while also returning the
 * extended user data to populate PageData or to pass cookie data along to another server module
 * that fetched the present one. It is thus imperative that this endpoint always resolve with either
 * a session cookie header or a session cookie body with returned data to set, update, or erase the
 * session in both the client's data props and cookies. The data in question should abide by the
 * shape of App.PageData['session'] or null.
 */
export const POST: RequestHandler = async (event) => {
	const authSession: AuthSession | null = event.request.body
		? (await event.request.json())?.auth
		: null;
	const dbSession = authSession
		? (await event.locals.db.auth.setSession(authSession)).data.session
		: (await event.locals.db.auth.getSession()).data.session;
	if (!dbSession) {
		return clearSession(event);
	}

	const profileRes = await event.locals.db
		.from('users_session')
		.select(
			`
			avatar_url,
			first_name,
			last_name,
			public_email,
			role,
			role_title,
			role_description
		`
		)
		.eq('id', dbSession.user.id)
		.single();

	if (profileRes.error || !profileRes.data.role) {
		return clearSession(event);
	}

	const sessionCookie = {
		...tokenData(dbSession),
		user: {
			id: dbSession.user.id,
			role: profileRes.data.role,
		},
	} satisfies App.Locals['session'];

	// If the endpoint was hit by a post with an auth session body (aka, following a signup or signin).
	// We send back the cookie that will then be added to the original endpoint or action's response.
	if (authSession) {
		return json(sessionCookie);
	}

	setSessionCookie(event, sessionCookie);

	const pageDataSession = {
		...dbSession,
		user: {
			...dbSession.user,
			...profileRes.data,
		},
	} satisfies App.PageData['session'];

	return json(pageDataSession);
};

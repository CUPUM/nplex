import { setClearCookies } from '$utils/cookie';
import { dbClient } from '$utils/database/database';
import { Cookie } from '$utils/enums';
import type { AuthChangeEvent, AuthSession } from '@supabase/supabase-js';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export type AuthUpdateBody = {
	session: AuthSession | null;
	event: AuthChangeEvent;
};

/**
 * Set the changed auth's session as a cookie.
 */
export const GET: RequestHandler = async ({ request, locals, cookies }) => {
	try {
		const newAuth: AuthUpdateBody = JSON.parse(cookies.get(Cookie.AuthChange) ?? null!);
		// Clear client's auth change cookie with response;
		if (newAuth) setClearCookies(cookies, Cookie.AuthChange);
		// If the user logged out or if there is no auth token in cookie, reset client's auth.
		if (!locals.session?.access_token || newAuth?.event === 'SIGNED_OUT') {
			setClearCookies(cookies, Cookie.Session);
			return json(null);
		}
		// Else, proceed using either the auth change data, if present, or using the previously available cookies.
		// Also temporarily set default 'visitor' role for object shape compliancy.
		const session: App.Locals['session'] = newAuth?.session
			? { ...newAuth.session, user: { ...newAuth.session.user, role: 'visitor' } }
			: locals.session;
		const db = dbClient.createForServer(session.access_token);
		const { data: roleData, error: roleError } = await db
			.from('users_roles')
			.select('role')
			.eq('user_id', session.user.id)
			.single();
		if (roleError) {
			setClearCookies(cookies, Cookie.AuthChange, Cookie.Session);
			return json(null);
		}
		session.user.role = roleData.role;
		// Update httpOnly session cookie.
		cookies.set(Cookie.Session, JSON.stringify(session), {
			maxAge: parseInt(session.expires_in + '') ?? -1,
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
		});

		// Return app user data
		// To do: pass a redirect if logged in from homepage, pointing client to /compte route.
		return json(session);
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}
};

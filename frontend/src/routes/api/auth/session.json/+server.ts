import { setClearCookies } from '$utils/cookie';
import { dbClient } from '$utils/database';
import { Cookie } from '$utils/enums';
import type { AuthChangeEvent, AuthSession } from '@supabase/supabase-js';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export type AuthChangeCookie = {
	session: AuthSession | null;
	event: AuthChangeEvent;
};

export type AuthSessionResponse = Pick<App.PageData, 'session' | 'previousSessionId'>;

/**
 * Set the changed auth's session as a cookie.
 */
export const GET: RequestHandler = async ({ request, locals, cookies }) => {
	try {
		const newAuth: AuthChangeCookie = JSON.parse(cookies.get(Cookie.AuthChange) ?? null!);
		// Clear client's auth change cookie with response.
		if (newAuth) setClearCookies(cookies, Cookie.AuthChange);
		// Coalescing potential locals session and potential newAuth session.
		// Also temporarily defaulting role to 'visitor' for type compliancy and least privilege.
		const session: App.Locals['session'] = newAuth?.session
			? { ...newAuth.session, user: { ...newAuth.session.user, role: locals.session?.user.role ?? 'visitor' } }
			: locals.session;
		const previousSessionId = locals.session?.user.id ?? null;
		const res: AuthSessionResponse = {
			previousSessionId,
			session: null,
		};
		// If the user logged out or if there is no auth token in cookie, reset client's auth.
		if (!session || newAuth?.event === 'SIGNED_OUT') {
			setClearCookies(cookies, Cookie.Session);
			return json(res);
		}
		const db = dbClient.createForServer(session.access_token);
		const { data: roleData, error: roleError } = await db
			.from('users_roles')
			.select('role')
			.eq('user_id', session.user.id)
			.single();
		if (roleError) {
			setClearCookies(cookies, Cookie.AuthChange, Cookie.Session);
			return json(res);
		}
		session.user.role = roleData.role;
		cookies.set(Cookie.Session, JSON.stringify(session), {
			maxAge: parseInt(session.expires_in + '') ?? -1,
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
		});
		res.session = session;
		return json(res);
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}
};

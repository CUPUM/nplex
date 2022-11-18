import { dev } from '$app/environment';
import { getDb } from '$utils/database';
import { Cookie } from '$utils/enums';
import { safeJsonParse } from '$utils/json';
import type { AuthSession } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

function clearSession(event: RequestEvent) {
	event.cookies.delete(Cookie.Session, { path: '/' });
	return json(null);
}

/**
 * Use this endpoint to initialize or update a session cookie, EXCLUDING signouts. It verifies the
 * previous cookies or the posted data sets an updated cookie accordingly, while also returning the
 * extended user data to populate PageData. It is thus imperative that this endpoint always resolve
 * with returned data to set, update, or erase the session in both the client's data props and
 * cookies. The data in question should abide by the shape of App.PageData['session'] or null.
 */
export const POST: RequestHandler = async (event) => {
	let authSession: AuthSession | null = safeJsonParse(event.cookies.get(Cookie.Auth));
	const db = await getDb(event);
	if (authSession) {
		event.cookies.delete(Cookie.Auth, { path: '/' });
		await db.auth.setSession(authSession);
	} else {
		authSession = (await db.auth.getSession()).data.session;
	}

	if (!authSession) {
		return clearSession(event);
	}

	const profileRes = await db
		.from('users')
		.select(
			`
				public_email,
				first_name,
				avatar_url,
				role:users_roles!users_roles_user_id_fkey(
					role
				)
			`
		)
		.eq('id', authSession.user.id)
		.single();

	if (profileRes.error || !profileRes.data.role) return clearSession(event);

	const pageDataSession: App.PageData['session'] = {
		...authSession,
		user: {
			...authSession.user,
			...profileRes.data,
			role: Array.isArray(profileRes.data.role)
				? profileRes.data.role[0].role
				: profileRes.data.role.role,
		},
	};
	const cookieSession: App.Locals['session'] = {
		access_token: pageDataSession.access_token,
		refresh_token: pageDataSession.refresh_token,
		provider_refresh_token: pageDataSession.provider_refresh_token,
		expires_at: pageDataSession.expires_at ?? Date.now() + pageDataSession.expires_in * 1000,
		expires_in: pageDataSession.expires_in,
		user: {
			id: pageDataSession.user.id,
			role: pageDataSession.user.role,
		},
	};
	event.cookies.set(Cookie.Session, JSON.stringify(cookieSession), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: authSession.expires_in,
	});
	return json(pageDataSession);
};

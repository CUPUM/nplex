import type { Database } from '$types/database';
import { createServerDbClient } from '$utils/database/database';
import { Cookie } from '$utils/values/keys';
import type { Session } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import cookie from 'cookie';
import type { RequestHandler } from './$types';

export type AppUserSession = {
	jwt: string;
	user: Session['user'] & {
		role: Database['public']['Tables']['users_roles']['Row']['role'];
	};
};

/**
 * Get an extended user (app user, including public.users_profiles.role) from the request's access-token cookie.
 */
export const GET: RequestHandler = async ({ locals, setHeaders }) => {
	/**
	 * If the user logged out or if there is no auth token in cookies, clear all relevant cookies and return a null user.
	 */
	if (
		locals[Cookie.AuthChange]?.event === 'SIGNED_OUT' ||
		(!locals[Cookie.AuthChange] && !locals[Cookie.DbAccessToken])
	) {
		[
			Cookie.AuthChange,
			Cookie.DbAccessToken,
			Cookie.DbAccessTokenExpiry,
			Cookie.DbProviderToken,
			Cookie.DbRefreshToken,
		].forEach((cookieName) => {
			setHeaders({
				'set-cookie': cookie.serialize(cookieName, '', {
					maxAge: -1,
					httpOnly: true,
					path: '/',
					sameSite: 'strict',
				}),
			});
		});
		return new Response('null');
	}
	/**
	 * Else, proceed using either the auth change data, if present, or with the previously available cookies.
	 */
	const db = createServerDbClient(locals[Cookie.DbAccessToken]);

	const { data, error: userError } = await db.auth.getUser(locals[Cookie.DbAccessToken]);
	if (userError) throw error(403, userError.message);

	const { data: profile, error: profileError } = await db
		.from('users_roles')
		.select('role')
		.eq('user_id', data.user.id)
		.single();
	if (profileError) throw error(403, profileError.message);

	const appUserSession: AppUserSession = {
		jwt: locals[Cookie.DbAccessToken],
		user: { ...data.user, role: profile.role },
	};

	// Build the response, and pass a redirection status + header if logged in from homepage.
	const res = new Response(JSON.stringify(appUserSession));

	// Update token cookies.
	(
		[Cookie.DbAccessToken, Cookie.DbAccessTokenExpiry, Cookie.DbProviderToken, Cookie.DbRefreshToken] as const
	).forEach((cookieName) => {
		setHeaders({
			'set-cookie': cookie.serialize(cookieName, locals[cookieName] || '', {
				maxAge: parseInt(locals[Cookie.DbAccessTokenExpiry]) || -1,
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
			}),
		});
	});

	// Clear auth change cookie
	setHeaders({
		'set-cookie': cookie.serialize(Cookie.AuthChange, '', {
			maxAge: -1,
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
		}),
	});

	return res;
};

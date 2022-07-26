import { DB_COOKIE_LIFETIME } from '$utils/database';
import { Cookie } from '$utils/keys';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export type UpdateUserCookieRequestBody = {
	user: App.Session['user'];
	access_token: string;
	refresh_token: string;
	expires_at: number;
};

export const POST: RequestHandler = async ({ request }) => {
	const body: UpdateUserCookieRequestBody = await request.json();
	const res = new Response();

	// User cookie, mirrors session.user.
	const userCookie = cookie.serialize(Cookie.User, JSON.stringify(body.user || null), {
		maxAge: DB_COOKIE_LIFETIME,
		httpOnly: true,
		path: '/',
		sameSite: true,
	});
	res.headers.append('set-cookie', userCookie);

	// Supabase user session's accessToken.
	const accessToken = cookie.serialize(Cookie.AccessToken, body.access_token || null, {
		expires: new Date(Date.now() + (body.expires_at || DB_COOKIE_LIFETIME)),
		httpOnly: true,
		path: '/',
		sameSite: true,
	});
	res.headers.append('set-cookie', accessToken);

	// Supabase user session's refreshToken.
	const refreshToken = cookie.serialize(Cookie.RefreshToken, body.refresh_token || null, {
		maxAge: DB_COOKIE_LIFETIME,
		httpOnly: true,
		path: '/',
		sameSite: true,
	});
	res.headers.append('set-cookie', refreshToken);

	return res;
};

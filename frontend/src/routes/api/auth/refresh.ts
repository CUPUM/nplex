import { applySetCookieHeaders, type SetCookieDetails } from '$utils/cookies';
import { Cookie } from '$utils/keys';
import type { Session } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import type cookie from 'cookie';

/**
 * Update client's cookies with newly refreshed tokens obtained after client-side AuthChangeEvent, triggered by
 * supabase's client auto-refresh.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	const res = new Response();
	const s: Session = await request.json();

	const cookieOptions: cookie.CookieSerializeOptions = {
		maxAge: s.expires_in,
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
	};

	const setCookies: SetCookieDetails[] = [
		{
			name: Cookie.DbAccessToken,
			value: s.access_token,
			options: cookieOptions,
		},
		{
			name: Cookie.DbRefreshToken,
			value: s.refresh_token,
			options: cookieOptions,
		},
		{
			name: Cookie.DbProviderToken,
			value: s.provider_token,
			options: cookieOptions,
		},
	];

	applySetCookieHeaders(res, setCookies);

	return res;
};

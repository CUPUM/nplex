import { applySetCookieHeaders, type SetCookieDetails } from '$utils/database';
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
	const setCookies: SetCookieDetails = {};

	const cookieOptions: cookie.CookieSerializeOptions = {
		expires: new Date(s.expires_at),
		httpOnly: true,
		path: '/',
		sameSite: true,
	};

	setCookies[Cookie.DbAccessTokenExpiry] = {
		value: s.expires_at.toString(),
		options: cookieOptions,
	};
	setCookies[Cookie.DbAccessToken] = {
		value: s.access_token,
		options: cookieOptions,
	};
	setCookies[Cookie.DbRefreshToken] = {
		value: s.refresh_token,
		options: cookieOptions,
	};
	setCookies[Cookie.DbProviderToken] = {
		value: s.provider_token,
		options: cookieOptions,
	};

	applySetCookieHeaders(res, setCookies);

	return res;
};

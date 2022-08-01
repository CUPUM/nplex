import { applySetCookieHeaders, type SetCookieDetails } from '$utils/database';
import { Cookie } from '$utils/keys';
import type { Session as SupabaseSession } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import type cookie from 'cookie';

type UpdateSessionDetails = SupabaseSession;

/**
 * Update client side cookies with passed Supabase session details.
 *
 * @returns Extended App.Session['user'], containing additional info queried from database.
 */
export const POST: RequestHandler = async ({ request }) => {
	const sessionDetails: UpdateSessionDetails = await request.json();
	const res = new Response();
	const setCookies: SetCookieDetails = {};

	const cookieOptions: cookie.CookieSerializeOptions = {
		expires: new Date(sessionDetails.expires_at),
		httpOnly: true,
		path: '/',
		sameSite: true,
	};

	setCookies[Cookie.DbAccessTokenExpiry] = {
		value: sessionDetails.expires_at.toString(),
		options: cookieOptions,
	};
	setCookies[Cookie.DbAccessToken] = {
		value: sessionDetails.access_token,
		options: cookieOptions,
	};
	setCookies[Cookie.DbRefreshToken] = {
		value: sessionDetails.refresh_token,
		options: cookieOptions,
	};
	setCookies[Cookie.DbProviderToken] = {
		value: sessionDetails.provider_token,
		options: cookieOptions,
	};

	applySetCookieHeaders(res, setCookies);

	return res;
};

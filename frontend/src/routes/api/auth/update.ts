import { applySetCookieHeaders, type SetCookieDetails } from '$utils/cookies';
import { getExtendedUser } from '$utils/database';
import { Cookie } from '$utils/keys';
import type { Session, Session as SupabaseSession } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import type cookie from 'cookie';

type UpdateSessionDetails = SupabaseSession;

/**
 * Update client side cookies with passed Supabase session details.
 *
 * @returns Extended App.Session['user'], containing additional info queried from database.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	const s: Session = await request.json();
	let res = new Response();
	const setCookies: SetCookieDetails = {};

	const cookieOptions: cookie.CookieSerializeOptions = {
		maxAge: s.expires_in,
		httpOnly: true,
		path: '/',
		sameSite: true,
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

	try {
		const appUser = await getExtendedUser(s);
		res = new Response(JSON.stringify(appUser));
	} catch (error) {}

	applySetCookieHeaders(res, setCookies);

	return res;
};

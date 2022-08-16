import { applySetCookieHeaders, type SetCookieDetails } from '$utils/cookies';
import { getAppUser } from '$utils/database/auth';
import { Cookie } from '$utils/values/keys';
import type { Session, Session as SupabaseSession } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import type cookie from 'cookie';

type UpdateSessionDetails = SupabaseSession;

/**
 * Update client side cookies with passed Supabase session details.
 *
 * @returns Extended App.Session['user'], containing additional info queried from database.
 */
export const POST: RequestHandler = async ({ request, locals, url }) => {
	const s: Session = await request.json();
	let res = new Response();

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

	try {
		const appUser = await getAppUser(s);
		res = new Response(JSON.stringify(appUser));
	} catch (error) {}

	applySetCookieHeaders(res, setCookies);

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	return res;
};

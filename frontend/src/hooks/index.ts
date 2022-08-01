import { applySetCookieHeaders, type SetCookieDetails } from '$utils/cookies';
import { createDisposableDbClient, getExtendedUser } from '$utils/database';
import { Cookie } from '$utils/keys';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

// 10 minutes
const TOKEN_EXPIRY_MARGIN = 600000;

/**
 * Sveltekit handle hook to:
 *
 * - Parse client cookies and pass them to endpoints within locals.
 * - Append default set-cookie headers when not defined form within endpoints.
 */
export const handle: Handle = async ({ event, resolve }) => {
	let cookies = cookie.parse(event.request.headers.get('cookie') || '');
	let setCookies: SetCookieDetails = {};

	// Set the relevant and up-to-date token values inside event locals for the rest of request resolving.
	[Cookie.DbAccessToken, Cookie.DbProviderToken, Cookie.DbAccessTokenExpiry, Cookie.DbRefreshToken].forEach(
		(tokenName) => {
			event.locals[tokenName] = cookies[tokenName] || null;
		}
	);

	// Resolve called api or hook.
	const res = await resolve(event);

	// Apply default set-cookie headers without overwriting thos already applied on the resolved response.
	applySetCookieHeaders(res, setCookies, false);

	return res;
};

/**
 * Get session hook used on SSR, notably first-loads. On refresh or on first page load, this hook should run before the
 * load functions.
 */
export const getSession: GetSession = async ({ request, locals, url }) => {
	let appUser: App.Session['user'] = null;

	try {
		if (locals[Cookie.DbAccessToken]) {
			const db = createDisposableDbClient();
			const { user, error: userError } = await db.auth.api.getUser(locals[Cookie.DbAccessToken]);
			if (userError) throw userError;
			appUser = await getExtendedUser({ access_token: locals[Cookie.DbAccessToken], user });
		}
	} catch (err) {}

	return {
		previousUrl: url.toString(),
		user: appUser,
	};
};

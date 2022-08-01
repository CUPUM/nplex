import type { definitions } from '$types/database';
import {
	applySetCookieHeaders,
	clearTokens,
	createServerDbClient,
	refreshTokens,
	type SetCookieDetails,
} from '$utils/database';
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
	let error: Error;

	// Check if client has tokens.
	if (cookies[Cookie.DbAccessToken] || cookies[Cookie.DbRefreshToken]) {
		try {
			// Check if the access token is about to expire, and refresh it if needed.
			if ((parseInt(cookies[Cookie.DbAccessTokenExpiry]) || 0) < Date.now() + TOKEN_EXPIRY_MARGIN) {
				setCookies = await refreshTokens(cookies[Cookie.DbRefreshToken]);
			}
		} catch (err) {
			// Set clear cookies to send to client if tokens invalid or outdated.
			setCookies = clearTokens;
		} finally {
			cookies = {
				...cookies,
				...Object.entries(setCookies).reduce((newCookies, [tokenName, tokenInfo]) => {
					newCookies[tokenName] = tokenInfo.value;
					return newCookies;
				}, {}),
			};
		}
	}

	// Set the relevant and up-to-date token values inside event locals for the rest of request resolving.
	[Cookie.DbAccessToken, Cookie.DbProviderToken].forEach((tokenName) => {
		event.locals[tokenName] = cookies[tokenName] || null;
	});

	// Resolve called api or hook.
	const res = await resolve(event);

	// Apply default set-cookie headers without overwriting thos already applied on the resolved response.
	applySetCookieHeaders(res, setCookies, false);

	return res;
};

/**
 * Get session hook used on SSR, notably first-loads.
 */
export const getSession: GetSession = async (event) => {
	let appUser: App.Session['user'] = null;

	try {
		if (event.locals[Cookie.DbAccessToken]) {
			const db = createServerDbClient();
			const { user, error: userError } = await db.auth.api.getUser(event.locals[Cookie.DbAccessToken]);
			if (userError) throw userError;
			db.auth.setAuth(event.locals[Cookie.DbAccessToken]);
			const { data, error: roleError } = await db
				.from<definitions['users_roles']>('users_roles')
				.select('role')
				.eq('user_id', user.id)
				.single();
			if (roleError) throw roleError;
			appUser = { ...user, role: data.role };
		}
	} catch (err) {}

	return {
		previousUrl: event.url.toString(),
		user: appUser,
	};
};

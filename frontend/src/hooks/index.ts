import { Cookie } from '$utils/values/keys';
import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';

/**
 * Parse client cookies and pass relevant ones to endpoints using event.locals, for server-side auth-dependent behaviors.
 */
export const handle: Handle = async ({ event, resolve }) => {
	let cookies = cookie.parse(event.request.headers.get('cookie') || '');

	// Set the relevant and up-to-date token values inside event locals for the rest of request resolving.
	[Cookie.DbAccessToken, Cookie.DbProviderToken, Cookie.DbAccessTokenExpiry, Cookie.DbRefreshToken].forEach(
		(tokenName) => {
			event.locals[tokenName] = cookies[tokenName] || null;
		}
	);

	return await resolve(event);
};

/**
 * Get session hook used on SSR. On refresh or on first page load, this hook should run before the load functions.
 */
// export const getSession: GetSession = async ({ request, locals, url }) => {
// 	let appUser: App.Session['user'] = null;

// 	try {
// 		if (locals[Cookie.DbAccessToken]) {
//			const db = createDisposableDbClient();
// 			const { user, error: userError } = await db.auth.api.getUser(locals[Cookie.DbAccessToken]);
// 			if (userError) throw userError;
// 			appUser = await getAppUser({ access_token: locals[Cookie.DbAccessToken], user });
// 		}
// 	} catch (err) {}

// 	return {
// 		previousUrl: url.toString(),
// 		user: appUser,
// 	};
// };

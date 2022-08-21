import { Cookie } from '$utils/values/keys';
import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';

/**
 * Parse client cookies and pass relevant ones to endpoints using event.locals, for server-side auth-dependent behaviors.
 *
 * For consistency, name event.locals property in accordance with cookie names.
 */
export const handle: Handle = async ({ event, resolve }) => {
	let cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const authChangeSession: App.Locals[Cookie.AuthChange]['session'] =
		JSON.parse(cookies[Cookie.AuthChange] || '{}').session || null;

	event.locals[Cookie.DbAccessToken] = authChangeSession
		? authChangeSession.access_token
		: cookies[Cookie.DbAccessToken] || null;
	event.locals[Cookie.DbProviderToken] = authChangeSession
		? authChangeSession.provider_token
		: cookies[Cookie.DbProviderToken] || null;
	event.locals[Cookie.DbAccessTokenExpiry] = authChangeSession
		? authChangeSession.expires_in + ''
		: cookies[Cookie.DbAccessTokenExpiry] || null;
	event.locals[Cookie.DbRefreshToken] = authChangeSession
		? authChangeSession.refresh_token
		: cookies[Cookie.DbRefreshToken] || null;
	event.locals[Cookie.AuthChange] = JSON.parse(cookies[Cookie.AuthChange] || 'null');

	// Proceed with resolution.
	return await resolve(event);
};

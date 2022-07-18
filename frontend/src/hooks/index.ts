import { Cookie } from '$utils/keys';
import type { GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

// export const handle: Handle = async ({ event, resolve }) => {
// 	const res = await resolve(event);
// 	return res;
// };

// export const handleError: HandleError = async ({ error, event }) => {
// 	// Customize error handling here.
// };

export const getSession: GetSession = async (event) => {
	return {
		previousUrl: event.url.toString(),
		// Defaulting the session's user to the one found in the client's cookies.
		user: JSON.parse(cookie.parse(event.request.headers.get('cookie') || '')[Cookie.User] || null),
	};
};

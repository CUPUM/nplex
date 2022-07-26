import { Cookie } from '$utils/keys';
import type { GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

// export const handle: Handle = async ({ event, resolve }) => {
//	// Customize general request handling here.
// 	const res = await resolve(event);
// 	return res;
// };

// export const handleError: HandleError = async ({ error, event }) => {
// 	// Customize error handling here.
// };

export const getSession: GetSession = async (event) => {
	const cookies = cookie.parse(event.request.headers.get('cookie')) || null;

	// To do here: https://supabase.com/docs/reference/javascript/auth-setauth
	// const dbTemp = createClient(
	// 	import.meta.env.PUBLIC_SUPABASE_URL as string,
	// 	import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string
	// );

	return {
		previousUrl: event.url.toString(),
		// Defaulting the session's user to the one found in the client's cookies if the access token is present (i.e. not expired).
		user: cookies[Cookie.AccessToken] && cookies[Cookie.User] ? JSON.parse(cookies[Cookie.User]) : null,
	};
};

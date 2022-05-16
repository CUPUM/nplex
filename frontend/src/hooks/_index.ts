import * as cookie from 'cookie';
import type { GetSession, Handle } from '@sveltejs/kit';
import { db } from '$utils/database';
// import { makeSessionCookies, SessionCookieName } from '$utils/auth';
import jwt from 'jsonwebtoken';

const expiry = 1000;

// async function refreshAccessToken(cookies) {
// 	const { data, error } = await db.auth.api.refreshAccessToken(cookies[SessionCookieName.REFRESH]);
// 	db.auth.api.
// 	if (error) {
// 		cookies[SessionCookieName.ACCESS] = null;
// 		cookies[SessionCookieName.REFRESH] = null;
// 		cookies[SessionCookieName.EXPIRES] = null;
// 		throw error;
// 	}

// 	// Needed so that server calls are authenticated
// 	db.auth.setAuth(data[SessionCookieName.ACCESS]);

// 	cookies[SessionCookieName.ACCESS] = data[SessionCookieName.ACCESS];
// 	cookies[SessionCookieName.REFRESH] = data[SessionCookieName.REFRESH];
// 	cookies[SessionCookieName.EXPIRES] = data[SessionCookieName.EXPIRES];

// 	const refreshed = makeSessionCookies({
// 		session: data,
// 		extra: {
// 			maxAge: data.expires_in
// 		}
// 	});

// 	return refreshed;
// }

/** Handle hook */
// export const handle: Handle = async ({ event, resolve }) => {
// 	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
// 	let setCookies = [];

// 	if (cookies[SessionCookieName.ACCESS] || cookies[SessionCookieName.REFRESH]) {
// 		if (parseInt(cookies[SessionCookieName.EXPIRES]) < Math.floor(Date.now() / 1000) + expiry) {
// 			console.log('Access token expired. Refreshing...');
// 			try {
// 				setCookies = await refreshAccessToken(cookies);
// 			}
// 			catch (error) {
// 				console.error(error);
// 				setCookies = makeSessionCookies();
// 			}
// 		}
// 		const jwtPayload = cookies[SessionCookieName.ACCESS] ? jwt.decode(cookies[SessionCookieName.ACCESS]) : false;
// 		event.locals.authed = !!jwtPayload;
// 		event.locals.user = { email: jwtPayload?.email };
// 	}

// 	let response = await resolve(event);

// 	if (setCookies?.length) {
// 		setCookies.forEach((cookie) => response.headers.append('set-cookie', cookie));
// 	}

// 	return response;
// };

// export async function getSession(request) {
// 	const { user, authenticated } = request.locals;
// 	return {
// 		user,
// 		authenticated,
// 	};
// }

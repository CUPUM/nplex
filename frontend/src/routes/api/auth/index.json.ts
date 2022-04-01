// import { makeSessionCookies } from '$utils/auth';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * API route used to prepare/update cookies server-side and set them on the requesting client.
 */
// export const post: RequestHandler = async ({ request }) => {
// 	const body = await request.json();

// 	let sessionCookies = makeSessionCookies({
// 		session: body.session || null,
// 		extra: {
// 			maxAge: body.session ? body.session['expires_in'] : ''
// 		}
// 	});

// 	return {
// 		status: 200,
// 		body: null,
// 		headers: {
// 			'set-cookie': sessionCookies
// 		}
// 	}
// }

// /**
//  * Called from hooks
//  */
// export const get: RequestHandler = async ({ request }) => {
// 	const { user, authenticated } = await request.locals;
// 	return {
// 		body: {
// 			user,
// 			authenticated
// 		},
// 	};
// }
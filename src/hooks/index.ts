import type { GetSession, Handle, Request } from '@sveltejs/kit';


// export async function handle({ request, resolve }) {
// 	request.locals.user = await getUserInformation(request.headers.cookie);

// 	const response = await resolve(request);

// 	return {
// 		...response,
// 		headers: {
// 			...response.headers,
// 			'x-custom-header': 'potato'
// 		}
// 	};
// }


// export function getSession(request: Request): GetSession {
// 	return request.locals.user
// 		? {
// 				user: {
// 					// only include properties needed client-side —
// 					// exclude anything else attached to the user
// 					// like access tokens etc
// 					name: request.locals.user.name,
// 					email: request.locals.user.email,
// 					avatar: request.locals.user.avatar
// 				}
// 		  }
// 		: {};
// }
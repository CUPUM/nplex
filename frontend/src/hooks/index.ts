import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// console.log('Handle hook: ', event.locals);
	const res = await resolve(event);
	return res;
};

// export const handleError: HandleError = async ({ error, event }) => {
// 	// Customize error handling here.
// };

export const getSession: GetSession = (event) => {
	// console.log('Get session triggered', event.url.toString());
	return {
		prevUrl: event.url.toString(),
		// initialUrl:
	};
};

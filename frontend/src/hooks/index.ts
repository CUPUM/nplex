import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// console.log('Handle triggered', event);
	const res = await resolve(event);
	return res;
};

export const getSession: GetSession = (event) => {
	// console.log('Get session triggered', event.url.toString());
	return {
		prevUrl: event.url.toString(),
	};
};

import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('');
	const res = await resolve(event);
	return res;
};

export const getSession: GetSession = (e) => {
	// console.log(e);
	return {
		prevnav: e.url.pathname,
	};
};

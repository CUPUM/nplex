import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const res = await resolve(event);
	return res;
};

export const getSession: GetSession = (e) => {
	return {
		prevUrl: e.url.toString(),
	};
};

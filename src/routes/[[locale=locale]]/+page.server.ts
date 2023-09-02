import { auth } from '$lib/auth/auth.server.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	console.log(event);
	// get projects showcase
	// get random images for header
};

export const actions = {
	logout: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) {
			return fail(STATUS_CODES.UNAUTHORIZED);
		}
		await auth.invalidateSession(session.sessionId);
		event.locals.auth.setSession(null);
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	},
};

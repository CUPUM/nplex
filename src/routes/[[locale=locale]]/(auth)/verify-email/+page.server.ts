import { sendEmailVerificationLink } from '$lib/auth/emails.server.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) {
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/login');
	}
	if (session.user.emailVerified) {
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	return {};
};

export const actions = {
	default: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) {
			throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/login');
		}
		if (session.user.emailVerified) {
			throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
		}
		try {
			await sendEmailVerificationLink(session.user, event);
			return {
				success: true,
			};
		} catch {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, {
				message: 'An unknown error occurred',
			});
		}
	},
};

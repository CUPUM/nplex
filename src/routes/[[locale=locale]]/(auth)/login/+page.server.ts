import { auth } from '$lib/auth/auth.server.js';
import { AUTH_PROVIDERS } from '$lib/auth/constants.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { fail } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailPasswordLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) {
		if (session.user.email && !session.user.emailVerified) {
			throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/signup/verify-email');
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(emailPasswordLoginSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, emailPasswordLoginSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			const key = await auth.useKey(
				AUTH_PROVIDERS.EMAIL,
				form.data.email.toLowerCase(),
				form.data.password
			);
			const session = await auth.createSession({ userId: key.userId, attributes: {} });
			event.locals.auth.setSession(session);
		} catch (err) {
			if (
				err instanceof LuciaError &&
				(err.message === 'AUTH_INVALID_KEY_ID' || err.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(STATUS_CODES.BAD_REQUEST, {
					form,
					message: 'Incorrect email or password',
				});
			}
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, {
				form,
				message: 'An unknown error occurred',
			});
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	},
};

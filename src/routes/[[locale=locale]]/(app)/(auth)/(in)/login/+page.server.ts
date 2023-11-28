import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { AUTH_PROVIDERS } from '$lib/auth/constants';
import { STATUS_CODES } from '$lib/utils/constants';
import { LuciaError } from 'lucia';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailPasswordLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) {
		if (session.user.email && !session.user.emailVerified) {
			throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
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
			return message(form, [
				{
					title: m.auth_invalid(),
					description: m.auth_invalidDescription(),
				},
			]);
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
				return message(
					form,
					[
						{
							title: m.auth_notFound(),
							description: m.auth_notFoundDescription(),
						},
					],
					{ status: STATUS_CODES.BAD_REQUEST }
				);
			}
			return message(
				form,
				[
					{
						title: m.auth_error(),
						description: m.auth_errorDescription(),
					},
				],
				{ status: STATUS_CODES.INTERNAL_SERVER_ERROR }
			);
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i', [
			{
				title: m.auth_success(),
				description: m.auth_successDescription(),
			},
		]);
	},
};

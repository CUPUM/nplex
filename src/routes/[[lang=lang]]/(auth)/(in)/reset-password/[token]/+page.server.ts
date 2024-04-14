import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { AUTH_PROVIDERS } from '$lib/auth/constants';
import { validatePasswordResetToken } from '$lib/auth/utils.server';
import { STATUS_CODES } from '$lib/common/constants';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const resetPasswordSchema = z
	.object({
		newPassword: z.string().email(),
		confirmPassword: z.string().email(),
	})
	.superRefine((d, ctx) => {
		if (d.confirmPassword !== d.newPassword) {
			ctx.addIssue({
				fatal: true,
				code: z.ZodIssueCode.custom,
				message: 'New password and password confirmation do not match.',
			});
			return z.NEVER;
		}
	});

export const load = async () => {
	const form = superValidate(resetPasswordSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(resetPasswordSchema);
		if (form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			const userId = await validatePasswordResetToken(event.params.token);
			let user = await auth.getUser(userId);
			if (!user.email) {
				return fail(STATUS_CODES.METHOD_NOT_ALLOWED, { form });
			}
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword(AUTH_PROVIDERS.EMAIL, user.email, form.data.newPassword);
			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: true,
				});
			}
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});
			event.locals.auth.setSession(session);
		} catch (err) {
			return message(
				form,
				{ title: m.error(), description: m.error_details() },
				{
					status: STATUS_CODES.INTERNAL_SERVER_ERROR,
				}
			);
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	},
};

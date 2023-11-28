import * as m from '$i18n/messages';
import { EMAIL_SENDERS } from '$lib/emails/constants';
import ResetPassword from '$lib/emails/templates/ResetPassword.svelte';
import VerifyEmail from '$lib/emails/templates/VerifyEmail.svelte';
import { transporter } from '$lib/emails/transporter.server';
import type { RequestEvent } from '@sveltejs/kit';
import type { User } from 'lucia';
import { render } from 'svelte-email';
import type { SetNonNullable } from 'type-fest';
import { generateEmailVerificationToken, generatePasswordResetToken } from './token.server';

type EmailUser = SetNonNullable<Pick<User, 'id' | 'email'>>;

export async function sendEmailVerificationLink(user: EmailUser, event: RequestEvent) {
	const token = await generateEmailVerificationToken(user.id);
	const html = render({
		template: VerifyEmail,
		props: {
			token,
			event,
		},
	});
	await transporter.sendMail({
		from: EMAIL_SENDERS.NPLEX,
		to: user.email,
		subject: m.email_verifyEmail_subject(),
		html,
	});
}

export async function sendPasswordResetLink(user: EmailUser, event: RequestEvent) {
	const token = await generatePasswordResetToken(user.id);
	const html = render({
		template: ResetPassword,
		props: {
			token,
			event,
		},
	});
	await transporter.sendMail({
		from: EMAIL_SENDERS.NPLEX,
		to: user.email,
		subject: m.email_resetPassword_subject(),
		html,
	});
}

import { EMAIL_USER } from '$env/static/private';
import VerifyEmail from '$lib/emails/VerifyEmail.svelte';
import { transporter } from '$lib/emails/transporter.server';
import type { RequestEvent } from '@sveltejs/kit';
import type { User } from 'lucia';
import { render } from 'svelte-email';
import { generateEmailVerificationToken } from './token.server';

export async function sendEmailVerificationLink(user: User, event: RequestEvent) {
	const t = event.locals.createTranslations({
		fr: {
			subject: 'Une dernière petite étape: confirmez votre courriel.',
		},
		en: {
			subject: 'One last step: verify your email',
		},
	});
	const token = await generateEmailVerificationToken(user.userId);
	const html = render({
		template: VerifyEmail,
		props: {
			token,
			event,
		},
	});
	await transporter.sendMail({
		from: `"Nplex" <${EMAIL_USER}>`,
		to: user.email,
		subject: t.subject,
		html,
	});
}

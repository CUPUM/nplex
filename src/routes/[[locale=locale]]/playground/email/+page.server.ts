import { EMAIL_USER } from '$env/static/private';
import VerifyEmail from '$lib/emails/VerifyEmail.svelte';
import { transporter } from '$lib/emails/transporter.server.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { fail } from '@sveltejs/kit';
import { render } from 'svelte-email';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailSchema = z.object({
	email: z.string().email(),
});

export const load = async () => {
	const form = superValidate(emailSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, emailSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		console.log(form.data.email);
		const t = event.locals.createTranslations({
			fr: {
				subject: 'Une dernière étape: confirmez votre adresse courriel',
			},
			en: {
				subject: 'One last step: verify your email address',
			},
		});
		const html = render({
			template: VerifyEmail,
			props: {
				event,
				token: 'aasd3aresdsd3wsgjadasd',
			},
		});
		await transporter.sendMail({
			from: `"Nplex test" <${EMAIL_USER}>`,
			to: form.data.email,
			subject: t.subject,
			html,
		});
		return { form };
	},
};

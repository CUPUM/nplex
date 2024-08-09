import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from '$env/static/private';
import { createTransport } from 'nodemailer';
import type { Component } from 'svelte';
import { render } from 'svelte/server';

/**
 * Nodemailer transporter singleton.
 */
export const mail = createTransport({
	host: EMAIL_HOST,
	port: +EMAIL_PORT,
	secure: +EMAIL_PORT === 465,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD,
	},
});

export function renderEmail<TProps extends Record<string, any>>(
	component: Component<TProps>,
	{ props }: { props: TProps }
) {
	const rendered = render(component, { props });
	console.log(rendered);
	return rendered.body.replace('%svelte-email.head%', rendered.head);
}

import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from '$env/static/private';
import { createTransport } from 'nodemailer';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { render } from 'svelte/server';

/**
 * Nodemailer transporter singleton.
 */
export const mail = createTransport({
	host: EMAIL_HOST,
	port: +EMAIL_PORT,
	secure: true,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD,
	},
});

export function renderEmail<
	T extends SvelteComponent<Record<string, any>, Record<string, any>, any>,
>(component: ComponentType<T>, { props }: { props: ComponentProps<T> }) {
	// @ts-ignore
	const rendered = render(component, { props });
	return rendered.html.replace('%svelte-email.head%', rendered.head);
}

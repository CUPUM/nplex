<script lang="ts">
	import { DOMAIN_NAME } from '$env/static/private';
	import * as m from '$i18n/messages';
	import type { RequestEvent } from '@sveltejs/kit';
	import { Button, Heading, Hr, Html, Text } from 'svelte-email';
	import { ACCENT, ACCENT_DIM, fontFamily } from '../constants';

	export let event: RequestEvent;
	export let token: string;

	const url = `${DOMAIN_NAME}/reset-password/${token}`;
</script>

<Html lang={event.locals.locale}>
	<Heading
		style={{
			fontFamily,
			fontWeight: 600,
			fontSize: '1.8rem',
			textAlign: 'center',
			color: ACCENT,
			margin: '3rem 3rem 2rem',
		}}
	>
		{m.email_resetPassword_title}
	</Heading>
	<Text
		style={{
			fontFamily,
			fontWeight: 400,
			textAlign: 'center',
			maxWidth: '65ch',
			margin: '2em auto',
			opacity: 0.8,
		}}
	>
		{m.email_resetPassword_body}
	</Text>
	<p style="text-align: center; margin-bottom: 2rem;">
		<Button
			href={url}
			style={{
				fontFamily,
				fontWeight: 550,
				display: 'inline-block',
				color: 'white',
				fontSize: '0.8rem',
				backgroundColor: ACCENT,
				padding: '18px 24px 22px',
				borderRadius: '1rem',
				textDecoration: 'none',
			}}
		>
			{m.email_resetPassword_button}
		</Button>
	</p>
	<Hr style={{ height: '1px', backgroundColor: ACCENT_DIM }} />
	<Text
		style={{
			fontFamily,
			fontWeight: 400,
			textAlign: 'center',
			maxWidth: '65ch',
			fontSize: '0.8rem',
			margin: '2em auto',
			opacity: 0.5,
		}}
	>
		{m.email_resetPassword_note}
	</Text>
</Html>

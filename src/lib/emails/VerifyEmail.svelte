<script lang="ts">
	import { DOMAIN_NAME } from '$env/static/private';
	import type { RequestEvent } from '@sveltejs/kit';
	import { Button, Heading, Hr, Html, Text } from 'svelte-email';
	import { ACCENT, ACCENT_DIM, fontFamily } from './constants';

	export let event: RequestEvent;
	export let token: string;

	const url = `${DOMAIN_NAME}/signup/verify-email/${token}`;

	const t = event.locals.createTranslations({
		fr: {
			title: 'Confirmez votre adresse courriel',
			body: 'Avant de continuer, nous avons besoin de vérifier l’authenticité de votre courriel. Continuez en cliquant sur le bouton ci-dessous.',
			link: 'Confirmer mon adresse courriel',
			footnote:
				'Si vous n’avez pas créé de compte sur le site Nplex.design dernièrement, merci d’ignorer ce message.',
		},
		en: {
			title: 'Confirm your email address',
			body: 'Before going forward, we need to quickly verify the authenticity of your email. To continue, please click the button below.',
			link: 'Verify my email address',
			footnote:
				'If you haven’t signed up to Nplex.com recently or believe this email was wrongly sent to you, please ignore.',
		},
	});
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
		{t.title}
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
		{t.body}
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
			{t.link}
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
		{t.footnote}
	</Text>
</Html>

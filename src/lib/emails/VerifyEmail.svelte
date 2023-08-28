<script lang="ts">
	import { DOMAIN_NAME } from '$env/static/private';
	import type { RequestEvent } from '@sveltejs/kit';
	import { Heading, Html, Link, Text } from 'svelte-email';

	export let event: RequestEvent;
	export let token: string;

	const url = `${DOMAIN_NAME}/signup/verify-email/${token}`;

	const t = event.locals.createTranslations({
		fr: {
			title: 'Confirmez qu’il s’agit bien de votre adresse courriel',
			body: 'Avant de continuer, nous avons besoin de vérifier l’authenticité de votre courriel. Si vous n’avez pas créé de compte sur le site Nplex.design dernièrement, merci d’ignorer ce message.',
			link: 'Confirmer mon adresse courriel!',
		},
		en: {
			title: 'Confirm this email address is yours',
			body: 'Before going forward, we need to quickly verify the authenticity of your email. If you haven’t signed up to Nplex.com recently, please ignore this message.',
			link: 'Verify my email address!',
		},
	});

	const fontFamily = "'Outfit', sans-serif";
</script>

<Html lang={event.locals.locale}>
	<!-- <Head>
		{@html `<style>
			@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;550&display=swap');
			</style>`}
	</Head> -->
	<Heading style={{ fontFamily, fontWeight: 500, textAlign: 'center' }}>
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
	<p style="text-align: center;">
		<Link
			href={url}
			style={{
				fontFamily,
				fontWeight: 500,
				display: 'inline-block',
				color: 'hsl(147, 33%, 40%)',
				padding: '12px 20px 16px',
				backgroundColor: 'hsla(147, 33%, 40%, .1)',
				borderRadius: '1em',
				textDecoration: 'none',
			}}
		>
			{t.link}
		</Link>
	</p>
</Html>

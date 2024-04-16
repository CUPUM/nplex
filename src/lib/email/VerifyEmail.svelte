<script lang="ts">
	import { DOMAIN_NAME } from '$env/static/private';
	import * as m from '$i18n/messages';
	import { Container, Head, Heading, Html, Link, Text } from 'svelte-email';
	import Fonts from './Fonts.svelte';
	import Separator from './Separator.svelte';
	import {
		COLOR_FG_MUTED,
		COLOR_PRIMARY,
		FONT_WEIGHT_BOLD,
		STYLE_BASE,
		STYLE_BUTTON_CTA,
		STYLE_H1,
	} from './constants';

	export let code: string;
</script>

<Html>
	<Head>
		<Fonts />
	</Head>
	<Container style={STYLE_BASE}>
		<Heading style={STYLE_H1}>
			{m.email_verify_email_title()}
		</Heading>
		<Text>
			{m.email_verify_email_code()}
		</Text>
		<Text
			style={{
				fontWeight: FONT_WEIGHT_BOLD,
				color: COLOR_PRIMARY,
				fontSize: '1.33rem',
				letterSpacing: '0.5em',
			}}
		>
			{code}
		</Text>
		<Text>
			{m.email_verify_email_continue()}
		</Text>
		<br />
		<Link style={STYLE_BUTTON_CTA} href="{DOMAIN_NAME}/verify-email">
			{m.email_verify_email_button()}
		</Link>
		<Separator />
		<Text
			style={{
				color: COLOR_FG_MUTED,
			}}
		>
			{m.email_verify_email_note()}
		</Text>
	</Container>
</Html>

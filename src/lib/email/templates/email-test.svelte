<script lang="ts">
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import EmailButton from '../components/email-button.svelte';
	import EmailHeading from '../components/email-heading.svelte';
	import Email from '../components/email.svelte';

	let { lang }: { lang: AvailableLanguageTag } = $props();
</script>

<Email>
	<EmailHeading level="1">Test heading</EmailHeading>
	<EmailButton href="/login" hreflang={lang}>Hello</EmailButton>
</Email>

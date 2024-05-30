<script lang="ts">
	import * as m from '$i18n/messages';
	import EmailButton from '../components/email-button.svelte';
	import EmailHeading from '../components/email-heading.svelte';
	import EmailParagraph from '../components/email-paragraph.svelte';
	import EmailSeparator from '../components/email-separator.svelte';
	import Email from '../components/email.svelte';

	let { token }: { token: string } = $props();
</script>

<Email>
	<EmailHeading level="1">
		{m.email_reset_password_title()}
	</EmailHeading>
	<EmailParagraph>
		{m.email_reset_password_body()}
	</EmailParagraph>
	<EmailButton href="/reset-password/{token}">
		{m.email_reset_password_button()}
	</EmailButton>
	<EmailSeparator />
	<EmailParagraph>
		{m.email_reset_password_note()}
	</EmailParagraph>
</Email>

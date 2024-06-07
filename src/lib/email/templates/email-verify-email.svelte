<script lang="ts">
	import * as m from '$i18n/messages';
	import EmailButton from '../components/email-button.svelte';
	import EmailHeading from '../components/email-heading.svelte';
	import EmailParagraph from '../components/email-paragraph.svelte';
	import EmailPin from '../components/email-pin.svelte';
	import EmailSeparator from '../components/email-separator.svelte';
	import Email from '../components/email.svelte';

	let { code }: { code: string } = $props();
</script>

<Email>
	<EmailHeading level="1">
		{m.email_verify_email_title()}
	</EmailHeading>
	<EmailParagraph>
		{m.email_verify_email_code()}
	</EmailParagraph>
	<EmailPin>
		{code}
	</EmailPin>
	<EmailParagraph>
		{m.email_verify_email_continue()}
	</EmailParagraph>
	<EmailButton variant="cta" href="/verify-email">
		{m.email_verify_email_button()}
	</EmailButton>
	<EmailSeparator />
	<EmailParagraph>
		{m.email_verify_email_note()}
	</EmailParagraph>
</Email>

<script lang="ts">
	import * as m from '$i18n/messages';
	import { USER_EMAIL_VERIFICATION_CODE_LENGTH } from '$lib/db/constants';
	import { MailWarning } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { enhance, form, errors } = superForm(data.form);
</script>

<form use:enhance method="POST">
	<h1>
		{m.verify_email_title()}
	</h1>
	<p>{m.verify_email_body()}</p>
	<fieldset>
		{#each { length: USER_EMAIL_VERIFICATION_CODE_LENGTH } as _, i}
			<input class="input center" type="text" />
		{/each}
	</fieldset>
	<button class="button button-cta" type="submit">
		{m.auth_verify_email()}
	</button>
	<hr />
	<p>{m.verify_email_not_received()}</p>
	<button class="button" type="submit" formaction="">
		<MailWarning />{m.verify_email_resend()}
	</button>
</form>

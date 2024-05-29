<script lang="ts">
	import * as m from '$i18n/messages';
	import { EMAIL_VERIFICATION_CODE_LENGTH } from '$lib/auth/constants';
	import { superForm } from '$lib/crud/validation/forms/super-form.js';
	import { createPinInput, melt } from '@melt-ui/svelte';
	import { MailWarning } from 'lucide-svelte';

	export let data;

	const {
		form,
		enhance,
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.form);

	const {
		elements: { root, input },
		states: { value },
	} = createPinInput({
		onValueChange({ next }) {
			form.update((v) => ({ ...v, code: next.join('') }));
			return next;
		},
	});

	$: value.set($form.code.split(''));
</script>

<form use:enhance method="POST">
	<h1>
		{m.verify_email_title()}
	</h1>
	<p>{m.verify_email_body()}</p>
	<fieldset class="pin" use:melt={$root}>
		{#each { length: EMAIL_VERIFICATION_CODE_LENGTH } as _}
			<input class="input center" type="text" use:melt={$input()} />
		{/each}
	</fieldset>
	<button class="button cta" type="submit" formaction="">
		{m.auth_verify_email()}
	</button>
	<hr />
	<p>{m.verify_email_not_received()}</p>
	<button class="button" type="submit" formaction="">
		<MailWarning class="button-icon" />{m.verify_email_resend()}
	</button>
</form>

<style>
	form {
		align-self: center;
		gap: 1rem;
		max-width: var(--width-sm);
		padding: 1rem;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		flex-direction: column;
	}

	.pin {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		align-self: center;

		.input {
			width: 1ch;
			flex: none;
		}
	}
</style>

<script lang="ts">
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { LogIn, Send, UserPlus2 } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { data } = $props();

	const { form, enhance, constraints, errors, message, submitter } = extendedSuperForm(data.form);

	let buttonRef = $state<HTMLButtonElement>();
</script>

<form method="POST" use:enhance autocomplete="off" class="gap-gap flex flex-col">
	<h1 class="mb-gap text-xl font-semibold">
		{m.auth_reset_password_title()}
	</h1>
	<Field>
		{#snippet label()}
			{m.email()}
		{/snippet}
		<input
			in:fly={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</Field>
	<button
		in:fly={{ y: -6, delay: 75 }}
		class="button button-cta"
		type="submit"
		bind:this={buttonRef}
	>
		<IconSpinner icon={Send} busy={$submitter === buttonRef} />
		{m.reset()}
	</button>
</form>
<nav class="gap-input-group-gap flex flex-row flex-wrap justify-between text-sm">
	<a class="button button-ghost" {...linkAttributes('/login')}>
		<LogIn />
		{m.auth_login_prompt()}
	</a>
	<a class="button button-ghost" {...linkAttributes('/signup')}>
		<UserPlus2 />
		{m.auth_signup_prompt()}
	</a>
</nav>

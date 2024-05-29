<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { LogIn, Send, UserPlus2 } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	let { data } = $props();

	const { form, enhance, constraints, errors, message } = superForm(data.form);
</script>

<form method="POST" use:enhance autocomplete="off" class="gap-gutter flex flex-col">
	<h1 class="pb-gutter text-xl font-bold">
		{m.auth_reset_password_title()}
	</h1>
	<label class="field">
		<span class="field-label" in:fly={{ y: 6 }}>
			{m.email()}
		</span>
		<input
			in:fly={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<button in:fly={{ y: -6, delay: 75 }} class="button button-cta" type="submit">
		<Send />
		{m.reset()}
	</button>
</form>
<nav class="gap-menu-gutter flex flex-row flex-wrap justify-between text-sm">
	<a class="button button-link" {...linkAttributes('/login')}>
		<LogIn />
		{m.auth_login_prompt()}
	</a>
	<a class="button button-link" {...linkAttributes('/signup')}>
		<UserPlus2 />
		{m.auth_signup_prompt()}
	</a>
</nav>

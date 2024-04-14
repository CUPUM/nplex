<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { HelpCircle, LogIn, UserPlus2 } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const STAGGER = 75;

	export let data;

	const { form, enhance, constraints, errors, delayed, submitting } = superForm(data.form, {
		taintedMessage: null,
	});
</script>

<form method="POST" use:enhance>
	<h1 class="h4">
		<LangKey>{m.signup_create_account()}</LangKey>
	</h1>
	<label class="label-group">
		<span class="label" in:fly={{ y: 6 }}>
			<LangKey>{m.email()}</LangKey>
		</span>
		<input
			in:fly={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			placeholder="{$langKey(m.email().toLowerCase())}@..."
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<label class="label-group">
		<span class="label" in:fly={{ y: 6, delay: STAGGER }}>
			<LangKey>{m.password()}</LangKey>
		</span>
		<input
			in:fly={{ y: -6, delay: STAGGER }}
			class="input"
			type="password"
			name="password"
			aria-invalid={$errors.password ? true : undefined}
			bind:value={$form.password}
			{...$constraints.password}
		/>
	</label>
	<label class="label-group">
		<span class="label" in:fly={{ y: 6, delay: 2 * STAGGER }}>
			<LangKey>{m.confirm_password()}</LangKey>
		</span>
		<input
			in:fly={{ y: -6, delay: 2 * STAGGER }}
			class="input"
			type="password"
			name="confirmPassword"
			aria-invalid={$errors.confirmPassword ? true : undefined}
			bind:value={$form.confirmPassword}
			{...$constraints.confirmPassword}
		/>
	</label>
	<button in:fly={{ y: -6, delay: 3 * STAGGER }} class="button cta center" type="submit" use:ripple>
		<UserPlus2 class="button-icon" />
		<LangKey>{m.signup()}</LangKey>
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link center" {...$link('/login')}>
		<LogIn class="button-icon" />
		<LangKey>{m.auth_login_prompt()}</LangKey>
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link center" {...$link('/reset-password')}>
		<HelpCircle class="button-icon" />
		<LangKey>{m.auth_forgot_password_prompt()}</LangKey>
	</a>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		flex: 1;
		gap: 1rem;

		h1 {
			text-align: center;
		}
	}

	.formcontent {
		padding: 2.25rem;
	}

	.links {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		font-size: var(--size-sm);
	}
</style>

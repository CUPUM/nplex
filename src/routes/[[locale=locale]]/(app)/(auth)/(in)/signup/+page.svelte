<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { HelpCircle, LogIn, UserPlus2 } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const STAGGER = 75;

	const t = createTranslations({
		fr: {
			title: 'Créez-vous un compte',
			email: 'Courriel',
			password: 'Mot de passe',
			confirmPassword: 'Confirmez le mot de passe',
			button: 'M’inscrire',
			login: 'J’ai déjà un compte',
			forgot: 'J’ai oublié mon mot de passe',
		},
		en: {
			title: 'Create an account',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Confirm password',
			button: 'Signup',
			login: 'I already have an account',
			forgot: 'I forgot my password',
		},
	});

	export let data;

	const { form, enhance, constraints, errors, delayed, submitting } = superForm(data.form, {
		taintedMessage: null,
	});
</script>

<form method="POST" use:enhance>
	<h1 class="heading lg center">{$t.title}</h1>
	<label class="labeled-group">
		<span class="label" in:fly={{ y: 6 }}>{$t.email}</span>
		<input
			in:fly={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			placeholder="{$t.email.toLowerCase()}@..."
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<label class="labeled-group">
		<span class="label" in:fly={{ y: 6, delay: STAGGER }}>{$t.password}</span>
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
	<label class="labeled-group">
		<span class="label" in:fly={{ y: 6, delay: 2 * STAGGER }}>{$t.confirmPassword}</span>
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
		{$t.button}
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link" {...$link('/login')}>
		<LogIn class="button-icon" />
		{$t.login}
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link" {...$link('/reset-password')}>
		<HelpCircle class="button-icon" />
		{$t.forgot}
	</a>
</div>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		flex: 1;
		gap: 1rem;
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

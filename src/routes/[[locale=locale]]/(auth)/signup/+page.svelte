<script lang="ts">
	import { SOCIAL_PROVIDERS_ARR } from '$lib/auth/constants.js';
	import { SOCIAL_PROVIDERS_DETAILS } from '$lib/auth/socials.js';
	import { i18nlink } from '$lib/i18n/link.js';
	import { createTranslations } from '$lib/i18n/translate';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			title: 'Créer un compte',
			email: 'Courriel',
			password: 'Mot de passe',
			confirmPassword: 'Confirmez le mot de passe',
			button: 'M’inscrire!',
			login: 'J’ai déjà un compte',
			forgot: 'J’ai oublié mon mot de passe',
		},
		en: {
			title: 'Create an account',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Confirm password',
			button: 'Signup!',
			login: 'I already have an account',
			forgot: 'I forgot my password',
		},
	});

	export let data;

	const { form, enhance, constraints, errors } = superForm(data.form);
</script>

<form action="?/email" use:enhance method="POST">
	<h1>{$t.title}</h1>

	<fieldset>
		<label>
			{$t.email}
			<input
				type="text"
				name="email"
				aria-invalid={$errors.email ? true : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			/>
		</label>
	</fieldset>

	<fieldset>
		<label>
			{$t.password}
			<input
				type="password"
				name="password"
				aria-invalid={$errors.password ? true : undefined}
				bind:value={$form.password}
				{...$constraints.password}
			/>
		</label>
		<label>
			{$t.confirmPassword}
			<input
				type="password"
				name="confirmPassword"
				aria-invalid={$errors.confirmPassword ? true : undefined}
				bind:value={$form.confirmPassword}
				{...$constraints.confirmPassword}
			/>
		</label>
	</fieldset>

	<button type="submit">{$t.button}</button>

	<fieldset>
		{#each SOCIAL_PROVIDERS_ARR as provider}
			<button type="submit">
				{SOCIAL_PROVIDERS_DETAILS[provider].name}
				<svelte:component this={SOCIAL_PROVIDERS_DETAILS[provider].icon} />
			</button>
		{/each}
	</fieldset>

	<a {...$i18nlink('/login')}>{$t.login}</a>
	<a {...$i18nlink('/reset-password')}>{$t.forgot}</a>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 4rem;
	}
</style>

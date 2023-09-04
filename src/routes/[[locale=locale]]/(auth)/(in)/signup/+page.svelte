<script lang="ts">
	import { createLoading } from '$lib/actions/loading.js';
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

	const { form, enhance, constraints, errors, delayed } = superForm(data.form, {
		taintedMessage: null,
	});

	const {
		state: loadingState,
		element: loadingElement,
		action: loadingAction,
	} = createLoading({ state: delayed });
</script>

<form use:enhance method="POST">
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
	<button
		class="button"
		type="submit"
		{...$loadingElement}
		disabled={$loadingState}
		use:loadingAction
	>
		{$t.button}
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="link" {...$i18nlink('/login')}>{$t.login}</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="link" {...$i18nlink('/reset-password')}>{$t.forgot}</a>
</div>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.formcontent {
		padding: var(--space-2xl);
	}

	.links {
		display: flex;
		flex-direction: column;
		font-size: var(--size-sm);
	}
</style>

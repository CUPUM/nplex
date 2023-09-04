<script lang="ts">
	import { createLoading } from '$lib/actions/loading.js';
	import { i18nlink } from '$lib/i18n/link.js';
	import { createTranslations } from '$lib/i18n/translate.js';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			title: 'Connectez-vous à votre compte',
			email: 'Courriel',
			password: 'Mot de passe',
			button: 'Me connecter',
			signup: 'Je n’ai pas de compte',
			forgot: 'J’ai oublié mon mot de passe',
		},
		en: {
			title: 'Login to your account',
			email: 'Email',
			password: 'Password',
			button: 'Log me in',
			signup: 'I don’t have an account',
			forgot: 'I forgot my password',
		},
	});

	export let data;

	const { form, enhance, constraints, errors, delayed } = superForm(data.form, {
		taintedMessage: null,
	});

	const { action: loadingAction, element: loadingElement, state: loadingState } = createLoading();

	$: $loadingState = $delayed;
</script>

<form method="POST" use:enhance>
	<h1>{$t.title}</h1>
	<fieldset>
		<label>
			{$t.email}
			<input
				class="input"
				type="email"
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
				class="input"
				type="password"
				name="password"
				aria-invalid={$errors.password ? true : undefined}
				bind:value={$form.password}
				{...$constraints.password}
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
	<a class="link" {...$i18nlink('/signup')}>{$t.signup}</a>
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
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		font-size: var(--size-sm);
	}
</style>

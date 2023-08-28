<script lang="ts">
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
		},
		en: {
			title: 'Login to your account',
			email: 'Email',
			password: 'Password',
			button: 'Log me in',
			signup: 'I don’t have an account',
		},
	});

	export let data;
	const { form, enhance, constraints, errors } = superForm(data.form);
</script>

<form method="POST">
	<h1>{$t.title}</h1>

	<fieldset>
		<label>
			{$t.email}
			<input
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
				type="password"
				name="password"
				aria-invalid={$errors.password ? true : undefined}
				bind:value={$form.password}
				{...$constraints.password}
			/>
		</label>
	</fieldset>

	<button type="submit">{$t.button}</button>

	<a {...$i18nlink('/signup')}>{$t.signup}</a>
</form>

<style lang="scss">
	button {
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>

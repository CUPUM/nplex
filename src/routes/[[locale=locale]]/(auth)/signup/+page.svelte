<script lang="ts">
	import { i18nlink } from '$lib/i18n/link.js';
	import { createTranslations } from '$lib/i18n/translate';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			title: 'Créer un compte',
			name: 'Nom d’uilisateur ou courriel',
			password: 'Mot de passe',
			button: 'M’inscrire!',
			login: 'J’ai déjà un compte',
		},
		en: {
			title: 'Signup',
			name: 'Username or email',
			password: 'Password',
			button: 'Sign me up!',
			login: 'I already have an account',
		},
	});

	export let data;
	const { form, enhance, constraints, errors, fields } = superForm(data.form);
</script>

<form action="?/emailPassword" use:enhance method="POST">
	<h1>{$t.title}</h1>

	<fieldset>
		<label>
			{$t.name}
			<input
				type="text"
				name="username"
				aria-invalid={$errors.username ? true : undefined}
				bind:value={$form.username}
				{...$constraints.username}
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

	<button type="submit">
		{$t.button}
	</button>

	<a {...$i18nlink('/login')}>{$t.login}</a>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 4rem;
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			title: 'Réinitialisez votre mot de passe',
			name: 'Nom d’uilisateur ou courriel',
			button: 'Réinitialiser',
		},
		en: {
			title: 'Reset your password',
			name: 'Username or email',
			button: 'Reset',
		},
	});
</script>

<form use:enhance method="POST">
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

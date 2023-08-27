<script lang="ts">
	import { enhance } from '$app/forms';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			title: 'Créer un compte',
			name: 'Nom d’uilisateur ou courriel',
			password: 'Mot de passe',
			button: 'M’inscrire!',
		},
		en: {
			title: 'Signup',
			name: 'Username or email',
			password: 'Password',
			button: 'Sign me up!',
		},
	});
</script>

<form action="?/emailPassword" use:enhance method="POST">
	<h1>{$t.title}</h1>
	<fieldset>
		<label>
			{$t.name}
			<input type="text" />
		</label>
	</fieldset>
	<fieldset>
		<label>
			{$t.password}
			<input type="password" />
		</label>
	</fieldset>
	<button type="submit">
		{$t.button}
	</button>
</form>

<style lang="scss">
</style>

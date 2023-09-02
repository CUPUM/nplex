<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';
	import { superForm } from 'sveltekit-superforms/client';

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

	export let data;

	const { form, enhance, constraints, errors, message } = superForm(data.form);

	$: console.log($message);
</script>

<form use:enhance method="POST">
	<h1>{$t.title}</h1>

	<fieldset>
		<label>
			{$t.name}
			<input
				type="text"
				name="email"
				aria-invalid={$errors.email ? true : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			/>
		</label>
	</fieldset>

	<button type="submit">
		{$t.button}
	</button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 4rem;
	}
</style>

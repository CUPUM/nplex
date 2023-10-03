<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';
	import { Send } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			title: 'Réinitialisez votre mot de passe',
			name: 'Courriel',
			button: 'Réinitialiser',
		},
		en: {
			title: 'Reset your password',
			name: 'Email',
			button: 'Reset',
		},
	});

	export let data;

	const { form, enhance, constraints, errors, message } = superForm(data.form);
</script>

<form use:enhance method="POST">
	<h1 class="heading lg center">{$t.title}</h1>
	<label class="labeled-input">
		<span class="input-label" in:fly={{ y: 6 }}>
			{$t.name}
		</span>
		<input
			in:fly={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<button in:fly={{ y: -6, delay: 75 }} class="button cta center" type="submit">
		<Send class="button-icon" />
		{$t.button}
	</button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		align-self: center;
		justify-content: center;
		flex: 1;
		gap: 1rem;
		max-width: var(--width-center);
	}
</style>

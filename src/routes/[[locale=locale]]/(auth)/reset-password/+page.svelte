<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';
	import { Send } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
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
	<label>
		<span in:fly={{ y: 6 }}>
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
		gap: 2rem;
		max-width: var(--width-center);
	}

	h1 {
		font-size: var(--size-3xl);
		font-weight: 550;
		line-height: 1.15;
		text-align: center;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		text-indent: 0.75em;

		&:focus-within {
			span {
				opacity: 1;
			}
		}

		span {
			font-size: var(--size-xs);
			opacity: 0.8;
		}
	}
</style>

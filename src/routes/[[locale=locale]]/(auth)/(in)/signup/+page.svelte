<script lang="ts">
	import { createLoading } from '$lib/actions/loading';
	import { ripple } from '$lib/actions/ripple';
	import { i18nlink } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { HelpCircle, LogIn, UserPlus2 } from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			title: 'Créez-vous un compte',
			email: 'Courriel',
			password: 'Mot de passe',
			confirmPassword: 'Confirmez le mot de passe',
			button: 'M’inscrire',
			login: 'J’ai déjà un compte',
			forgot: 'J’ai oublié mon mot de passe',
		},
		en: {
			title: 'Create an account',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Confirm password',
			button: 'Signup',
			login: 'I already have an account',
			forgot: 'I forgot my password',
		},
	});

	export let data;

	const { form, enhance, constraints, errors, delayed, submitting } = superForm(data.form, {
		taintedMessage: null,
	});

	const {
		state: loadingState,
		element: loadingElement,
		action: loadingAction,
	} = createLoading({ state: delayed });
</script>

<form method="POST" use:enhance>
	<h1>{$t.title}</h1>
	<label>
		<span in:fly={{ y: 6 }}>{$t.email}</span>
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
	<fieldset class="pw">
		<label>
			<span in:fly={{ y: 6 }}>{$t.password}</span>
			<input
				in:fly={{ y: -6 }}
				class="input"
				type="password"
				name="password"
				aria-invalid={$errors.password ? true : undefined}
				bind:value={$form.password}
				{...$constraints.password}
			/>
		</label>
		<label>
			<span in:fly={{ y: 6 }}>{$t.confirmPassword}</span>
			<input
				in:fly={{ y: -6 }}
				class="input"
				type="password"
				name="confirmPassword"
				aria-invalid={$errors.confirmPassword ? true : undefined}
				bind:value={$form.confirmPassword}
				{...$constraints.confirmPassword}
			/>
		</label>
	</fieldset>
	<button
		in:scale={{ start: 0.9 }}
		class="button cta"
		type="submit"
		{...$loadingElement}
		use:loadingAction
		use:ripple
	>
		<UserPlus2 class="button-icon" />
		{$t.button}
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="link" {...$i18nlink('/login')}>
		<LogIn class="link-icon" />
		{$t.login}
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="link" {...$i18nlink('/reset-password')}>
		<HelpCircle class="link-icon" />
		{$t.forgot}
	</a>
</div>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		flex: 1;
		gap: 2rem;
	}

	h1 {
		font-size: var(--size-3xl);
		font-weight: 550;
		line-height: 1.15;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		text-indent: 0.5em;

		&:focus-within {
			span {
				opacity: 1;
			}
		}

		span {
			font-size: var(--size-xs);
			font-weight: 500;
			opacity: 0.8;
		}
	}

	.formcontent {
		padding: 2.25rem;
	}

	.links {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		font-size: var(--size-sm);
	}
</style>

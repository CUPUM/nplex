<script lang="ts">
	import { createLoading } from '$lib/actions/loading';
	import { ripple } from '$lib/actions/ripple';
	import { i18nlink } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { HelpCircle, LogIn, UserPlus2 } from 'lucide-svelte';
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

	const { form, enhance, constraints, errors, delayed, submitting } = superForm(data.form, {
		taintedMessage: null,
	});

	const {
		action: loadingAction,
		element: loadingElement,
		state: loadingState,
	} = createLoading({ state: delayed });
</script>

<form method="POST" use:enhance>
	<h1>{$t.title}</h1>
	<fieldset>
		<label>
			<span>{$t.email}</span>
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
			<span>{$t.password}</span>
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
	<button class="button cta" type="submit" {...$loadingElement} use:loadingAction use:ripple>
		<LogIn class="button-icon" />
		{$t.button}
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="link" {...$i18nlink('/signup')}>
		<UserPlus2 class="link-icon" />
		{$t.signup}
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

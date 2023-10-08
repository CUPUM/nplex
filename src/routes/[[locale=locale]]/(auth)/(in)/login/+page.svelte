<script lang="ts">
	import { createLoading } from '$lib/actions/loading';
	import { ripple } from '$lib/actions/ripple';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { Eye, EyeOff, HelpCircle, LogIn, UserPlus2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const STAGGER = 75;

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

	let showPassword = false;

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
	<h1 class="heading lg center">{$t.title}</h1>
	<label class="labeled-group">
		<span class="label" in:fly|global={{ y: 6 }}>{$t.email}</span>
		<input
			in:fly|global={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			placeholder="{$t.email.toLowerCase()}@..."
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<fieldset class="labeled-group">
		<legend class="label" in:fly|global={{ y: 6, delay: STAGGER }}>{$t.password}</legend>
		<div class="input-group">
			<input
				in:fly|global={{ y: -6, delay: STAGGER }}
				class="input"
				type={showPassword ? 'text' : 'password'}
				name="password"
				aria-invalid={$errors.password ? true : undefined}
				on:input={(e) => {
					if (e.target instanceof HTMLElement && 'value' in e.target) {
						$form.password = String(e.target.value);
					}
				}}
				value={$form.password}
				{...$constraints.password}
			/>
			<div class="input-peer">
				<button
					class="button square ghost"
					type="button"
					on:click={() => (showPassword = !showPassword)}
				>
					{#if showPassword}
						<div in:fly={{ x: -8 }}>
							<EyeOff class="button-icon" />
						</div>
					{:else}
						<div in:fly={{ x: 8 }}>
							<Eye class="button-icon" />
						</div>
					{/if}
				</button>
			</div>
		</div>
	</fieldset>
	<button
		in:fly|global={{ y: -6, delay: 2 * STAGGER }}
		class="button cta center"
		type="submit"
		{...$loadingElement}
		use:loadingAction
		use:ripple
	>
		<LogIn class="button-icon" />
		{$t.button}
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link" {...$link('/signup')} in:fade|global>
		<UserPlus2 class="button-icon" />
		{$t.signup}
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link" {...$link('/reset-password')} in:fade|global>
		<HelpCircle class="button-icon" />
		{$t.forgot}
	</a>
</div>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		flex: 1;
		gap: 1rem;
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

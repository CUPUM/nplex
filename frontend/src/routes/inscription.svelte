<script lang="ts" context="module">
	// module script here
</script>

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import SocialButton from '$components/primitives/SocialButton.svelte';
	import { authModal } from '$stores/auth';
	import { signIn, signUp } from '$utils/auth';
	import { providers } from '$utils/providers';
	import { expoIn, expoOut, linear } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';

	let providerNames = Object.keys(providers) as (keyof typeof providers)[];

	function close() {
		message = null;
		$authModal = false;
	}

	enum Action {
		SignUp = 'signup',
		SignIn = 'signin',
		Provider = 'provider',
	}

	let disabled = false;
	let currentAction = null;
	let signInError = false;
	let signUpError = false;
	let message = null;

	async function submit(e: SubmitEvent) {
		disabled = true;
		currentAction = (e.submitter as HTMLButtonElement).value;
		const data = new FormData(e.target as HTMLFormElement);
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		switch (currentAction) {
			case Action.SignIn:
				{
					const res = await signIn({ email, password });
					if (res.error) {
						signInError = true;
					} else {
						close();
					}
				}
				break;
			case Action.SignUp:
				{
					const res = await signUp({ email, password });
					if (res.error) {
						signUpError = true;
					} else {
						message = `Vérifiez votre adresse courriel (${res.user.email}) afin de confirmer la création de votre compte.`;
						setTimeout(() => (message = null), 5000);
					}
				}
				break;
			case Action.Provider:
				break;
		}
		currentAction = null;
		disabled = false;
	}
</script>

<div id="bg" out:fade={{ duration: 300, easing: linear }} />
<div id="outer">
	<form
		on:submit|preventDefault={submit}
		use:clickoutside
		on:clickoutside={close}
		in:scale={{ duration: 200, start: 0.95, easing: expoOut }}
		out:scale={{ duration: 150, start: 0.9, easing: expoIn }}
	>
		<fieldset>
			<Field placeholder="Courriel" placeholderIcon="email" name="email" type="email" />
			<Field placeholder="Mot de passe" placeholderIcon="asterisk" type="password" name="password" />
			<!-- {#if message}
				<Tooltip {message} />
			{/if} -->
			<Button
				type="submit"
				variant="cta"
				value={Action.SignIn}
				{disabled}
				display="block"
				contentAlign="center"
				loading={Action.SignIn === currentAction}>Connecter</Button
			>
			<Button
				type="submit"
				variant="ghost"
				value={Action.SignUp}
				{disabled}
				display="block"
				contentAlign="center"
				loading={Action.SignUp === currentAction}>Créer un compte</Button
			>
		</fieldset>
		<hr />
		<fieldset>
			{#each providerNames as provider}
				<SocialButton {provider}>
					Connecter avec {providers[provider].title}
				</SocialButton>
			{/each}
		</fieldset>
	</form>
</div>

<style lang="postcss">
	#bg {
		z-index: 1000;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(var(--rgb-light-500), 1);
	}

	#outer {
		z-index: 1000;
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: transparent;
	}

	form {
		background-color: var(--color-light-100);
		padding: 2rem;
		border-radius: 2rem;
		border: 1px solid var(--color-light-700);
		box-shadow: 0 1rem 5.5rem -4rem var(--color-primary-900);
	}

	fieldset {
		border: none;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	hr {
		width: 100%;
		height: 1px;
		border: none;
		background-color: var(--color-light-700);
		margin-block: 1em;
	}
</style>

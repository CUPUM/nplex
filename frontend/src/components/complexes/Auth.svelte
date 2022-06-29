<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import ProviderLogo from '$components/primitives/ProviderLogo.svelte';
	import { authMessage, authModal } from '$stores/auth';
	import { signIn, signUp } from '$utils/auth';
	import { providers } from '$utils/providers';
	import { expoIn, expoOut, linear } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let providerNames = Object.keys(providers) as (keyof typeof providers)[];

	function close() {
		authMessage.set(null);
		authModal.close();
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
						// message = `Vérifiez votre adresse courriel (${res.user.email}) afin de confirmer la création de votre compte.`;
						// setTimeout(() => (message = null), 5000);
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

<div id="bg" transition:fade={{ duration: 300, easing: linear }} />
<form
	autocomplete="off"
	on:submit|preventDefault={submit}
	use:clickoutside
	on:clickoutside={close}
	in:fly={{ duration: 350, x: 100, easing: expoOut }}
	out:fly={{ duration: 250, x: 100, easing: expoIn }}
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
			loading={Action.SignIn === currentAction}>Créer un compte</Button
		>
		<Button
			type="submit"
			variant="ghost"
			value={Action.SignUp}
			{disabled}
			display="block"
			contentAlign="center"
			loading={Action.SignUp === currentAction}>Vous avez déjà un compte? Connectez-vous</Button
		>
	</fieldset>
	<hr />
	<fieldset>
		{#each providerNames as name}
			<Button contentAlign="center">
				<ProviderLogo {name} slot="icon" size="1.5em" />
				Connecter avec {providers[name].title}
			</Button>
		{/each}
	</fieldset>
</form>

<style lang="scss">
	#bg {
		z-index: 1000;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(var(--rgb-primary-500), 0.9);
		/* backdrop-filter: blur(12px); */
	}

	form {
		z-index: 1000;
		position: fixed;
		right: 0;
		top: 1rem;
		bottom: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 50%;
		min-width: 600px;
		max-width: 100%;
		background-color: white;
		padding: 2rem;
		border-radius: 2rem 0 0 2rem;
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

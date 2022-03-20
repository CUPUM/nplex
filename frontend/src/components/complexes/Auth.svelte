<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import FieldSet from '$components/primitives/FieldSet.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { authModal } from '$stores/auth';
	import { signIn, signUp } from '$utils/auth';
	import type { ApiError } from '@supabase/supabase-js';
	import { fade, scale } from 'svelte/transition';

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

<div id="bg" transition:fade={{ duration: 200 }}>
	<form
		on:submit|preventDefault={submit}
		use:clickoutside
		on:clickoutside={close}
		transition:scale={{ duration: 150, start: 0.9 }}
	>
		<fieldset>
			<div id="fields">
				<Field placeholder="Courriel" name="email" type="email" autocomplete="username" />
				<Field placeholder="Mot de passe" type="password" name="password" autocomplete="current-password" />
				{#if message}
					<Tooltip {message} />
				{/if}
			</div>
			<div id="submits">
				<Button
					type="submit"
					style="flex: 1;"
					variant="cta"
					value={Action.SignIn}
					{disabled}
					loading={Action.SignIn === currentAction}>Se connecter</Button
				>
				<Button
					type="submit"
					style="flex: 1;"
					variant="ghost"
					value={Action.SignUp}
					{disabled}
					loading={Action.SignUp === currentAction}>Créer un compte</Button
				>
			</div>
		</fieldset>
		<p>ou utiliser</p>
		<fieldset>
			<button>Linkedin</button>
			<button>Facebook</button>
			<button>Google</button>
			<button>Twitter</button>
		</fieldset>
	</form>
</div>

<style lang="postcss">
	#bg {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(var(--rgb-light-500), 0.8);
	}

	form {
		background-color: var(--color-light-100);
		padding: 2rem;
		border-radius: 2rem;
		border: none;
	}

	fieldset {
		border: none;
	}

	#fields {
		display: flex;
		flex-direction: column;
	}

	#submits {
		display: flex;
		flex-direction: row;
	}

	#providers {
	}
</style>

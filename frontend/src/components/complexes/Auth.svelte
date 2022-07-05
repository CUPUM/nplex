<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import ProviderLogo from '$components/primitives/ProviderLogo.svelte';
	import { authModal } from '$stores/auth';
	import { messages } from '$stores/messages';
	import { slip } from '$transitions/slip';
	import { signIn, signUp } from '$utils/auth';
	import { providers } from '$utils/providers';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fly, scale, slide } from 'svelte/transition';

	let providerNames = Object.keys(providers) as (keyof typeof providers)[];
	let signupForm = false;
	let email: string;
	let password: string;
	let firstname: string;
	let middlename: string;
	let lastname: string;
	let currentAction = null;
	let signInError = false;
	let signUpError = false;

	function close() {
		authModal.close();
	}

	enum Action {
		SignUp = 'signup',
		SignIn = 'signin',
		Provider = 'provider',
	}

	async function submit(e: SubmitEvent) {
		currentAction = (e.submitter as HTMLButtonElement).value;
		// const data = new FormData(e.target as HTMLFormElement);
		// const email = data.get('email') as string;
		// const password = data.get('password') as string;
		switch (currentAction) {
			case Action.SignIn:
				{
					const res = await signIn({ email, password });
					if (res.error) {
						signInError = true;
						messages.dispatch({ text: res.error.message, type: 'error' });
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
						messages.dispatch({ text: res.error.message, type: 'error' });
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
	}
</script>

<div class="bg" transition:slide={{ duration: 250, easing: expoOut }} />
<div
	class="wrapper"
	use:clickoutside
	on:clickoutside={close}
	in:fly={{ duration: 350, x: 100, easing: expoOut }}
	out:fly={{ duration: 250, x: 100, easing: expoIn }}
>
	<a class="logo" href="/">
		<Logo color="currentColor" />
	</a>
	<form autocomplete="off" on:submit|preventDefault={submit}>
		<fieldset in:scale={{ start: 0.94, opacity: 0, easing: expoOut, delay: 250 }}>
			<label for="">
				Courriel
				<Field
					bind:value={email}
					placeholder="Courriel"
					placeholderIcon="email"
					name="new-email"
					type="email"
				/>
			</label>
			<Field
				bind:value={password}
				placeholder="Mot de passe"
				placeholderIcon="asterisk"
				name="new-password"
				type="password"
			/>
			{#if signupForm}
				<div class="signup-fields" transition:slide={{}}>
					<Field />
				</div>
			{/if}
			<div class="submit-buttons">
				<Button
					type={signupForm ? 'submit' : 'button'}
					variant="cta"
					value={Action.SignUp}
					disabled={!Boolean(email)}
					display="block"
					contentAlign="center"
					loading={Action.SignIn === currentAction}
					on:click={() => (signupForm = true)}
				>
					<Icon name="plus" slot="icon" />
					Créer un compte
				</Button>
				<Button
					type="submit"
					variant="ghost"
					value={Action.SignIn}
					disabled={!Boolean(email) || !Boolean(password)}
					display="block"
					contentAlign="center"
					iconPosition="after"
					loading={Action.SignUp === currentAction}
				>
					Vous avez déjà un compte? Connectez-vous
					<svelte:fragment slot="icon">
						{#if Boolean(email) && Boolean(password)}
							<div transition:slip={{ width: true, overflow: 'hidden' }}>
								<Icon slot="icon" name="arrow-right" />
							</div>
						{/if}
					</svelte:fragment>
				</Button>
			</div>
		</fieldset>
		<hr />
		<fieldset in:scale={{ start: 0.94, opacity: 0, easing: expoOut, delay: 350 }} class="provider-buttons">
			{#each providerNames as name, i}
				<Button contentAlign="center" variant="secondary">
					<ProviderLogo {name} slot="icon" size="1.5em" />
					Se connecter avec {providers[name].title}
				</Button>
			{/each}
		</fieldset>
	</form>
</div>

<style lang="scss">
	.bg {
		z-index: 1000;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(var(--rgb-light-100), 0.95);
		// backdrop-filter: blur(8px);
	}

	.wrapper {
		z-index: 1000;
		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 600px;
		background-color: white;
		padding: 2rem 4rem;
		border-radius: 3rem 0 0 3rem;
	}

	.logo {
		cursor: pointer;
		text-decoration: none;
		color: var(--color-primary-500);
		width: 50%;
		max-width: 275px;
		margin: 0 auto;
		padding: 4rem 2rem;
		transition: all 0.15s ease-out;

		&:hover {
			transform: scale(0.96);
			color: var(--color-primary-900);
		}
	}

	form {
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
	}

	fieldset {
		width: 100%;
		border: none;
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding-inline: 0;
	}

	.submit-buttons {
		// width: 50%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	hr {
		width: 100%;
		height: 1px;
		background-color: var(--rgb-dark-100);
		opacity: 0.1;
		margin-block: 3rem 4rem;
	}
</style>

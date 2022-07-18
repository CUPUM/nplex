<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import { authModal } from '$stores/auth';
	import { messages } from '$stores/messages';
	import { signIn, signUp } from '$utils/auth';
	import { providers } from '$utils/providers';
	import { sizes } from '$utils/sizes';
	import { expoOut } from 'svelte/easing';
	import { fade, fly, scale, slide } from 'svelte/transition';

	let providerNames = Object.keys(providers) as (keyof typeof providers)[];
	let signupForm = false;
	let email: string;
	let password: string;
	let firstname: string;
	let middlename: string;
	let lastname: string;
	let signInError = false;
	let signUpError = false;
	let currentAction = null;
	let revealPassword = false;

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
					if (!res.error) {
						close();
						break;
					}
					signInError = true;
					messages.dispatch({ text: res.error.message, type: 'error' });
				}
				break;
			case Action.SignUp:
				{
					// Let's first attemp to sign in using the provided credentials.
					const signinRes = await signIn({ email, password });
					// If successful, complete the process.
					if (!signinRes.error && signinRes.user) {
						close();
						break;
					}
					// If not working, expand signup form.
					if (!signupForm) {
						signupForm = true;
						break;
					}
					const signupRes = await signUp({ email, password, firstname, middlename, lastname });
					if (signupRes.error) {
						signUpError = true;
						messages.dispatch({ text: signupRes.error.message, type: 'error' });
					} else if ((signupRes as any)?.user) {
						messages.dispatch({
							text: `Vérifiez votre adresse courriel (<i>${
								(signupRes as any)?.user?.email
							}</i>) afin de compléter la création de votre compte.`,
							type: 'success',
						});
					}
				}
				break;
			case Action.Provider:
				break;
		}
		currentAction = null;
	}
</script>

<div class="bg" transition:fade={{ duration: 350, easing: expoOut }} />
<div
	class="wrapper"
	use:clickoutside
	on:clickoutside={close}
	in:scale={{ duration: 350, start: 0.8, easing: expoOut }}
	out:fly={{ duration: 250, x: 50, easing: expoOut }}
>
	<a class="logo" href="/">
		<Logo color="currentColor" />
	</a>
	<form autocomplete="off" on:submit|preventDefault={submit} in:scale={{ start: 0.95, delay: 150 }}>
		<Field
			bind:value={email}
			placeholder="Courriel"
			icon="letter"
			showIcon="always"
			name="email"
			type="email"
			required>Test</Field
		>
		<Field
			bind:value={password}
			placeholder="Mot de passe"
			icon="asterisk"
			showIcon="always"
			name="password"
			type={revealPassword ? 'text' : 'password'}
		>
			<Button
				slot="right"
				variant="ghost"
				on:click={() => (revealPassword = !revealPassword)}
				icon={revealPassword ? 'eye-cross' : 'eye-open'}
			/>
		</Field>
		{#if signupForm}
			<div class="signup-fields" transition:slide={{}}>
				<div>
					<Field size={sizes.small} bind:value={firstname} name="firstname" placeholder="Prénom" />
				</div>
				<div>
					<Field size={sizes.small} bind:value={middlename} name="middlename" placeholder="Surnom" />
				</div>
				<div class="full-cols">
					<Field size={sizes.small} bind:value={lastname} name="lastname" placeholder="Nom de famille" />
				</div>
			</div>
		{/if}
		<div class="submit-buttons" transition:scale={{ start: 0.95, delay: 300 }}>
			<Button
				type="submit"
				variant="cta"
				value={Action.SignUp}
				disabled={!Boolean(email)}
				display="block"
				contentAlign="center"
				loading={currentAction === Action.SignUp}
			>
				Créer un compte
			</Button>
			<Button
				type="submit"
				variant="ghost"
				value={Action.SignIn}
				disabled={!Boolean(email) || !Boolean(password)}
				display="block"
				contentAlign="center"
				icon={Boolean(email) && Boolean(password) ? 'arrow-right' : undefined}
				iconPosition="trailing"
				loading={currentAction === Action.SignIn}
			>
				Vous avez déjà un compte? Connectez-vous
			</Button>
		</div>
	</form>
	<hr />
	<form in:scale={{ start: 0.94, opacity: 0, easing: expoOut, delay: 450 }} class="provider-buttons">
		{#each providerNames as name, i}
			<Button size={sizes.small} contentAlign="center" variant="secondary" provider={name}>
				Se connecter avec {providers[name].title}
			</Button>
		{/each}
	</form>
</div>

<style lang="scss">
	.bg {
		z-index: 1000;
		position: fixed;
		width: 100vw;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(var(--rgb-primary-500), 0.9);
		// backdrop-filter: blur(4px);
	}

	.wrapper {
		z-index: 1000;
		position: fixed;
		right: 1rem;
		top: 1rem;
		bottom: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		max-width: 500px;
		background-color: rgba(255, 255, 255, 0.95);
		// backdrop-filter: blur(12px);
		padding: 3rem;
		overflow-y: auto;
		border-radius: 2rem;
		transform-origin: top right;
	}

	.logo {
		cursor: pointer;
		text-decoration: none;
		color: var(--color-primary-500);
		width: 50%;
		max-width: 275px;
		margin: 0 auto;
		padding: 2rem;
		transition: all 0.15s ease-out;

		&:hover {
			transform: scale(0.98);
			color: var(--color-primary-900);
		}
	}

	form {
		position: relative;
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 1em;
		border: none;
		padding-inline: 0;
	}

	.signup-fields {
		width: 100%;
		position: relative;
		border: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1em;
		grid-template-columns: 2fr 1fr;
		justify-content: flex-start;
		align-items: flex-start;

		& > div {
			position: relative;
			display: flex;
			flex-direction: row;
		}

		& > .full-cols {
			grid-column: 1 / -1;
		}
	}

	.submit-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 1rem;
	}

	.icon-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	hr {
		width: 100%;
		height: 1px;
		background-color: var(--rgb-dark-100);
		opacity: 0.1;
		margin-block: 2rem 3rem;
	}
</style>

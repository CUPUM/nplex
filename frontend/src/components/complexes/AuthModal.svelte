<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import FieldPasswordToggleControl from '$components/primitives/FieldPasswordToggleControl.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import { authModal } from '$stores/auth';
	import { login, signup } from '$utils/database/auth';
	import { providers } from '$utils/values/providers';
	import { sizes } from '$utils/values/sizes';
	import { expoOut, linear } from 'svelte/easing';
	import { fade, fly, scale, slide } from 'svelte/transition';

	let email: string;
	let password: string;
	let firstname: string;
	let middlename: string;
	let lastname: string;
	let providerNames = Object.keys(providers) as (keyof typeof providers)[];
	let signupForm = false;
	let currentAction = null;

	enum Action {
		EmailSignUp = 'emailsignup',
		EmailSignIn = 'emailsignin',
		UseProvider = 'useprovider',
	}

	async function submit(e: SubmitEvent) {
		currentAction = (e.submitter as HTMLButtonElement).value;
		switch (currentAction) {
			case Action.EmailSignIn: {
				await login({ email, password });
				break;
			}
			case Action.EmailSignUp:
				if (!signupForm) {
					signupForm = true;
					break;
				}
				await signup({ email, password });
				break;
			case Action.UseProvider:
				break;
		}
		currentAction = null;
	}
</script>

<div class="bg" transition:fade={{ duration: 200, easing: linear }} />
<div
	class="wrapper"
	in:scale={{ start: 0.9, duration: 150, opacity: 0 }}
	out:fly={{ x: 20, duration: 150, opacity: 0 }}
	use:clickoutside
	on:clickoutside={() => authModal.close()}
>
	<a class="logo" href="/">
		<Logo color="currentColor" />
	</a>
	<form
		autocomplete="off"
		on:submit|preventDefault={submit}
		in:scale={{ start: 0.95, opacity: 0, delay: 100, duration: 150 }}
	>
		<Field
			bind:value={email}
			maxlength={32}
			placeholder="Courriel"
			icon="letter"
			showIcon="always"
			name="email"
			type="email"
		/>
		<Field
			bind:value={password}
			placeholder="Mot de passe"
			icon="lock-close"
			showIcon="always"
			name="password"
			type="password"
		>
			<FieldPasswordToggleControl slot="right" />
		</Field>
		{#if signupForm}
			<div class="signup-fields" transition:slide|local={{}}>
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
		<div class="submit-buttons">
			<Button
				type="submit"
				variant="cta"
				value={Action.EmailSignIn}
				disabled={!Boolean(email) || !Boolean(password)}
				display="block"
				contentAlign="center"
				loading={currentAction === Action.EmailSignIn}
			>
				Se connecter
			</Button>
			<Button
				type="submit"
				variant="ghost"
				value={Action.EmailSignUp}
				display="block"
				contentAlign="center"
				loading={currentAction === Action.EmailSignUp}
				icon={Boolean(email) && Boolean(password) ? 'arrow-right' : undefined}
				iconPosition="trailing"
			>
				Vous n'avez pas de compte? Inscrivez-vous
			</Button>
		</div>
	</form>
	<hr />
	<form in:scale={{ start: 0.94, opacity: 0, easing: expoOut, delay: 450 }} class="provider-buttons">
		{#each providerNames as name, i}
			<Button disabled size={sizes.small} contentAlign="center" variant="secondary" provider={name}>
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
		background-color: rgba(var(--rgb-light-900), 0.98);
	}

	.wrapper {
		z-index: 1000;
		position: fixed;
		right: 0rem;
		top: 0rem;
		bottom: 0rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		max-width: 500px;
		background-color: var(--color-light-100);
		padding: 3rem;
		overflow-y: auto;
		border-radius: 2rem 0 0 2rem;
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

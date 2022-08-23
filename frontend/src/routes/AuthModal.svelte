<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import FieldControlReset from '$components/primitives/FieldControlReset.svelte';
	import FieldControlTogglePassword from '$components/primitives/FieldControlTogglePassword.svelte';
	import FieldIcon from '$components/primitives/FieldIcon.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import ProviderLogo from '$components/primitives/ProviderLogo.svelte';
	import { authModal } from '$stores/authModal';
	import { messages } from '$stores/messages';
	import { transform } from '$transitions/transform';
	import { browserDbClient } from '$utils/database/database';
	import { patterns } from '$utils/input/patterns';
	import { providers } from '$utils/values/providers';
	import { sizes } from '$utils/values/sizes';
	import { expoIn, expoOut, linear } from 'svelte/easing';
	import { fade, scale, slide } from 'svelte/transition';

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
		try {
			switch (currentAction) {
				case Action.EmailSignIn: {
					const signin = await browserDbClient.auth.signInWithPassword({ email, password });
					if (signin.error) {
						signupForm = true;
						throw signin.error;
					}
					break;
				}
				case Action.EmailSignUp:
					if (!signupForm) {
						signupForm = true;
						break;
					}
					const signup = await browserDbClient.auth.signUp({ email, password });
					if (signup.error) throw signup.error;
					const updateProfile = await browserDbClient
						.from('users_profiles')
						.update({ firstname, middlename, lastname })
						.eq('user_id', signup.data.user.id)
						.single();
					if (updateProfile.error) throw updateProfile.error;
					break;
				case Action.UseProvider:
					// To do: get app approbation from desired providers.
					break;
			}
		} catch (error) {
			messages.dispatch({
				type: 'error',
				content: error.message,
			});
		}
		currentAction = null;
	}
</script>

<div class="bg" transition:fade={{ duration: 200, easing: linear }} />
<div class="wrap">
	<dialog
		in:transform={{
			rotateX: 20,
			rotateY: 30,
			translateZ: -100,
			translateX: 100,
			translateY: -150,
			duration: 200,
			easing: expoOut,
			opacity: 0,
		}}
		out:transform={{
			rotateX: -20,
			rotateY: -30,
			translateZ: -200,
			duration: 150,
			easing: expoIn,
			opacity: 0,
		}}
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
				maxlength={48}
				placeholder="courriel@domaine.com"
				pattern={patterns.email}
				name="email"
				type="email"
				required
			>
				<FieldIcon name="letter" slot="leading" />
				<svelte:fragment slot="label">Courriel</svelte:fragment>
				<FieldControlReset slot="trailing" />
			</Field>
			<Field bind:value={password} name="password" type="password" minlength={6} required>
				<FieldIcon slot="leading" name="lock-close" />
				<svelte:fragment slot="label">Mot de passe</svelte:fragment>
				<svelte:fragment slot="trailing">
					<FieldControlReset />
					<FieldControlTogglePassword />
				</svelte:fragment>
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
			<Button
				type="submit"
				variant="cta"
				value={Action.EmailSignIn}
				disabled={!Boolean(email) || !Boolean(password)}
				contentAlign="center"
				loading={currentAction === Action.EmailSignIn}
			>
				<svelte:fragment slot="trailing">
					<Icon name="arrow-right" size="1.5em" />
				</svelte:fragment>
				Me connecter
			</Button>
			<div
				style="display: flex; flex-direction: row; justify-content: space-between; width: 100; font-size: .85em;"
			>
				<Button
					type="submit"
					variant="ghost"
					value={Action.EmailSignUp}
					loading={currentAction === Action.EmailSignUp}
				>
					Créer un compte
				</Button>
				<Button type="submit" variant="ghost" value={Action.EmailSignUp}>Mot de passe oublié?</Button>
			</div>
		</form>
		<hr />
		<form in:scale={{ start: 0.94, opacity: 0, easing: expoOut, delay: 450 }} class="provider-buttons">
			{#each providerNames as name, i}
				<Button disabled size={sizes.small} contentAlign="center" variant="secondary">
					<ProviderLogo size="1.5em" {name} slot="leading" />
					Se connecter avec {providers[name].title}
				</Button>
			{/each}
		</form>
	</dialog>
</div>

<style lang="scss">
	.bg {
		z-index: 1000;
		position: fixed;
		width: 100vw;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(var(--rgb-primary-700), 0.96);
	}

	.wrap {
		position: fixed;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		padding: 4rem;
		margin: 0;
		top: 0;
		left: 0;
		perspective: 900px;
	}

	dialog {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		max-width: 450px;
		max-height: 100%;
		background-color: var(--color-light-100);
		padding: 3rem 2rem;
		overflow-y: auto;
		border-radius: 1.5rem;
		border: none;
	}

	.logo {
		cursor: pointer;
		text-decoration: none;
		color: var(--color-primary-500);
		width: 50%;
		max-width: 275px;
		margin: 0 auto;
		padding: 2rem;
		padding-top: 0;
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		font-size: 0.8em;
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

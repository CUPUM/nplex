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
	import { browserDbClient } from '$utils/database/database';
	import { patterns } from '$utils/input/patterns';
	import { providers } from '$utils/values/providers';
	import { sizes } from '$utils/values/sizes';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fade, scale, slide } from 'svelte/transition';

	let email: string;
	let password: string;
	let firstname: string;
	let middlename: string;
	let lastname: string;
	let providerNames = Object.keys(providers) as (keyof typeof providers)[];
	let signupForm = false;
	let currentAction = null;
	let mounted = false;

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
					console.log(signup);
					if (signup.error) throw signup.error;
					const updateProfile = await browserDbClient
						.from('users_profiles')
						.update({ firstname, middlename, lastname })
						.eq('user_id', signup.data.user.id)
						.single();
					console.log(updateProfile);
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

<div class="bg" transition:fade={{ duration: 200 }} />
<div class="wrap">
	<dialog
		in:scale={{ start: 0.9, opacity: 0, duration: 250, easing: expoOut }}
		out:scale={{ start: 0.95, opacity: 0, duration: 200, easing: expoIn }}
		use:clickoutside
		on:clickoutside={() => authModal.close()}
	>
		<a class="logo" href="/">
			<Logo color="currentColor" />
		</a>
		<form
			id="auth-form"
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
					<FieldControlTogglePassword />
					<FieldControlReset />
				</svelte:fragment>
			</Field>
			{#if signupForm}
				<div id="auth-signup-fields" transition:slide|local={{}}>
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
			<div id="auth-form-buttons">
				<div style="width: 100%">
					<Button
						type="submit"
						variant="cta"
						value={Action.EmailSignIn}
						disabled={!Boolean(email) || !Boolean(password)}
						contentAlign="center"
						loading={currentAction === Action.EmailSignIn}
						display="block"
					>
						<svelte:fragment slot="trailing">
							<Icon name="login" size="1.5em" />
						</svelte:fragment>
						Me connecter
					</Button>
				</div>
				<Button
					size=".85em"
					type="submit"
					variant="ghost"
					value={Action.EmailSignUp}
					loading={currentAction === Action.EmailSignUp}
				>
					<Icon name="user-add" size="1em" />&nbsp; Créer un compte
				</Button>
				<Button size=".85em" type="submit" variant="ghost" value={Action.EmailSignUp}
					>Mot de passe oublié?</Button
				>
			</div>
		</form>
		<hr />
		<form in:scale={{ start: 0.94, opacity: 0, easing: expoOut, delay: 450 }} id="auth-provider-form">
			<span>Ou se connecter via une autre plateforme&nbsp;:</span>
			<fieldset id="auth-provider-buttons" disabled>
				{#each providerNames as name, i}
					<Button size={sizes.small} contentAlign="center" variant="secondary">
						<ProviderLogo size="1.5em" {name} slot="leading" />
						{providers[name].title}
					</Button>
				{/each}
			</fieldset>
		</form>
	</dialog>
</div>

<style lang="scss">
	.bg {
		z-index: 1000;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		opacity: 0.98;
		background: linear-gradient(-30deg, var(--color-primary-900) -25%, var(--color-primary-300) 150%);
		// background-color: rgba(var(--rgb-primary-700), 0.96);
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
		background-color: white;
		box-shadow: 0 3rem 8rem -5rem black;
		padding: 0;
		overflow-y: auto;
		border-radius: 2rem;
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
		padding-top: 3rem;
		transition: all 0.15s ease-out;

		&:hover {
			transform: scale(0.98);
			color: var(--color-primary-900);
		}
	}

	#auth-form {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		border: none;
		padding: 0 2.5rem;
	}

	#auth-form-buttons {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		gap: 0.5em;
	}

	#auth-signup-fields {
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

	#auth-provider-form {
		width: 100%;
		text-align: center;
		padding: 2rem 2.5rem 3rem 2.5rem;
		margin: 0;
		border-radius: 1.5rem 1.5rem 0 0;
		background-color: var(--color-light-100);

		span {
			display: inline-block;
			padding: 0;
			margin: 0;
			font-size: 0.9rem;
			color: var(--color-dark-100);
			opacity: 0.5;
		}
	}

	#auth-provider-buttons {
		padding: 0;
		margin: 0;
		margin-top: 2rem;
		border: none;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;

		&:disabled {
			pointer-events: none;
			opacity: 0.5;
			color: red !important;
		}
	}
</style>

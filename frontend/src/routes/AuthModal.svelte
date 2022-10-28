<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { rootScroll } from '$stores/scroll';
	import { SearchParam } from '$utils/enums';
	import { derived } from 'svelte/store';

	const LOCK_KEY = 'auth';

	export const authModalState = (function () {
		const { subscribe } = derived(page, ($page) => {
			if (browser) {
				const isModal = $page.url.searchParams.has(SearchParam.AuthModal);
				if (isModal) rootScroll.lock(LOCK_KEY);
				else rootScroll.unlock(LOCK_KEY);
				return isModal;
			}
			return false;
		});

		return {
			subscribe,
			close: async () => {
				if (browser) {
					const params = new URLSearchParams(location.search);
					params.delete(SearchParam.AuthModal);
					return goto(`?${params.toString()}`, { replaceState: true });
				}
			},
		};
	})();
</script>

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import FieldReset from '$components/FieldReset.svelte';
	import FieldTogglePassword from '$components/FieldTogglePassword.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import ProviderLogo, { providers } from '$components/ProviderLogo.svelte';
	import { messages } from '$stores/messages';
	import { transform } from '$transitions/transform';
	import { dbClient } from '$utils/database/database';
	import { patterns } from '$utils/input/patterns';
	import { cubicOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';

	enum Action {
		EmailSignUp = 'emailsignup',
		EmailSignIn = 'emailsignin',
		ResetPassword = 'resetpassword',
		UseProvider = 'useprovider',
	}

	let email: string;
	let password: string;
	let providerNames = Object.keys(providers) as (keyof typeof providers)[];
	let currentAction: Action | null = null;

	async function submit(e: SubmitEvent) {
		currentAction = (e.submitter as HTMLButtonElement).value as Action;
		try {
			switch (currentAction) {
				case Action.EmailSignIn:
					const signin = await dbClient.forBrowser.auth.signInWithPassword({ email, password });
					if (signin.error) {
						throw signin.error;
					}
					break;
				case Action.EmailSignUp:
					const signup = await dbClient.forBrowser.auth.signUp({ email, password });
					if (signup.error) {
						throw signup.error;
					}
				case Action.ResetPassword:
					const res = await dbClient.forBrowser.auth.resetPasswordForEmail(email, {});
					console.log(res);
				case Action.UseProvider:
					// To do: get app approbation from desired providers.
					break;
			}
		} catch (err: any) {
			messages.dispatch({
				type: 'error',
				content: err.message,
			});
		}
		currentAction = null;
	}
</script>

{#if $authModalState}
	<div id="auth-bg" transition:fade={{ duration: 200 }} />
	<dialog class="container">
		<form
			on:submit|preventDefault={submit}
			action="login"
			in:transform={{ scale: 1.08, translateY: 25, opacity: 0, duration: 350, easing: cubicOut }}
			out:scale={{ start: 0.95 }}
			use:clickoutside={true}
			on:clickoutside={() => authModalState.close()}
		>
			<a id="auth-logo" href="/">
				<Logo color="currentColor" />
			</a>
			<fieldset id="auth-fields">
				<Field
					variant="outlined"
					bind:value={email}
					maxlength={100}
					pattern={patterns.email}
					name="email"
					type="email"
					required
				>
					<FieldIcon name="letter" slot="leading" />
					<svelte:fragment slot="label">Courriel</svelte:fragment>
					<FieldReset slot="trailing" />
				</Field>
				<Field variant="outlined" bind:value={password} name="password" type="password" minlength={6} required>
					<FieldIcon slot="leading" name="lock-close" />
					<svelte:fragment slot="label">Mot de passe</svelte:fragment>
					<svelte:fragment slot="trailing">
						<FieldTogglePassword />
						<FieldReset />
					</svelte:fragment>
				</Field>
				<div id="auth-buttons">
					<Button
						class="login-button"
						type="submit"
						variant="cta"
						value={Action.EmailSignIn}
						disabled={!Boolean(email) || !Boolean(password)}
						contentAlign="center"
						loading={currentAction === Action.EmailSignIn}
					>
						<svelte:fragment slot="trailing">
							<Icon name="login" />
						</svelte:fragment>
						Me connecter
					</Button>
					<Button
						type="submit"
						variant="ghost"
						value={Action.EmailSignUp}
						disabled={!Boolean(email) || !Boolean(password)}
						loading={currentAction === Action.EmailSignUp}
					>
						<Icon name="user-add" />&nbsp; Créer un compte
					</Button>
					<Button type="submit" variant="ghost" value={Action.ResetPassword}>Mot de passe oublié?</Button>
				</div>
			</fieldset>
			<hr />
			<fieldset id="auth-providers">
				<span>Ou se connecter via une autre plateforme&nbsp;:</span>
				<fieldset id="auth-providers-buttons" disabled>
					{#each providerNames as name, i}
						<Button contentAlign="center" variant="secondary">
							<ProviderLogo {name} slot="leading" />
							{providers[name]?.title}
						</Button>
					{/each}
				</fieldset>
			</fieldset>
			<Button class="close" type="submit" variant="ghost" on:click={() => authModalState.close()} square>
				<Icon name="cross" />
			</Button>
		</form>
	</dialog>
{/if}

<style lang="scss">
	#auth-bg {
		z-index: 1000;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		opacity: 0.98;
		// background: linear-gradient(-30deg, var(--color-primary-900) -25%, var(--color-primary-300) 150%);
		background-color: rgba(var(--rgb-primary-900), 0.95);
	}

	.container {
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
		background-color: transparent;
		border: none;
	}

	.close {
		position: absolute !important;
		top: 1rem;
		right: 1rem;
	}

	form {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		max-width: 450px;
		max-height: 100%;
		background-color: var(--color-light-300);
		box-shadow: 0 3rem 8rem -5rem black;
		padding: 0;
		overflow-y: auto;
		border-radius: 1.5rem;
		border: none;
	}

	#auth-logo {
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

	#auth-fields {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		border: none;
		padding: 0 2.5rem;
		margin: 0;
	}

	#auth-buttons {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		gap: 0.5em;
	}

	.login-button {
		width: 100%;
		flex-grow: 1;
	}

	#auth-signup-fields {
		width: 100%;
		position: relative;
		border: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1em;
		grid-template-columns: auto auto;
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

	#auth-providers {
		border: none;
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

	#auth-providers-buttons {
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

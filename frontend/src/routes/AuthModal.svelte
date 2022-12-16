<!--
	@component
	## Auth Modal
	Singleton component for supabase client (browser) authentication.

-->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { rootScroll } from '$stores/scroll';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { derived, get } from 'svelte/store';

	const SCROLL_LOCK = Symbol('auth');
	enum AuthMode {
		SignIn = 'signin',
		SignUp = 'signup',
	}

	/**
	 * Singleton store to open/close the auth modal and consequently update the client's URL search
	 * params and vice-versa.
	 */
	export const authModal = (function () {
		const { subscribe } = derived(page, (_page) => {
			if (browser) {
				const open = _page.url.searchParams.has(SEARCH_PARAMS.AUTH_MODAL);
				if (!open) {
					rootScroll.unlock(SCROLL_LOCK);
				} else {
					if (_page.data?.session) {
						// For when a user navigates back after a redirect (ex.: on successful signin).
						// This prevents from showing the AuthModal again, which would be irrelevant as the session is persisted.
						return goto(getUrl({ url: _page.url, open: false }), {
							replaceState: true,
						});
					}
					rootScroll.lock(SCROLL_LOCK);
					const mode = _page.url.searchParams.get(SEARCH_PARAMS.AUTH_MODAL);
					return mode && (Object.values(AuthMode) as string[]).includes(mode)
						? (mode as AuthMode)
						: AuthMode.SignIn;
				}
			}
			return false;
		});

		function getUrl({
			url,
			open = true,
			mode = AuthMode.SignIn,
		}: {
			url: string | URL;
			open?: boolean;
			mode?: AuthMode;
		}) {
			const re = new URL(url, get(page).url);
			if (open) {
				re.searchParams.set(SEARCH_PARAMS.AUTH_MODAL, mode);
			} else {
				re.searchParams.delete(SEARCH_PARAMS.AUTH_MODAL);
			}
			return re;
		}

		async function open({
			url,
			mode = AuthMode.SignIn,
			...opts
		}: { url?: string | URL; mode?: AuthMode } & Parameters<typeof goto>[1] = {}) {
			if (!browser) return;
			const re = getUrl({ url: url ?? get(page).url, mode, open: true });
			return goto(re, { replaceState: true, noScroll: true, ...opts });
		}

		async function close({
			url,
			...opts
		}: { url?: string | URL } & Parameters<typeof goto>[1] = {}) {
			if (!browser) return;
			const re = getUrl({ url: url ?? get(page).url, open: false });
			return goto(re, { replaceState: true, noScroll: true, ...opts });
		}

		return {
			subscribe,
			open,
			close,
			getUrl,
		};
	})();
</script>

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import FieldReset from '$components/FieldReset.svelte';
	import FieldTogglePassword from '$components/FieldTogglePassword.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import ProviderLogo, { providers } from '$components/ProviderLogo.svelte';
	import { THEME_CLASSES } from '$utils/themes';
	import { linear } from 'svelte/easing';
	import { fade, scale, slide } from 'svelte/transition';

	const Action = {
		SignIn: '/api/auth?/signin',
		SignUp: '/api/auth?/signup',
		ForgotPassword: '/api/auth?/forgot',
		UseProvider: '/api/auth?/provider',
	} as const;
	let currentAction: string | null = null;
	let providerNames = Object.keys(providers) as (keyof typeof providers)[];
</script>

{#if $authModal}
	<div
		class="bg {THEME_CLASSES.LIGHT}"
		aria-hidden="true"
		transition:fade={{ duration: 150, easing: linear }}
	/>
	<dialog class={THEME_CLASSES.LIGHT}>
		<form
			class="sign"
			transition:scale={{ start: 0.95 }}
			use:clickoutside={true}
			on:clickoutside={() => authModal.close()}
			action={$authModal === AuthMode.SignUp ? Action.SignUp : Action.SignIn}
			method="POST"
			use:enhance={({ form, data, action, cancel }) => {
				currentAction = action.pathname + action.search;
				return async ({ update, result }) => {
					update({ reset: false });
					currentAction = null;
				};
			}}
		>
			<Logo class="logo" />
			<fieldset class="fields">
				<Field required class="fill-row" variant="default" name="email" type="email">
					<FieldIcon name="letter" slot="leading" />
					<svelte:fragment slot="label">Courriel</svelte:fragment>
					<FieldReset slot="trailing" />
				</Field>
				<Field required class="fill-row" variant="default" name="password" type="password">
					<FieldIcon slot="leading" name="lock-close" />
					<svelte:fragment slot="label">Mot de passe</svelte:fragment>
					<svelte:fragment slot="trailing">
						<FieldTogglePassword />
						<FieldReset />
					</svelte:fragment>
				</Field>
				{#if $authModal === AuthMode.SignUp}
					<div class="signup fill-row" transition:slide|local={{ duration: 200 }}>
						<Field required variant="default" name="first_name">
							<svelte:fragment slot="label">Prénom/pseudonyme</svelte:fragment>
							<svelte:fragment slot="trailing">
								<FieldReset />
							</svelte:fragment>
						</Field>
						<Field variant="default" name="last_name">
							<svelte:fragment slot="label">Nom de famille</svelte:fragment>
							<svelte:fragment slot="trailing">
								<FieldReset />
							</svelte:fragment>
						</Field>
					</div>
					<!-- Prepending a signup submit button to intercept default "enter" handling -->
					<button type="submit" hidden formaction={Action.SignUp} />
				{/if}
				<Button
					class="fill-row"
					type="submit"
					variant={$authModal === AuthMode.SignIn ? 'cta' : 'default'}
					contentAlign="center"
					formaction={Action.SignIn}
					loading={currentAction === Action.SignIn}
				>
					<Icon name="login" slot="trailing" />
					Me connecter
				</Button>
				<Button disabled variant="ghost" class="small-button" contentAlign="center"
					>Mot de passe oublié ?</Button
				>
				<Button
					class="small-button"
					variant={$authModal === AuthMode.SignUp ? 'cta' : 'default'}
					type={$authModal === AuthMode.SignUp ? 'submit' : 'button'}
					href={$authModal === AuthMode.SignIn
						? authModal.getUrl({ url: $page.url, open: true, mode: AuthMode.SignUp }).toString()
						: undefined}
					contentAlign="center"
					formaction={Action.SignUp}
					loading={currentAction === Action.SignUp}
				>
					Créer un compte
				</Button>
			</fieldset>
			<hr />
			<fieldset class="providers" disabled>
				<span>Me connecter avec&ensp;<subtle>(non-disponible)</subtle></span>
				<ul class="scroll">
					{#each providerNames as name, i}
						<li>
							<Button variant="outlined" style="flex: none;" disabled>
								<ProviderLogo {name} slot="leading" />
								{providers[name]?.title}
							</Button>
						</li>
					{/each}
				</ul>
			</fieldset>
		</form>
	</dialog>
{/if}

<style lang="scss">
	.bg {
		z-index: 1000;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: col(fg, 300, 0.95);
	}

	dialog {
		position: fixed;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		padding: var(--ui-size-x2large) var(--ui-size-medium);
		margin: 0;
		top: 0;
		left: 0;
		background: transparent;
		border: none;
		perspective: 1000px;

		:global(.logo) {
			color: col(primary, 500);
			font-size: var(--ui-text-2xl);
			padding: var(--ui-text-lg);
			margin: var(--ui-text-md) auto;
		}

		form {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			flex-wrap: nowrap;
			width: 100%;
			max-width: 450px;
			max-height: 100%;
			background: col(bg, 500);
			// box-shadow: 0 3rem 8rem -4rem black, 0 3rem 3rem 2rem rgba(0, 0, 0, 0.1);
			padding: 0;
			border-radius: 1.5rem;
			border: none;
			overflow: hidden;
		}

		.fields {
			position: relative;
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
			border: none;
			padding: 0 2.5rem;
			margin: 0;
			min-width: 0;
			overflow-y: auto;
		}

		:global(.fill-row) {
			grid-column: 1 / -1;
		}

		:global(.small-button) {
			font-size: var(--ui-text-xs);
		}

		.signup {
			display: flex;
			flex-direction: column;
			gap: inherit;
		}

		hr {
			height: 1px;
			margin: 2rem 0;
			border: none;
			background: col(fg, 100, 0.05);
		}

		.providers {
			position: relative;
			display: flex;
			flex-direction: column;
			border: none;
			margin: 0;
			gap: 2rem;
			padding: 0;
			min-width: 0;
			span {
				display: block;
				margin: 0 2.5rem;
				text-align: center;
				opacity: 0.5;
				font-size: var(--ui-text-xs);
			}
			ul {
				position: relative;
				list-style-type: none;
				margin: 0;
				display: flex;
				flex-direction: row;
				gap: 1rem;
				padding: 2rem 3rem;
				padding-top: 0;
				overflow-x: scroll;
			}
		}

		subtle {
			opacity: 0.5;
		}
	}
</style>

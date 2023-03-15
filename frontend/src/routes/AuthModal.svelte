<!--
	@component
	## Auth Modal
	Singleton component for supabase client (browser) authentication.
-->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { rootScroll } from '$stores/rootScroll';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { derived, get } from 'svelte/store';

	const key = Symbol('auth');

	export const AUTHMODAL_MODE = {
		SignIn: 'signin',
		SignUp: 'signup',
		Provider: 'provider',
	} as const;
	type AuthMode = ValueOf<typeof AUTHMODAL_MODE>;

	/**
	 * Singleton store to open/close the auth modal and consequently update the client's URL search
	 * params and vice-versa.
	 */
	export const authModal = (function () {
		const { subscribe } = derived(page, (_page) => {
			if (!browser) {
				return false;
			}
			const open = _page.url.searchParams.has(SEARCH_PARAMS.AUTH_MODAL);
			if (!open) {
				rootScroll.unlock(key);
				return false;
			} else {
				if (_page.data?.session) {
					// For when a user navigates back after a redirect (ex.: on successful signin).
					// This prevents from showing the AuthModal again, which would be irrelevant as the session is persisted.
					goto(getUrl({ url: _page.url, open: false }), {
						replaceState: true,
						noScroll: true,
					});
					return false;
				}
				rootScroll.lock(key);
				const mode = _page.url.searchParams.get(SEARCH_PARAMS.AUTH_MODAL);
				return mode && (Object.values(AUTHMODAL_MODE) as string[]).includes(mode)
					? (mode as AuthMode)
					: AUTHMODAL_MODE.SignIn;
			}
		});

		function getUrl({
			url,
			open = true,
			mode = AUTHMODAL_MODE.SignIn,
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
			mode = AUTHMODAL_MODE.SignIn,
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
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldReset from '$components/Field/FieldButtonReset.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import FieldTogglePassword from '$components/Field/FieldTogglePassword.svelte';
	import Icon from '$components/Icon.svelte';
	import { LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import SocialIcon, { SOCIAL_ICONS } from '$components/SocialIcon.svelte';
	import { USER_BASE_ROUTE } from '$utils/routes';
	import { THEMES } from '$utils/themes';
	import type { ActionResult } from '@sveltejs/kit';
	import { cubicOut, linear } from 'svelte/easing';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import type { ValueOf } from 'ts-essentials';
	import type { AuthFailure } from './api/auth/common';
	import { messages } from './MessagesOutlet.svelte';

	const Action = {
		SignIn: '/api/auth?/signin',
		SignUp: '/api/auth?/signup',
		ForgotPassword: '/api/auth?/forgot',
		UseProvider: '/api/auth?/provider',
	} as const;

	let currentAction: string | null = null;

	const providers = [
		'facebook',
		'google',
		'linkedin',
		'twitter',
	] satisfies (keyof typeof SOCIAL_ICONS)[];

	let failure: AuthFailure = {};

	function followup(result: ActionResult) {
		if (result.type === 'failure' && 'data' in result) {
			failure = result.data as AuthFailure;
			messages.error(...Object.values(failure).map((f) => ({ content: f.join('\n') })));
		}
	}
</script>

{#if $authModal}
	<div
		class="bg"
		aria-hidden="true"
		data-theme={THEMES.light}
		out:fade={{ duration: 150, easing: linear }}
		on:pointerdown={() => authModal.close()}
	/>
	<dialog data-theme={THEMES.light}>
		<form
			autocomplete="off"
			class="sign"
			transition:scale={{ start: 0.95 }}
			action={$authModal === AUTHMODAL_MODE.SignUp ? Action.SignUp : Action.SignIn}
			method="POST"
			use:enhance={({ form, data, action, cancel }) => {
				failure = {};
				currentAction = action.pathname + action.search;
				return async ({ update, result }) => {
					await update({ reset: false });
					currentAction = null;
					followup(result);
				};
			}}
		>
			<a href="/" class="logo">
				<svg xmlns="http://www.w3.org/2000/svg" overflow="visible" in:fly={{ y: -10, delay: 150 }}>
					<use href={LOGO_SYMBOLS_HREFS.full} fill="currentColor" />
				</svg>
			</a>
			<fieldset class="fields">
				<Field
					type="email"
					class="fill-row"
					variant="default"
					name="email"
					required
					warning={!!failure.email}
				>
					<FieldIcon name="letter" slot="leading" />
					<svelte:fragment slot="label">Courriel</svelte:fragment>
					<FieldReset slot="trailing" />
				</Field>
				<Field
					type="password"
					class="fill-row"
					variant="default"
					name="password"
					required
					warning={!!failure.password}
				>
					<FieldIcon slot="leading" name="lock-close" />
					<svelte:fragment slot="label">Mot de passe</svelte:fragment>
					<svelte:fragment slot="trailing">
						<FieldTogglePassword />
						<FieldReset />
					</svelte:fragment>
				</Field>
				{#if $authModal === AUTHMODAL_MODE.SignUp}
					<div class="signup fill-row" transition:slide|local={{ duration: 120, easing: cubicOut }}>
						<Field variant="default" name="first_name" required warning={!!failure.first_name}>
							<svelte:fragment slot="label">Prénom ou pseudonyme</svelte:fragment>
							<svelte:fragment slot="trailing">
								<FieldReset />
							</svelte:fragment>
						</Field>
						<Field variant="default" name="last_name" warning={!!failure.last_name}>
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
					variant={$authModal === AUTHMODAL_MODE.SignIn ? 'cta' : 'default'}
					contentAlign="center"
					formnovalidate
					formaction="{Action.SignIn}{$page.url.pathname === '/'
						? `&${SEARCH_PARAMS.REDIRECT}=${USER_BASE_ROUTE.pathname}`
						: ''}"
					loading={currentAction === Action.SignIn}
				>
					<Icon name="login" slot="trailing" />
					Me connecter
				</Button>
				<Button disabled variant="ghost" class="small-button" contentAlign="center">
					Mot de passe oublié ?
				</Button>
				<Button
					autoActive={false}
					class="small-button"
					data-sveltekit-noscroll=""
					data-sveltekit-replacestate
					variant={$authModal === AUTHMODAL_MODE.SignUp ? 'cta' : 'default'}
					type={$authModal === AUTHMODAL_MODE.SignUp ? 'submit' : 'button'}
					href={$authModal === AUTHMODAL_MODE.SignIn
						? authModal
								.getUrl({ url: $page.url, open: true, mode: AUTHMODAL_MODE.SignUp })
								.toString()
						: undefined}
					contentAlign="center"
					formaction="{Action.SignUp}{$page.url.pathname === '/'
						? `&${SEARCH_PARAMS.REDIRECT}=${USER_BASE_ROUTE.pathname}`
						: ''}"
					loading={currentAction === Action.SignUp}
				>
					Créer {$authModal === AUTHMODAL_MODE.SignUp ? 'mon' : 'un'} compte
				</Button>
			</fieldset>
			<hr class="rule" />
			<fieldset class="providers" disabled>
				<span>Me connecter avec:</span>
				<ul class="scroll">
					{#each providers as name, i}
						<li>
							<Button variant="outlined" style="flex: none;" disabled>
								<SocialIcon {name} slot="leading" />
								{SOCIAL_ICONS[name]?.title}
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
		cursor: pointer;
		z-index: 1000;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: col(fg, 700, 0.9);
	}

	dialog {
		pointer-events: none;
		position: fixed;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		padding: var(--ui-block-x2large) var(--ui-block-medium);
		margin: 0;
		top: 0;
		left: 0;
		background: transparent;
		border: none;
		perspective: 1000px;
	}

	form {
		pointer-events: all;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex-wrap: nowrap;
		width: 100%;
		max-width: 450px;
		max-height: 100%;
		background: col(bg, 300);
		box-shadow: 0 3rem 6rem -3rem rgba(0, 0, 20, 0.5), 0 3rem 3rem 2rem rgba(0, 0, 0, 0.1);
		padding: 0;
		border-radius: var(--ui-radius-lg);
		border: none;
		overflow: hidden;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		color: col(primary, 500);
		border-bottom: 1px solid col(fg, 100, 0.05);
		padding: calc(2 * 1.5rem) 1.5rem;

		svg {
			height: var(--ui-text-2xl);
		}
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
		padding: 2rem 2.5rem;
		margin: 0;
		// min-width: 0;
		overflow-y: auto;
	}

	form :global(.fill-row) {
		grid-column: 1 / -1;
	}

	form :global(.small-button) {
		font-size: var(--ui-text-sm);
	}

	.signup {
		display: flex;
		flex-direction: column;
		gap: inherit;
	}

	hr {
		margin-bottom: 2rem;
	}

	.providers {
		position: relative;
		display: flex;
		flex-direction: column;
		border: none;
		margin: 0;
		gap: 1rem;
		padding: 0;
		// min-width: 0;

		span {
			display: block;
			margin: 0 2.5rem;
			text-align: center;
			opacity: 0.5;
			font-size: var(--ui-text-sm);
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
</style>

<!--
	@component
	## Auth Modal
	Singleton component for supabase client (browser) authentication.

-->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { rootScroll } from '$stores/scroll';
	import { SearchParam } from '$utils/enums';
	import { derived, get } from 'svelte/store';

	const SCROLL_LOCK = Symbol('auth');

	/**
	 * Singleton store to open/close the auth modal and consequently update the client's URL search
	 * params and vice-versa.
	 */
	export const authModalState = (function () {
		const { subscribe } = derived(page, ($page) => {
			if (browser) {
				const open = $page.url.searchParams.has(SearchParam.AuthModal);
				if (open) rootScroll.lock(SCROLL_LOCK);
				else rootScroll.unlock(SCROLL_LOCK);
				return open;
			}
			return false;
		});

		function getUrl({
			url = get(page).url,
			open = true,
		}: { url?: string | URL; open?: boolean } = {}) {
			const re = new URL(url);
			if (open) {
				re.searchParams.set(SearchParam.AuthModal, 'true');
			} else {
				re.searchParams.delete(SearchParam.AuthModal);
			}
			return re;
		}

		async function open({
			url = get(page).url,
			replaceState = true,
			...opts
		}: { url?: string | URL } & Parameters<typeof goto>[1] = {}) {
			if (!browser) return;
			const re = getUrl({ url, open: true });
			return goto(re, { replaceState, ...opts });
		}

		async function close({
			url = get(page).url,
			replaceState = true,
			...opts
		}: { url?: string | URL } & Parameters<typeof goto>[1] = {}) {
			if (!browser) return;
			const re = getUrl({ url, open: false });
			return goto(re, { replaceState, ...opts });
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
	import { transform } from '$transitions/transform';
	import { cubicIn, cubicOut, linear } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	enum Action {
		SignIn = '/api/auth?/signin',
		SignUp = '/api/auth?/signup',
		ForgotPassword = '/api/auth?/forgot',
	}

	let email: string;
	let password: string;
	let currentAction: Action | null = null;
	let providerNames = Object.keys(providers) as (keyof typeof providers)[];
</script>

{#if $authModalState}
	<div class="bg" aria-hidden="true" transition:fade={{ duration: 250, easing: linear }} />
	<dialog class="container">
		<form
			in:transform={{
				scale: 1.08,
				translateY: 25,
				rotateX: -10,
				opacity: 0,
				duration: 350,
				easing: cubicOut,
			}}
			out:transform={{ scale: 0.96, rotateX: 10, opacity: 0, duration: 250, easing: cubicIn }}
			use:clickoutside={true}
			on:clickoutside={() => authModalState.close()}
			method="POST"
			use:enhance={({ form, data, action, cancel }) => {
				currentAction = action.search;
				return async ({ update, result }) => {
					update({ reset: false });
					currentAction = null;
				};
			}}
		>
			<Logo class="logo" />
			<fieldset class="fields">
				<Field
					class="fill-row"
					variant="default"
					bind:value={email}
					name="email"
					type="email"
				>
					<FieldIcon name="letter" slot="leading" />
					<svelte:fragment slot="label">Courriel</svelte:fragment>
					<FieldReset slot="trailing" />
				</Field>
				<Field
					class="fill-row"
					variant="default"
					bind:value={password}
					name="password"
					type="password"
				>
					<FieldIcon slot="leading" name="lock-close" />
					<svelte:fragment slot="label">Mot de passe</svelte:fragment>
					<svelte:fragment slot="trailing">
						<FieldTogglePassword />
						<FieldReset />
					</svelte:fragment>
				</Field>
				<Button
					class="fill-row"
					type="submit"
					variant="cta"
					disabled={!Boolean(email) || !Boolean(password)}
					contentAlign="center"
					formaction={Action.SignIn}
					loading={currentAction === Action.SignIn}
				>
					<Icon name="login" slot="trailing" />
					Me connecter
				</Button>
				<Button
					class="small-button"
					type="submit"
					disabled={!Boolean(email) || !Boolean(password)}
					loading={currentAction === Action.SignUp}
					contentAlign="center"
				>
					<Icon name="user-add" slot="leading" style="font-size: 1.25em" />
					Créer un compte
				</Button>
				<Button class="small-button" type="submit" variant="ghost" contentAlign="center"
					>Mot de passe oublié</Button
				>
			</fieldset>
			<hr />
			<fieldset class="providers" disabled>
				<span>Me connecter via une autre plateforme :</span>
				<ul class="scroll">
					{#each providerNames as name, i}
						<li>
							<Button variant="outlined" style="flex: none;">
								<ProviderLogo {name} slot="leading" />
								{providers[name]?.title}
							</Button>
						</li>
					{/each}
				</ul>
			</fieldset>
			<Button class="close" variant="ghost" on:click={() => authModalState.close()} equi>
				<Icon name="cross" />
			</Button>
		</form>
	</dialog>
{/if}

<style lang="scss" module>
	.bg {
		z-index: 1000;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: col(fg, 100, 0.9);
	}

	.container {
		position: fixed;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		padding: var(--size-x2large) var(--size-medium);
		margin: 0;
		top: 0;
		left: 0;
		background: transparent;
		border: none;
		perspective: 1000px;

		.close {
			position: absolute;
			top: 1rem;
			right: 1rem;
			color: col(primary, 500);
		}

		.logo {
			color: col(primary, 500);
			font-size: 4rem;
			padding: 1rem 2rem;
			margin: 2rem;
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
			box-shadow: 0 3rem 8rem -4rem black, 0 3rem 3rem 2rem rgba(0, 0, 0, 0.1);
			padding: 0;
			overflow-y: auto;
			overflow-x: hidden;
			border-radius: 1.5rem;
			border: none;
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
		}

		.fill-row {
			grid-column: 1 / -1;
		}

		.small-button {
			font-size: var(--size-x2small);
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
				font-size: var(--size-xsmall);
			}
			ul {
				list-style-type: none;
				margin: 0;
				display: flex;
				flex-direction: row;
				gap: 1rem;
				padding: 3rem;
				padding-top: 0;
				overflow: scroll;
			}
			li {
				all: unset;
			}
		}
	}
</style>

<script lang="ts" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { getStores, session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Footer from '$components/complexes/Footer.svelte';
	import MessagesOutlet from '$components/complexes/MessagesOutlet.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { authModal } from '$stores/auth';
	import { backgroundColor } from '$stores/backgroundColor';
	import '$styles/app.scss';
	import '$styles/helpers.scss';
	import '$styles/vars.css';
	import { db, DB_COOKIE_LIFETIME, getUserRole } from '$utils/database';
	import { SearchParam } from '$utils/keys';
	import { sizes } from '$utils/sizes';
	import { toUserRoleEnum } from '$utils/user';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { UpdateUserCookieRequestBody } from './api/auth/update-user-cookies';

	export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
		return {
			stuff: {
				showFooter: true,
			},
		};
	}
</script>

<script lang="ts">
	// Updating the client session's previous url used for redirects on guard fail.
	afterNavigate(({ from, to }) => {
		const newPreviousUrl = to;
		newPreviousUrl.searchParams.delete(SearchParam.AuthModal);
		session.update((prev) => ({ ...prev, previousUrl: newPreviousUrl.toString() }));
	});

	// Getting the page store this way since we are getting its value
	// outside component initialization, in the below callback.
	const { page } = getStores();

	// Listening to and handling client-side Supabase auth state change.
	db.auth.onAuthStateChange(async (e, s) => {
		// Update client-side store accordingly.
		if (e === 'SIGNED_OUT') {
			// Resetting the auth-related and user-related cookies to null.
			await fetch('/api/auth/update-user-cookies', {
				method: 'POST',
				body: JSON.stringify({}),
			});
			session.update((prevSession) => ({ ...prevSession, previousUrl: get(page).url.hostname, user: null }));
			return goto(get(page).url);
		}
		// Handling successful user updates.
		const role = toUserRoleEnum(await getUserRole());
		const user: App.Session['user'] = { ...s.user, role };
		const body: UpdateUserCookieRequestBody = {
			user,
			access_token: s.access_token,
			refresh_token: s.refresh_token,
			expires_at: s.expires_at || Date.now() + DB_COOKIE_LIFETIME,
		};
		// Updating cookies' info.
		await fetch('/api/auth/update-user-cookies', {
			method: 'POST',
			body: JSON.stringify(body),
		});
		session.update((prevSession) => ({ ...prevSession, user }));
		if (authModal) authModal.close();
	});

	// On initializing the website client-side, let's attempt to login with previously set token (if any).
	db.auth.refreshSession();

	let loading = true;
	let navbarHeight: number;

	backgroundColor.init();

	onMount(() => {
		loading = false;
	});
</script>

<Navbar bind:navbarHeight />
<main style:--navbar-height="{navbarHeight}px" class:loading>
	<slot />
</main>
{#if $page.stuff.showFooter}
	<Footer />
{/if}
{#if $authModal}
	<Auth />
{/if}
{#if loading}
	<Loading containerStyle="position: fixed; top:0; left: 0; width: 100vw; height: 100vh" size={sizes.xlarge} />
{/if}
<MessagesOutlet />

<style lang="scss">
	main {
		position: relative;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		padding: 0;
		margin: 0;
		transition: all 0.3s cubic-bezier(0, 0, 0, 1);
	}

	.loading {
		opacity: 0.5;
		transform: translateY(20px);
	}
</style>

<script lang="ts" context="module">
	import { afterNavigate } from '$app/navigation';
	import { session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Footer from '$components/complexes/Footer.svelte';
	import MessagesOutlet from '$components/complexes/MessagesOutlet.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { authModal } from '$stores/auth';
	import '$styles/app.postcss';
	import '$styles/helpers.postcss';
	import '$styles/vars.css';
	import { db, getUserRole } from '$utils/database';
	import { SearchParamsKeys } from '$utils/url';
	import { toUserRoleEnum } from '$utils/user';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	/**
	 * Updating the client session's prevUrl used for redirects on guard fail.
	 */
	afterNavigate(({ from, to }) => {
		const newPrevUrl = to;
		newPrevUrl.searchParams.delete(SearchParamsKeys.AuthModal);
		session.update((prev) => ({ ...prev, prevUrl: newPrevUrl.toString() }));
		console.log('After navigate session:', $session);
	});

	/**
	 * Listening to and handling client-side Supabase auth state change.
	 */
	db.auth.onAuthStateChange(async (e, s) => {
		if (e === 'SIGNED_OUT') {
			session.update((prevSession) => {
				const rootPath = new URL(prevSession.prevUrl).hostname;
				return { ...prevSession, prevUrl: rootPath, user: null };
			});
		} else {
			const role = toUserRoleEnum(await getUserRole());
			session.update((prevSession) => ({ ...prevSession, user: { ...s.user, role } }));
		}
	});

	let loaded = false;
	let navbarHeight: number;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 500);
	});
</script>

<Navbar bind:navbarHeight />
<main style:--navbar-height="{navbarHeight}px">
	<slot />
</main>
<!-- To do: figure out how to properly place footer for fullscreen / explore views(s) -->
<Footer />
<!-- Add general modal / message outlet -->
{#if $authModal}
	<Auth />
{/if}
{#if !loaded}
	<Loading style="position: fixed; top:0; left: 0; width: 100vw; height: 100vh" size="2rem" />
{/if}
<MessagesOutlet />

<style lang="postcss">
	main {
		position: relative;
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
	}
</style>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { guard } from '$utils/guard';

	export const load: Load = async ({ url, session }) => {
		const pass = guard({ url, session });
		if (!pass) {
			authModal.set(true);
			return {
				status: 303,
				redirect: session.prevnav || '/',
			};
		}
		return {
			status: 200,
			props: {
				prevnav: url.pathname,
			},
		};
	};
</script>

<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Searchbar from '$components/complexes/Searchbar.svelte';
	import { route } from '$stores/route';
	import Auth from '$components/complexes/Auth.svelte';
	import { db, getUserProfile } from '$utils/database';
	import { authModal } from '$stores/auth';
	import { onMount } from 'svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import { getSegments } from '$utils/helpers/url';

	export let prevnav: string;

	$: if (browser && $session.prevnav !== prevnav) {
		session.update((s) => ({ ...s, prevnav }));
	}

	db.auth.onAuthStateChange(async (e, s) => {
		// loading = true;
		if (e === 'SIGNED_OUT') {
			session.update((ps) => ({ ...ps, prevnav: '/', user: null, profile: null }));
		} else {
			const profile = await getUserProfile();
			session.update((ps) => ({ ...ps, user: s.user, profile }));
		}
		// loading = false;
	});
</script>

<header>
	<Navbar />
	{#if $route?.searchable}
		<Searchbar />
	{/if}
</header>
<!-- To do: add transition between toproutes -->
<slot />
{#if $authModal}
	<Auth />
{/if}

<style lang="postcss">
	header {
		position: sticky;
		top: 0;
		padding: 0 1.5rem;
		margin: 0;
		border-bottom: 1px solid var(--color-light-500);
		z-index: 1;
		backdrop-filter: blur(12px);
	}
</style>

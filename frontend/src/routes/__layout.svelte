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
	import Nav from '$components/complexes/Nav.svelte';
	import Search from '$components/complexes/Search.svelte';
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
	<Nav />
	{#if $route?.searchable}
		<Search />
	{/if}
</header>
<!-- To do: add transition between toproutes -->
<slot />
{#if $authModal}
	<Auth />
{/if}

<style lang="postcss">
	/* main {
		position: relative;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
	} */
</style>

<script lang="ts" context="module">
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Searchbar from '$components/complexes/Searchbar.svelte';
	import { authModal } from '$stores/auth';
	import { route } from '$stores/route';
	import '$styles/app.postcss';
	import '$styles/scrollbars.postcss';
	import '$styles/vars.css';
	import { db, getUserProfile } from '$utils/database';
	import { UserRole } from '$utils/user';
	import type { Load } from '@sveltejs/kit';

	const guards = [UserRole.Anon];

	export const load: Load = async ({ url, session }) => {
		// const pass = guard({ guards, session });
		// if (!pass) {
		// 	authModal.set(true);
		// 	return {
		// 		status: 303,
		// 		redirect: session.prevnav || '/',
		// 	};
		// }
		return {
			status: 200,
			props: {
				prevnav: url.pathname,
			},
		};
	};
</script>

<script lang="ts">
	export let prevnav: string;

	$: if (browser && $session.prevnav !== prevnav) {
		session.update((s) => ({ ...s, prevnav }));
	}

	db.auth.onAuthStateChange(async (e, s) => {
		if (e === 'SIGNED_OUT') {
			session.update((ps) => ({ ...ps, prevnav: '/', user: null, profile: null }));
		} else {
			const profile = await getUserProfile();
			session.update((ps) => ({ ...ps, user: s.user, profile }));
		}
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

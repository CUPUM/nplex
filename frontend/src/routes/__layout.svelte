<script lang="ts" context="module">
	import { session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Searchbar from '$components/complexes/Searchbar.svelte';
	import { authModal } from '$stores/auth';
	import { showSearchbar } from '$stores/search';
	import '$styles/app.postcss';
	import '$styles/scrollbars.postcss';
	import '$styles/vars.css';
	import { db, getUserProfile } from '$utils/database';
	import { guard } from '$utils/guard';
	import { UserRole } from '$utils/user';
	import type { Load } from '@sveltejs/kit';

	const allowedRoles = [UserRole.Anon];

	export const load: Load = async ({ url, session, stuff }) => {
		console.log(stuff);
		return await guard({ allowedRoles, session, url, stuff });
	};
</script>

<script lang="ts">
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
	{#if $showSearchbar}
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

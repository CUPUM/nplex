<script lang="ts" context="module">
	import { session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Searchbar from '$components/complexes/Searchbar.svelte';
	import { signInModal } from '$stores/auth';
	import { showSearchbar } from '$stores/search';
	import '$styles/app.postcss';
	import '$styles/scrollbars.postcss';
	import '$styles/vars.css';
	import { db, getUserRole } from '$utils/database';
	import { toUserRoleEnum } from '$utils/user';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		// This load function triggers the "getSesion" server hook, allowing us to update the session's prevUrl from within the hook.
		return {
			status: 200,
		};
	};
</script>

<script lang="ts">
	db.auth.onAuthStateChange(async (e, s) => {
		if (e === 'SIGNED_OUT') {
			session.update((prevSession) => ({ ...prevSession, prevnav: '/', user: null, profile: null }));
		} else {
			const role = toUserRoleEnum(await getUserRole());
			session.update((prevSession) => ({ ...prevSession, user: { ...s.user, role } }));
		}
	});
</script>

<header>
	<Navbar />
	{#if $showSearchbar}
		<Searchbar />
	{/if}
</header>
<slot />
{#if $signInModal}
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

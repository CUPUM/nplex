<script lang="ts" context="module">
	import { session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import { signInModal } from '$stores/auth';
	import '$styles/app.postcss';
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
			session.update((prevSession) => ({ ...prevSession, prevPath: '/', user: null }));
		} else {
			const role = toUserRoleEnum(await getUserRole());
			session.update((prevSession) => ({ ...prevSession, user: { ...s.user, role } }));
		}
	});

	let navbarHeight: number;
</script>

<Navbar bind:navbarHeight />
<main style:--navbar-height="{navbarHeight}px">
	<slot />
</main>
{#if $signInModal}
	<Auth />
{/if}

<style lang="postcss">
	main {
		position: relative;
		width: 100%;
		flex: none;
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
	}
</style>

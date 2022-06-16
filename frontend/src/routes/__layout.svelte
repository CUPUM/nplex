<script lang="ts" context="module">
	import { session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { authModal } from '$stores/auth';
	import '$styles/app.css';
	import '$styles/helpers.postcss';
	import '$styles/vars.css';
	import { db, getUserRole } from '$utils/database';
	import { toUserRoleEnum } from '$utils/user';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	/**
	 * Must keep `url` as a param to trigger on each navigation.
	 */
	export const load: Load = async ({ session, url }) => {
		// console.log(session.prevUrl);
		// This load function triggers the "getSesion" server hook, allowing us to update the session's prevUrl from within the hook.
		return {
			status: 200,
		};
	};
</script>

<script lang="ts">
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
<!-- <Footer /> -->
<!-- Add general modal / message outlet -->
{#if $authModal}
	<Auth />
{/if}
{#if !loaded}
	<Loading size="2rem" />
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

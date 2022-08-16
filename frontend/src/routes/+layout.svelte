<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { page, session } from '$app/stores';
	// import AuthModal from '$components/complexes/AuthModal.svelte';
	// import Footer from '$components/complexes/Footer.svelte';
	// import MessagesOutlet from '$components/complexes/MessagesOutlet.svelte';
	// import Navbar from '$components/complexes/Navbar.svelte';
	// import Loading from '$components/primitives/Loading.svelte';
	// import { authModal } from '$stores/auth';
	// import { backgroundColor } from '$stores/backgroundColor';
	// import '$styles/app.scss';
	// import '$styles/vars.css';
	// import { sizes } from '$utils/values/sizes';
	// import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	// import { onMount } from 'svelte';

	// export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
	// 	return {
	// 		stuff: {
	// 			showFooter: true,
	// 		},
	// 	};
	// }
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { handleAuthStateChange } from '$utils/database/auth';
	import { browserDbClient } from '$utils/database/database';
	import { SearchParam } from '$utils/values/keys';

	let loading = true;
	let navbarHeight: number = 0;

	afterNavigate(({ from, to }) => {
		const newPreviousUrl = to;
		newPreviousUrl.searchParams.delete(SearchParam.AuthModal);
		session.update((prev) => ({ ...prev, previousUrl: newPreviousUrl.toString() }));
	});

	// To do: instanciate a poller to auto-refresh tokens by hitting api.

	// Listening to and handling client-side Supabase auth state change.
	browserDbClient.auth.onAuthStateChange(async (e, s) => {
		await handleAuthStateChange(e, s);
	});

	onMount(() => {
		backgroundColor.init();
		loading = false;
	});
</script>

<Navbar bind:navbarHeight />
<main style:--navbar-height="{navbarHeight || 0}px" class:loading>
	<slot />
</main>
{#if $page.stuff.showFooter}
	<Footer />
{/if}
{#if $authModal}
	<AuthModal />
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
		opacity: 0;
		// transform: translateY(20px);
	}
</style>

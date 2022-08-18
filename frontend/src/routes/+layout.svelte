<script lang="ts">
	import { page } from '$app/stores';
	import Loading from '$components/primitives/Loading.svelte';
	import { authModal } from '$stores/auth';
	import '$styles/app.scss';
	import '$styles/vars.css';
	import { sizes } from '$utils/values/sizes';
	import { onMount } from 'svelte';
	import AuthModal from './AuthModal.svelte';
	import Footer from './Footer.svelte';
	import MessagesOutlet from './MessagesOutlet.svelte';
	import Navbar from './Navbar.svelte';

	let loading = true;
	let navbarHeight: number = 0;

	// afterNavigate(({ from, to }) => {
	// 	const newPreviousUrl = to;
	// 	newPreviousUrl.searchParams.delete(SearchParam.AuthModal);
	// 	session.update((prev) => ({ ...prev, previousUrl: newPreviousUrl.toString() }));
	// });

	// To do: instanciate a poller to auto-refresh tokens by hitting api.

	// Listening to and handling client-side Supabase auth state change.
	// browserDbClient.auth.onAuthStateChange(async (e, s) => {
	// 	await handleAuthStateChange(e, s);
	// });

	onMount(() => {
		loading = false;
	});
</script>

<Navbar bind:navbarHeight />
<main style:--navbar-height="{navbarHeight || 0}px" class:loading>
	<slot />
</main>
{#if $page.data.showFooter}
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
	}
</style>

<script lang="ts" context="module">
	import { page } from '$app/stores';
	import AuthModal from '$components/complexes/AuthModal.svelte';
	import Footer from '$components/complexes/Footer.svelte';
	import MessagesOutlet from '$components/complexes/MessagesOutlet.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { authModal } from '$stores/auth';
	import { backgroundColor } from '$stores/backgroundColor';
	import '$styles/app.scss';
	import '$styles/helpers.scss';
	import '$styles/vars.css';
	import { browserDbClient, handleAuthStateChange } from '$utils/database';
	import { sizes } from '$utils/sizes';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export async function load({ stuff, session }: LoadEvent): Promise<LoadOutput> {
		console.log('Running: root layout load function.', stuff, session);
		return {
			stuff: {
				showFooter: true,
			},
		};
	}
</script>

<script lang="ts">
	let loading = true;
	let navbarHeight: number = 0;

	// Listening to and handling client-side Supabase auth state change.
	browserDbClient.auth.onAuthStateChange(async (e, s) => {
		await handleAuthStateChange(e, s);
	});

	// To figure out: On initializing the website client-side, attempt to login with previously set token / session.
	// browserDbClient.auth.refreshSession();

	onMount(() => {
		backgroundColor.init();
		loading = false;
	});
</script>

<Navbar bind:navbarHeight />
<main style:--navbar-height="{navbarHeight}px" class:loading>
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
		opacity: 0.5;
		transform: translateY(20px);
	}
</style>

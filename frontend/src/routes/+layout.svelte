<script lang="ts">
	import { afterNavigate, beforeNavigate, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Loading from '$components/Loading.svelte';
	import LoadingProgress from '$components/LoadingProgress.svelte';
	import '$styles/app.scss';
	import '$styles/themes.scss';
	import '$styles/vars.scss';
	import { dbClient } from '$utils/database';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import AuthModal, { authModalState } from './AuthModal.svelte';
	import Footer from './Footer.svelte';
	import MessagesOutlet from './MessagesOutlet.svelte';
	import Navbar from './Navbar.svelte';

	export let data: LayoutData;

	let progress: LoadingProgress;
	let loading = true;
	let navbarHeight: number = 0;
	let scrollY = 0;

	onMount(() => {
		const db = dbClient.browser.auth.onAuthStateChange(() => {
			invalidate('/api/auth/session.json');
		});
		return () => {
			db.data.subscription.unsubscribe();
		};
	});

	// Client-side redirect to user's account page if logged into new session.
	// $: if (data.session && data.session.id !== data.previousSessionId && $authModalState) {
	// 	authModalState.close({ url: $page.url.pathname === '/' ? '/compte' : $page.url });
	// }

	beforeNavigate(() => {
		progress.start();
	});

	afterNavigate(() => {
		loading = false;
		progress.complete();
	});
</script>

<svelte:window bind:scrollY />

<div
	class="container"
	class:authing={$authModalState}
	style:--scroll={scrollY}
	style:--scroll-px="{scrollY}px"
	style:--navbar-height-px="{navbarHeight}px"
	style:--n-navbar-height-px="-{navbarHeight}px"
>
	<Navbar bind:navbarHeight />
	<main class:loading>
		<slot />
	</main>
	{#if $page.data.showFooter}
		<Footer />
	{/if}
</div>
{#if loading}
	<Loading class="loader" />
{/if}
<AuthModal />
<MessagesOutlet />
<LoadingProgress bind:this={progress} />

<style lang="scss" module>
	.container {
		transform-origin: 50vw calc(var(--scroll-px) + 50vh);
		transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1);
	}

	main {
		--scroll-color: rgb(var(--rgb-fg-100), 0.1);
		position: relative;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		padding: 0;
		margin: 0;
	}

	.authing {
		transform: scale(0.96);
		// filter: blur(2px);
		// border-radius: 1rem;
	}

	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		color: var(--color-primary-700);
	}

	.loading {
		opacity: 0;
	}
</style>

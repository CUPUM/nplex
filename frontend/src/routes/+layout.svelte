<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
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
	let mounted = false;

	if (browser) {
		dbClient.browser.auth.onAuthStateChange(() => {
			// See if this can safely be omitted since technically the browser client is not logged in.
			invalidate('/api/auth/session.json');
		});
	}

	onMount(() => {
		mounted = true;
	});

	beforeNavigate(() => {
		loading = true;
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
	class:hidden={!mounted}
	class:authing={$authModalState}
	style:--scroll={scrollY}
	style:--scroll-px="{scrollY}px"
	style:--navbar-height-px="{navbarHeight}px"
	style:--n-navbar-height-px="-{navbarHeight}px"
>
	<Navbar bind:navbarHeight />
	<main>
		<slot />
	</main>
	{#if $page.data.showFooter}
		<Footer />
	{/if}
</div>
<div class="border" class:authing={$authModalState} />
<!-- {#if loading}
	<Loading class="loader" />
{/if} -->
<AuthModal />
<MessagesOutlet />
<LoadingProgress bind:this={progress} />

<style lang="scss" module>
	.container {
		position: relative;
		transform-origin: 50vw calc(var(--scroll-px) + 50vh);
		transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1), opacity 0.5s ease-out;
		&.hidden {
			transform: scale(1.06);
			opacity: 0;
		}
		&.authing {
			transform: scale(0.96);
			// border-radius: 1rem;
		}
	}

	.border {
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		user-select: none;
		color: col(bg, 300);
		box-shadow: 0 0 0 2rem currentColor;
		transition: all 0.5s cubic-bezier(0.2, 0, 0, 1);
		&.authing {
			transform: scale(0.96);
			width: calc(100vw - var(--scroll-size));
			border-radius: 2rem;
		}
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

	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		color: var(--color-primary-700);
	}
</style>

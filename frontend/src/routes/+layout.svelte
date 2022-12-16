<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import LoadingProgress from '$components/LoadingProgress.svelte';
	import MessagesOutlet from '$routes/MessagesOutlet.svelte';
	import '$styles/app.scss';
	import '$styles/resets.scss';
	import '$styles/themes.css';
	import '$styles/vars.scss';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import AuthModal, { authModal } from './AuthModal.svelte';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';
	import RootTheme from './RootTheme.svelte';

	export let data: LayoutData;

	let progress: LoadingProgress;
	let loading = true;
	let navbarHeight: number = 0;
	let scrollY = 0;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	beforeNavigate(() => {
		loading = true;
		progress?.start?.();
	});

	afterNavigate(() => {
		loading = false;
		progress?.complete?.();
	});
</script>

<svelte:window bind:scrollY />

<RootTheme />
<div
	class="container"
	class:hidden={!mounted}
	class:authing={$authModal}
	style:--scroll={scrollY}
	style:--scroll-px="{scrollY}px"
	style:--navbar-height-px="{navbarHeight}px"
>
	<Navbar bind:navbarHeight />
	<main>
		<slot />
	</main>
	{#if $page.data.showFooter}
		<Footer />
	{/if}
</div>
<div class="border" class:authing={$authModal} />
<AuthModal />
<MessagesOutlet />
<LoadingProgress bind:this={progress} />

<style lang="scss" module>
	.container {
		position: relative;
		transform-origin: 50vw calc(var(--scroll-px) + 50vh);
		transition: transform 0.35s cubic-bezier(0.2, 0, 0.2, 1.2), opacity 0.5s ease-out;
		&.hidden {
			transform: scale(0.98);
			opacity: 0;
		}
		&.authing {
			transform: scale(0.94);
		}
	}

	.border {
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		pointer-events: none;
		user-select: none;
		color: col(bg, 300);
		box-shadow: 0 0 0 10rem currentColor;
		transition: border-radius 0.35s cubic-bezier(0.2, 0, 0, 1),
			transform 0.35s cubic-bezier(0.2, 0, 0.2, 1.2);
		&.authing {
			transform: scale(0.94);
			width: calc(100vw - var(--ui-scroll-size));
			border-radius: var(--ui-radius-xl);
			color: col(bg, 900);
		}
	}

	main {
		--ui-scroll-color: col(fg, 100, 0.1);
		--ui-scroll-size: 3px;
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
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
		font-size: var(--ui-text-xl);
		opacity: 0.2;
	}
</style>

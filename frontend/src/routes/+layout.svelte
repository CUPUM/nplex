<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Logo from '$components/Logo.svelte';
	import ModalOutlet from '$components/Modal/ModalOutlet.svelte';
	import MessagesOutlet from '$routes/MessagesOutlet.svelte';
	import Navbar from '$routes/Navbar.svelte';
	import ProgressBar from '$routes/ProgressBar.svelte';
	import '$styles/app.scss';
	import '$styles/reset.scss';
	import '$styles/themes.css';
	import '$styles/vars.scss';
	import { browserDb } from '$utils/database/client';
	import type { LayoutData } from './$types';
	import AuthModal, { authModal } from './AuthModal.svelte';
	import Footer from './Footer.svelte';

	export let data: LayoutData;

	let scrollY = 0;

	if (browser) {
		// Initialize the client-side db auth based on the session extracted from cookies, if any.
		if (data.session) {
			browserDb.auth.setSession(data.session);
			browserDb.auth.signInWithPassword;
		}
	}

	beforeNavigate((navigation) => {
		if (navigation.from?.route.id !== navigation.to?.route.id) {
			if (browser) {
				document.documentElement.style.scrollBehavior = 'initial';
			}
		}
	});

	afterNavigate((navigation) => {
		if (browser) {
			document.documentElement.style.scrollBehavior = '';
		}
	});
</script>

<svelte:window bind:scrollY />

<Logo />
<div
	class="container"
	class:authing={$authModal}
	style:--ui-scroll={scrollY}
	style:--ui-scroll-y="{scrollY}px"
>
	<Navbar />
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
<ModalOutlet />
<ProgressBar />

<style lang="scss" module>
	.container {
		position: relative;
		transform-origin: 50vw calc(var(--ui-scroll-y) + 50vh);
		transform: scale(1);
		transition: transform 0.25s var(--ui-ease-out);
		&.authing {
			transform: scale(0.96);
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
		transition: border-radius 0.25s var(--ui-ease-out), transform 0.25s var(--ui-ease-out);
		&.authing {
			transform: scale(0.96);
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
		font-size: var(--ui-text-2xl);
		opacity: 0.2;
	}
</style>

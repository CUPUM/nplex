<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Logo from '$components/Logo.svelte';
	import ModalOutlet from '$components/Modal/ModalOutlet.svelte';
	import MessagesOutlet, { messages } from '$routes/MessagesOutlet.svelte';
	import ProgressBar from '$routes/ProgressBar.svelte';
	import { rootScroll } from '$stores/rootScroll';
	import '$styles/app.scss';
	import { browserDb } from '$utils/database/client';
	import 'overlayscrollbars/overlayscrollbars.css';
	import AuthModal, { authModal } from './AuthModal.svelte';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';

	export let data;

	let scrollY = 0;

	if (browser) {
		rootScroll.init();
		if (data.session) {
			// Initialize the client-side db auth based on the session extracted from cookies, if any.
			browserDb.auth.setSession(data.session);
		}
	}

	// Catch and dispatch acion error messages.
	$: if ($page.form?.messages?.error?.length) {
		messages.error(...$page.form.messages.error);
	}
	$: if ($page.form?.messages?.success?.length) {
		messages.success(...$page.form.messages.success);
	}
	$: if ($page.form?.messages?.normal?.length) {
		messages.dispatch(...$page.form.messages.normal);
	}

	beforeNavigate((navigation) => {
		if (navigation.from?.url.pathname != navigation.to?.url.pathname) {
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
	style:--ui-scroll-px="{scrollY}px"
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
		transform-origin: 50vw calc(var(--ui-scroll-px) + 50vh);
		transform: scale(1);
		transition: transform 0.35s var(--ui-ease-out);
		&.authing {
			transform: scale(0.96);
			// filter: blur(2px);
		}
	}

	.border {
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		user-select: none;
		color: col(bg, 300);
		box-shadow: 0 0 0 10rem currentColor;
		transition: border-radius 0.25s var(--ui-ease-out), transform 0.35s var(--ui-ease-out);
		&.authing {
			transform: scale(0.96);
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
</style>

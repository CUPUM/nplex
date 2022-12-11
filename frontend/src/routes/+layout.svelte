<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import LoadingProgress from '$components/LoadingProgress.svelte';
	import AppMessagesOutlet from '$routes/AppMessagesOutlet.svelte';
	import '$styles/app.scss';
	import '$styles/resets.scss';
	import '$styles/themes.css';
	import '$styles/vars.scss';
	import { browserDb } from '$utils/database';
	import { LoadDependency } from '$utils/enums';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import AppAuthModal, { authModal } from './AppAuthModal.svelte';
	import AppFooter from './AppFooter.svelte';
	import AppNavbar from './AppNavbar.svelte';
	import AppRootTheme from './AppRootTheme.svelte';

	export let data: LayoutData;

	let progress: LoadingProgress;
	let loading = true;
	let navbarHeight: number = 0;
	let scrollY = 0;
	let mounted = false;

	if (browser) {
		browserDb.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN' && session?.user.id === data.session?.user.id) {
				// Because tab switch fires a SIGNED_IN event and causes unwarranted page invalidation.
				return;
			}
			invalidate(LoadDependency.Session);
		});
	}

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

<AppRootTheme />
<div
	class="container"
	class:hidden={!mounted}
	class:authing={$authModal}
	style:--scroll={scrollY}
	style:--scroll-px="{scrollY}px"
	style:--navbar-height-px="{navbarHeight}px"
>
	<AppNavbar bind:navbarHeight />
	<main>
		<slot />
	</main>
	{#if $page.data.showFooter}
		<AppFooter />
	{/if}
</div>
<div class="border" class:authing={$authModal} />
<AppAuthModal />
<AppMessagesOutlet />
<LoadingProgress bind:this={progress} />

<style lang="scss" module>
	.container {
		position: relative;
		transform-origin: 50vw calc(var(--scroll-px) + 50vh);
		transition: transform 0.35s cubic-bezier(0.2, 0, 0, 1), opacity 0.5s ease-out;
		&.hidden {
			transform: scale(1.04);
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
			transform 0.35s cubic-bezier(0.2, 0, 0, 1);
		&.authing {
			transform: scale(0.94);
			width: calc(100vw - var(--ui-scroll-size));
			border-radius: 1.5rem;
			color: col(bg, 900);
		}
	}

	main {
		--ui-scroll-color: col(fg, 100, 0.1);
		--ui-scroll-size: 3px;
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
		font-size: var(--ui-text-xl);
		opacity: 0.2;
	}
</style>

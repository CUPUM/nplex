<!--
	@component
	## Navbar
	Main navigation bar singleton located in the app's root layout.

-->
<script lang="ts" context="module">
	// export const backgroundOpacity = (function () {
	// 	const init = 0.75;
	// 	const { subscribe, set } = writable(init);
	// 	return {
	// 		subscribe,
	// 		set,
	// 		reset: () => set(init),
	// 	};
	// })();

	export const navbarTheme = (function () {
		const { subscribe, set } = writable<ValueOf<typeof Theme> | null>(null);
		return {
			subscribe,
			set,
			reset: () => set(null),
		};
	})();

	export const navbarBackground = (function () {
		const { subscribe, set } = writable<string | null>(null);
		return {
			subscribe,
			set,
			reset: () => set(null),
		};
	})();
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import DropdownArrow from '$components/DropdownArrow.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { rootScroll } from '$stores/scroll';
	import type { Theme } from '$utils/enums';
	import { creationBaseRoute, exploreRoutes, mainRoutes } from '$utils/routes';
	import { writable } from 'svelte/store';
	import type { ValueOf } from 'ts-essentials';
	import { authModalState } from './AuthModal.svelte';
	import NavbarButton from './NavbarButton.svelte';
	import NavbarEditMenu from './NavbarEditMenu.svelte';
	import NavbarUserMenu from './NavbarUserMenu.svelte';

	export let navbarHeight = 0;

	let hidden: boolean;
	let rootPathname: string;
	let thres = navbarHeight || 40;
	let loadingCategoryPath: string | null = '';

	beforeNavigate(({ to }) => {
		if (to && exploreRoutes.map((r) => r.pathname).includes(to.url.pathname)) {
			loadingCategoryPath = to.url.pathname;
		}
	});

	afterNavigate(() => {
		loadingCategoryPath = null;
	});

	$: overlay = $rootScroll.y > thres * 2;
	$: hidden = $rootScroll.down && $rootScroll.y > thres;
	$: rootPathname = $page.data.category ? '/' : '/' + $page.url.pathname.split('/', 2)[1];
</script>

<header class={$navbarTheme ?? ''} class:hidden class:overlay bind:clientHeight={navbarHeight}>
	<div class="wrapper">
		<nav class="main">
			<NavbarButton equi href="/">
				<Logo short style="font-size: larger" />
			</NavbarButton>
			{#each mainRoutes as route}
				<NavbarButton href={route.pathname} current={route.pathname === rootPathname}>
					{route.title}
				</NavbarButton>
			{/each}
		</nav>
		<nav class="category">
			{#each exploreRoutes as r}
				<NavbarButton href={r.pathname} current={$page.url.pathname.startsWith(r.pathname)}>
					{r.title}
				</NavbarButton>
			{/each}
		</nav>
		<nav class="session">
			{#if $page.data.session}
				<Popover place="bottom" align="end" hover let:open>
					<NavbarButton
						slot="control"
						href={creationBaseRoute.pathname}
						current={$page.url.pathname.startsWith(creationBaseRoute.pathname)}
						active={open}
					>
						<Icon name="pen" style="font-size: 1.25em" />
						&emsp;Zone d'édition&emsp;
						<DropdownArrow style="font-size: 1.25em" active={open} />
					</NavbarButton>
					<NavbarEditMenu />
				</Popover>
				<Popover hover place="bottom" align="end">
					<Button slot="control">Hoy !</Button>
					<!-- <AvatarButton slot="control" href={userBaseRoute.pathname} /> -->
					<NavbarUserMenu />
				</Popover>
			{:else}
				<NavbarButton equi cta href={authModalState.getUrl({ url: $page.url }).toString()}>
					<Icon name="user" thickness="1.5" style="font-size: 1.25em" />
				</NavbarButton>
			{/if}
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		z-index: 10;
		top: 0;
		padding: 0 1rem;
		margin: 0;
		font-size: small;
		backdrop-filter: blur(12px);
		border-bottom: 0px solid transparent;
		transform-origin: top center;
		transition: transform 0.5s cubic-bezier(0.5, 0, 0, 1), opacity 0.5s ease-in-out;

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			padding: 0;
			margin: 0;
			top: 0;
			left: 0;
			opacity: min(calc(0.002 * var(--scroll)), 0.9);
			background: col(bg, 300);
			transition: all 0.2s ease-in-out;
		}
	}

	.wrapper {
		position: relative;
		max-width: var(--ui-large);
		display: grid;
		grid-template-columns:
			[full-start main-start]
			1fr
			[main-end category-start]
			auto
			[category-end session-start]
			1fr
			[session-end full-end];
		grid-auto-flow: dense;
		padding: 0.5rem 0;
		margin: 0 auto;
		flex-direction: row;
		align-items: stretch;
		gap: 3rem;
		@include mobile {
			grid-template-columns:
				[full-start main-start]
				1fr
				[main-end category-start]
				1fr
				[category-end session-start]
				1fr
				[session-end full-end];
		}
	}

	.hidden {
		transform: translateY(-101%);
		// opacity: 0;
		pointer-events: none;
	}

	.main,
	.category,
	.session {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0px;
		@include mobile {
			flex-direction: column;
		}
	}
	.main {
		grid-column: main;
		justify-content: flex-start;
	}
	.category {
		--inset: 3px;
		grid-column: category;
		justify-content: center;
		background: col(bg, 900, 0.25);
		border-radius: var(--ui-radius);
		padding-inline: var(--inset);
	}
	.session {
		grid-column: session;
		justify-content: flex-end;
	}
</style>

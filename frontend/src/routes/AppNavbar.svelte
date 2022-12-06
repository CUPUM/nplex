<!--
	@component
	## Navbar
	Main navigation bar singleton located in the app's root layout.

-->
<script lang="ts" context="module">
	export const navbarTheme = (function () {
		const { subscribe, set } = writable<ValueOf<typeof ThemeClass> | null>(null);
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
	import Avatar from '$components/Avatar.svelte';
	import DropdownArrow from '$components/DropdownArrow.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { creationBaseRoute, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routes';
	import { writable } from 'svelte/store';
	import type { ValueOf } from 'ts-essentials';
	import { authModalState } from './AppAuthModal.svelte';
	import AppNavbarButton from './AppNavbarButton.svelte';
	import AppNavbarEditMenu from './AppNavbarEditMenu.svelte';
	import AppNavbarUserMenu from './AppNavbarUserMenu.svelte';
	import type { ThemeClass } from './AppThemes.svelte';

	export let navbarHeight = 0;

	let hidden: boolean;
	let overlay: boolean;
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

	// $: overlay = $rootScroll.y > thres * 2;
	// $: hidden = $rootScroll.down && $rootScroll.y > thres;
	$: rootPathname = $page.data.category ? '/' : '/' + $page.url.pathname.split('/', 2)[1];
</script>

<header class={$navbarTheme ?? ''} class:hidden class:overlay bind:clientHeight={navbarHeight}>
	<div class="wrapper">
		<nav class="main">
			<AppNavbarButton equi href="/">
				<Logo short style="font-size: larger" />
			</AppNavbarButton>
			{#each mainRoutes as route}
				<AppNavbarButton href={route.pathname} current={route.pathname === rootPathname}>
					{route.title}
				</AppNavbarButton>
			{/each}
		</nav>
		<nav class="category nest">
			{#each exploreRoutes as r}
				<AppNavbarButton
					href={r.pathname}
					current={$page.url.pathname.startsWith(r.pathname)}
				>
					{r.title}
				</AppNavbarButton>
			{/each}
		</nav>
		<nav class="session">
			{#if $page.data.session}
				<Popover place="bottom" align="end" hover let:open>
					<AppNavbarButton
						slot="control"
						href={creationBaseRoute.pathname}
						current={$page.url.pathname.startsWith(creationBaseRoute.pathname)}
						active={open}
					>
						<Icon name="pen" style="font-size: 1.25em" />
						&emsp;Éditer&emsp;
						<DropdownArrow style="font-size: 1.25em" active={open} />
					</AppNavbarButton>
					<AppNavbarEditMenu />
				</Popover>
				<Popover hover place="bottom" align="end" let:open>
					<Avatar
						active={open}
						slot="control"
						data={$page.data.session.user}
						href={userBaseRoute.pathname}
					/>
					<AppNavbarUserMenu />
				</Popover>
			{:else}
				<AppNavbarButton
					equi
					cta
					href={authModalState.getUrl({ url: $page.url }).toString()}
				>
					<Icon name="user" thickness="1.5" style="font-size: 1.25em" />
				</AppNavbarButton>
			{/if}
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		// position: relative;
		z-index: 10;
		top: 0;
		padding: 0 1rem;
		margin: 0;
		font-size: small;
		// backdrop-filter: blur(12px);
		// border-bottom: 1px solid col(fg, 100, min(0.05, calc(var(--scroll) * 0.0002)));
		// border-radius: var(--ui-radius-large);
		// border-top-left-radius: 0;
		// border-top-right-radius: 0;
		// transform-origin: top center;
		// transition: transform 0.35s cubic-bezier(0.5, 0, 0.2, 1), border 0.25s;

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			padding: 0;
			margin: 0;
			top: 0;
			left: 0;
			opacity: min(calc(0.005 * var(--scroll)), 1);
			background: col(bg, 300);
		}
	}

	.wrapper {
		position: relative;
		max-width: var(--ui-display-large);
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
		transform: translateY(calc(-100% - 1px));
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
		--radius: var(--ui-radius-md);
		grid-column: category;
		justify-content: center;
		background: col(bg, 000, 0.5);
		border-radius: var(--radius);
		padding-inline: var(--inset);
	}
	.session {
		grid-column: session;
		justify-content: flex-end;
	}
</style>

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

	// export const backgroundColor = (function () {
	// 	const { subscribe, set } = writable(null);
	// 	return {
	// 		subscribe,
	// 		set,
	// 		reset: () => set(null),
	// 	};
	// })();
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import AvatarButton from '$components/AvatarButton.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { rootScroll } from '$stores/scroll';
	import { creationBaseRoute, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routes';
	import { getAuthModalUrl } from './AuthModal.svelte';
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

<header class:hidden class:overlay bind:clientHeight={navbarHeight}>
	<div class="wrapper">
		<nav class="main">
			<NavbarButton square href="/">
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
				<Popover place="bottom" align="end" useHover>
					<NavbarButton
						slot="control"
						square
						href={creationBaseRoute.pathname}
						current={$page.url.pathname.startsWith(creationBaseRoute.pathname)}
					>
						<Icon name="pen" style="font-size: 1.25em" />
					</NavbarButton>
					<NavbarEditMenu />
				</Popover>
				<Popover useHover place="bottom" align="end">
					<AvatarButton slot="control" href={userBaseRoute.pathname} />
					<NavbarUserMenu />
				</Popover>
			{:else}
				<NavbarButton square cta href={getAuthModalUrl($page.url).search}>
					<Icon name="user" thickness="1.5" style="font-size: 1.25em" />
				</NavbarButton>
			{/if}
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		z-index: 1000;
		top: 0;
		padding: 0 1rem;
		margin: 0;
		font-size: small;
		backdrop-filter: blur(8px);
		border-bottom: 0px solid transparent;
		transition: transform 0.5s cubic-bezier(0.75, 0, 0, 1), border 1s ease-in-out;

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			padding: 0;
			margin: 0;
			opacity: 0.85;
			top: 0;
			left: 0;
			background: var(--bg, var(--color-base-300));
			transition: all 0.15s;
		}
	}

	.wrapper {
		position: relative;
		max-width: 1200px;
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

	.overlay {
		border-bottom: 1px solid rgb(var(--rgb-contrast-100), 0.1);
	}

	.hidden {
		transform: translateY(-101%);
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
		background: rgb(var(--rgb-base-900), 0.25);
		border-radius: var(--ui-radius);
		padding-inline: var(--inset);
	}
	.session {
		grid-column: session;
		justify-content: flex-end;
	}
</style>

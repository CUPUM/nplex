<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import { mainScroll } from '$stores/scroll';
	import { getAuthRedirectUrl } from '$utils/routing/guard';
	import { gotoCategory } from '$utils/routing/navigation';
	import { creationBaseRoute, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routing/routes';
	import { onMount } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Button from '../components/primitives/Button.svelte';
	import NavbarEditMenu from './NavbarEditMenu.svelte';
	import NavbarUserMenu from './NavbarUserMenu.svelte';

	export let navbarHeight;

	let mounted = false;
	let hidden;
	let overlay;
	let mainPathname: string;
	let yThreshold = navbarHeight || 40;
	let loadingExplore = null;

	beforeNavigate(({ to }) => {
		if (exploreRoutes.map((r) => r.pathname).includes(to.url.pathname)) {
			loadingExplore = to.url.pathname;
		}
	});

	afterNavigate(() => {
		loadingExplore = null;
	});

	$: hidden = $mainScroll.down && $mainScroll.y > yThreshold;
	$: overlay = $mainScroll.y > yThreshold + 20;
	$: mainPathname = $page.data.category ? '/' : $page.routeId ? '/' + $page.routeId.split('/')[0] : '/';

	onMount(() => {
		mounted = true;
	});
</script>

<header class:hidden class:overlay bind:clientHeight={navbarHeight}>
	{#if mounted}
		<nav
			class="main"
			in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 0 }}
			out:fly={{ y: -20, opacity: 0, duration: 500, easing: expoIn, delay: 0 }}
		>
			<a class="logo" href="/">
				<Logo intro />
			</a>
			{#each mainRoutes as route}
				<Button display="inline" variant="nav" href={route.pathname} active={route.pathname === mainPathname}>
					{route.title}
				</Button>
			{/each}
		</nav>
		<nav class="explore">
			{#if $page.data.showCategoryNav}
				<div transition:fly={{ y: 10, duration: 500 }}>
					<Switch name="category" variant="nav" value={$page.data.category}>
						{#each exploreRoutes as r, i}
							<SwitchItem
								id={r.category}
								value={r.category}
								on:click={() => gotoCategory(r)}
								disabled={r.category === $page.data.category && !$page.data.categoryIsResetable}
								loading={loadingExplore === r.pathname}
							>
								{r.title}
							</SwitchItem>
						{/each}
					</Switch>
				</div>
			{/if}
		</nav>
		<nav
			class="user"
			in:fly={{ y: 20, opacity: 0, duration: 500, easing: expoOut, delay: 300 }}
			out:fly={{ y: 20, opacity: 0, duration: 500, easing: expoIn, delay: 0 }}
		>
			<Button href="/" variant="nav" square disabled={$page.url.pathname === '/'}>
				<Icon name="home" size="1.25em" />
			</Button>
			{#if $page.data.session}
				<Popover place="bottom" align="end" useHover>
					<Button
						slot="control"
						variant="nav"
						square
						href={creationBaseRoute.pathname}
						active={$page.url.pathname.startsWith(creationBaseRoute.pathname)}
					>
						<Icon name="pen" size="1.25em" />
					</Button>
					<NavbarEditMenu />
				</Popover>
				<Popover useHover place="bottom" align="end">
					<AvatarButton slot="control" href={userBaseRoute.pathname} />
					<NavbarUserMenu />
				</Popover>
			{:else}
				<Button variant="nav-cta" href={getAuthRedirectUrl($page.url).toString()} square>
					<Icon name="user" size="1.25em" />
				</Button>
			{/if}
		</nav>
	{/if}
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100vw;
		align-items: stretch;
		padding: 1rem;
		padding-block: 0.5rem;
		margin: 0;
		gap: 0;
		font-size: var(--size-small);
		backdrop-filter: blur(10px);
		z-index: 100;
		transition: all 0.3s cubic-bezier(0, 0, 0, 1);

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			padding: 0;
			margin: 0;
			opacity: 0;
			top: 0;
			left: 0;
			background-color: var(--bg-color);
			transition: all 0.5s ease-in-out;
		}
	}

	.overlay {
		// box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
		&::before {
			opacity: 0.8;
		}
	}

	.hidden {
		box-shadow: 0 0px 0 0 transparent;
		transform: translateY(-101%);
		transform-origin: top center;
		pointer-events: none;
		transition: all 0.3s cubic-bezier(1, 0, 1, 1);
	}

	.logo {
		height: 1.8em;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding-inline: 0.5em 1em;
		// opacity: 1;
		transition: all 0.1s ease-out;

		&:hover {
			// opacity: 1;
			color: var(--color-primary-500);
		}
	}

	nav {
		position: relative;
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0px;
	}

	.main {
		justify-content: flex-start;
	}

	.explore {
		justify-content: center;
	}

	.user {
		justify-content: flex-end;
	}
</style>

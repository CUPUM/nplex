<script lang="ts">
	import { page, session } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { logout } from '$routes/api/auth/logout';
	import { loadingCategory } from '$stores/navigation';
	import { mainScroll } from '$stores/scroll';
	import { colors } from '$utils/colors';
	import { getAuthRedirectUrl } from '$utils/guard';
	import { gotoCategory } from '$utils/navigation';
	import { creationBaseRoute, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routes';
	import { onMount } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import NavbarCreationMenu from './NavbarCreationMenu.svelte';

	export let navbarHeight: number = 0;

	let mounted = false;
	let hidden;
	let overlay;
	let mainPathname: string;
	let categoryGroup;
	const yThreshold = 100;

	$: hidden = $mainScroll.down && $mainScroll.y > yThreshold;
	$: overlay = $mainScroll.y > yThreshold + 100;
	$: mainPathname = $page.stuff.category ? '/' : $page.routeId ? '/' + $page.routeId.split('/')[0] : '/';
	$: categoryGroup = $page.stuff.category;

	onMount(() => {
		mounted = true;
	});
</script>

<header class:hidden class:overlay bind:clientHeight={navbarHeight}>
	{#if mounted}
		<nav
			class="section"
			in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 0 }}
			out:fly={{ y: -20, opacity: 0, duration: 500, easing: expoIn, delay: 0 }}
		>
			<a class="logo" href="/">
				<Logo intro={true} color={colors.dark[900]} hoverColor={colors.primary[500]} />
			</a>
			{#each mainRoutes as route}
				<Button variant="navbar" href={route.pathname} active={route.pathname === mainPathname}>
					{route.title}
				</Button>
			{/each}
		</nav>
		{#if $page.stuff.showCategoryNav}
			<nav
				class="category"
				in:fly={{ y: 20, duration: 500, easing: expoOut, delay: 150 }}
				out:fly={{ y: 20, duration: 500, easing: expoOut, delay: 0 }}
			>
				<Switch name="category" variant="navbar">
					{#each exploreRoutes as r, i}
						<SwitchItem
							id={r.category}
							value={r.category}
							bind:group={categoryGroup}
							on:click={() => gotoCategory(r)}
							loading={$loadingCategory === r.category}
							disabled={r.category === $page.stuff.category && !$page.stuff.categoryIsResetable}
						>
							{r.title}
						</SwitchItem>
					{/each}
				</Switch>
			</nav>
		{/if}
		<nav
			class="user"
			in:fly={{ y: 20, opacity: 0, duration: 500, easing: expoOut, delay: 300 }}
			out:fly={{ y: 20, opacity: 0, duration: 500, easing: expoIn, delay: 0 }}
		>
			<Tooltip message="Accueil" placement="bottom">
				<Button href="/" variant="navbar" square={true} icon="home" />
			</Tooltip>
			{#if $session.user}
				<Popover placement="bottom" align="end" useHover={true}>
					<Button slot="control" variant="navbar" href={creationBaseRoute.pathname} icon="pen" />
					<NavbarCreationMenu />
				</Popover>
				<Popover useHover={true} placement="bottom" align="end">
					<AvatarButton slot="control" href={userBaseRoute.pathname} />
					<Button>Autre option</Button>
					<Button on:click={logout}>Se déconnecter</Button>
				</Popover>
			{:else}
				<Button variant="cta" href={getAuthRedirectUrl($page.url).toString()} icon="user">Se connecter</Button>
			{/if}
		</nav>
	{/if}
</header>

<style lang="scss">
	header {
		position: fixed;
		display: grid;
		grid-template-columns:
			[full-start gutter-left-start]
			auto
			[gutter-left-end section-start]
			1fr
			[section-end category-start]
			auto
			[category-end user-start]
			1fr
			[user-end gutter-right-start]
			auto
			[gutter-right-end full-end];
		width: 100vw;
		align-items: center;
		padding: 1rem;
		padding-block: 0.75rem;
		margin: 0;
		gap: 0;
		font-size: var(--size-small);
		z-index: 100;
		backdrop-filter: blur(8px);
		transition: all 0.35s, background-color 1s ease-in-out, width 0s;

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
			transition: all 1s ease-in-out;
		}
	}

	.overlay {
		box-shadow: 0 1px 0 0 rgba(var(--rgb-dark-900), 0.1);
		&::before {
			opacity: 0.92;
		}
	}

	.hidden {
		transform: translateY(-100%);
		pointer-events: none;
	}

	.logo {
		height: 1.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding-inline: 1em;
	}

	nav,
	.user > div {
		display: flex;
		flex: 0;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 3px;
	}

	.section {
		grid-area: section;
		justify-self: flex-start;
	}

	.category {
		grid-area: category;
	}

	.user {
		grid-area: user;
		justify-content: flex-end;
	}
</style>

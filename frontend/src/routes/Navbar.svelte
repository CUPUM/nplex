<script lang="ts">
	import { page } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import { messages } from '$stores/messages';
	import { mainScroll } from '$stores/scroll';
	import { browserDbClient } from '$utils/database/database';
	import { getAuthRedirectUrl } from '$utils/routing/guard';
	import { gotoCategory } from '$utils/routing/navigation';
	import { creationBaseRoute, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routing/routes';
	import { colors } from '$utils/values/colors';
	import { onMount } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Button from '../components/primitives/Button.svelte';
	import NavbarCreationMenu from './NavbarCreationMenu.svelte';

	export let navbarHeight;

	let mounted = false;
	let hidden;
	let overlay;
	let mainPathname: string;
	let yThreshold = navbarHeight || 40;

	$: hidden = $mainScroll.down && $mainScroll.y > yThreshold;
	$: overlay = $mainScroll.y > yThreshold + 50;
	$: mainPathname = $page.data.category ? '/' : $page.routeId ? '/' + $page.routeId.split('/')[0] : '/';

	async function logout() {
		try {
			const { error } = await browserDbClient.auth.signOut();
			if (error) throw error;
		} catch (error) {
			messages.dispatch({
				type: 'error',
				content: error,
			});
		}
	}

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
				<Logo intro={true} color={colors.dark[900]} hoverColor={colors.primary[500]} />
			</a>
			{#each mainRoutes as route}
				<Button variant="nav" href={route.pathname} active={route.pathname === mainPathname}>
					{route.title}
				</Button>
			{/each}
		</nav>
		<nav class="second">
			{#if $page.data.showCategoryNav}
				<div>
					<Switch name="category" variant="nav" value={$page.data.category}>
						{#each exploreRoutes as r, i}
							<SwitchItem
								id={r.category}
								value={r.category}
								on:click={() => gotoCategory(r)}
								disabled={r.category === $page.data.category && !$page.data.categoryIsResetable}
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
				<Icon name="home" size="1.25em" strokeWidth="2" />
			</Button>
			{#if $page.data.session}
				<Popover placement="bottom" align="end" useHover={true}>
					<Button slot="control" variant="nav" href={creationBaseRoute.pathname}>
						<Icon name="pen" size="1.25em" strokeWidth="2" />
					</Button>
					<NavbarCreationMenu />
				</Popover>
				<Popover useHover={true} placement="bottom" align="end">
					<AvatarButton slot="control" href={userBaseRoute.pathname} />
					<Button>Autre option</Button>
					<Button on:click={logout}>Se déconnecter</Button>
				</Popover>
			{:else}
				<Button variant="nav-cta" href={getAuthRedirectUrl($page.url).toString()} square>
					<Icon name="user" size="1.25em" strokeWidth="2" />
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
		justify-content: stretch;
		width: 100vw;
		align-items: center;
		padding: 1rem;
		padding-block: 0.5rem;
		margin: 0;
		gap: 0;
		font-size: var(--size-small);
		backdrop-filter: blur(8px);
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
			transition: all 1s ease-in-out;
		}
	}

	.overlay {
		backdrop-filter: blur(8px);
		box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.25);
		&::before {
			opacity: 0.75;
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
		height: 1.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding-inline: 1em;
	}

	nav {
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 3px;
	}

	.main {
		grid-area: section;
		justify-content: flex-start;
	}

	.second {
		grid-area: category;
	}

	.user {
		grid-area: user;
		justify-content: flex-end;
	}
</style>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import Badge from '$components/primitives/Badge.svelte';
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import { currentPath } from '$stores/currentPath';
	import { isExploreArticle } from '$stores/explore';
	import { mainScroll } from '$stores/scroll';
	import { category, showCategory } from '$stores/search';
	import { signOut } from '$utils/auth';
	import { colors } from '$utils/colors';
	import {
		creationBaseRoute,
		creationRoutes,
		exploreRoutes,
		mainRoutes,
		userBaseRoute,
		type ExploreRoute,
	} from '$utils/routes';
	import type { Category } from 'src/types/categories';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	export let navbarHeight: number = 0;

	let mounted = false;
	let navbarRef: HTMLElement;
	let resizeObserver: ResizeObserver;
	let hidden;
	let overlay;
	let loadingCategory: Category = null;
	let resetableCategory: Category = null;
	const hiddenThreshold = 100;

	$: hidden = $mainScroll.down && $mainScroll.y > hiddenThreshold;
	$: overlay = $mainScroll.y > hiddenThreshold + 100;
	$: resetableCategory = $isExploreArticle && !loadingCategory ? $category : null;

	function hasCategoryResetIcon(category: Category, current) {
		return $isExploreArticle && category === current && !loadingCategory;
	}

	function updateHeight() {
		navbarHeight = navbarRef.offsetHeight;
	}

	async function navigateCategory(route: ExploreRoute) {
		$isExploreArticle = false;
		loadingCategory = route.category;
		await goto(route.pathname);
		loadingCategory = null;
	}

	onMount(() => {
		mounted = true;
		resizeObserver = new ResizeObserver(updateHeight);
		resizeObserver.observe(navbarRef);
	});
</script>

<header bind:this={navbarRef} class:hidden class:overlay>
	<div id="wrapper">
		{#if mounted}
			<nav id="main" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 0 }}>
				<a id="logo" href="/">
					<Logo intro={true} color={colors.dark[900]} hoverColor={colors.primary[500]} />
				</a>
				{#each mainRoutes as route}
					<Button variant="navbar" href={route.pathname} active={$currentPath.main === route.pathname}>
						{route.title}
					</Button>
				{/each}
			</nav>
			{#if $showCategory}
				<nav
					id="category"
					in:fly={{ y: -30, duration: 500, easing: expoOut, delay: 500 }}
					out:fly={{ y: -30, duration: 500, easing: expoOut, delay: 0 }}
				>
					<Switch name="category" variant="navbar" disableCurrent={!$isExploreArticle}>
						{#each exploreRoutes as r, i}
							<SwitchItem
								id={r.category}
								value={r.category}
								group={$category}
								on:click={() => navigateCategory(r)}
								loading={loadingCategory === r.category}
							>
								<span
									class="category-name"
									style:left={resetableCategory === r.category ? '-.5em' : '0px'}
								>
									{r.title}
								</span>
								{#if resetableCategory === r.category}
									<span
										class="category-reset"
										transition:scale={{
											start: 0,
											delay: 0,
											duration: 500,
											easing: expoOut,
										}}
									>
										<Icon strokeWidth={1.7} name="undo" />
									</span>
								{/if}
							</SwitchItem>
						{/each}
					</Switch>
				</nav>
			{/if}
			<nav id="user" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 1000 }}>
				<Button href="/" variant="navbar" square={true}>
					<Icon name="home" slot="icon" />
				</Button>
				{#if $session.user}
					<Popover placement="bottom" align="end" useHover={true}>
						<Button slot="control" variant="navbar" href={creationBaseRoute.pathname}>
							<Icon name="new-file" slot="icon" />
						</Button>
						{#each creationRoutes as r}
							<Button href={r.pathname}>{r.title}</Button>
						{/each}
					</Popover>
					<Popover useHover={true} placement="bottom" align="end">
						<AvatarButton slot="control" href={userBaseRoute.pathname} />
						<Button>Autre option</Button>
						<Button on:click={signOut}>Se déconnecter</Button>
					</Popover>
				{:else}
					<Button variant="navbar" href={userBaseRoute.pathname} icon="user">
						<Icon name="user" slot="icon" />
						<Badge slot="badge" />
					</Button>
					<Button style="border-radius: 2em" variant="cta" href={userBaseRoute.pathname}
						>Créer un comtpe</Button
					>
				{/if}
			</nav>
		{/if}
	</div>
</header>

<style lang="postcss">
	header {
		position: fixed;
		z-index: 10;
		width: 100%;
		top: 0;
		margin: 0;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		font-size: var(--size-small);
		transition: all 0.25s;
	}

	#wrapper {
		display: grid;
		grid-template-columns:
			[main-start]
			1fr
			[main-end category-start]
			auto
			[category-end user-start]
			1fr
			[user-end];
		align-items: center;
		padding: 0px;
		margin: 0;
		border-radius: 2em;
		gap: 0;
	}

	.hidden {
		transform: translateY(-100%);
		pointer-events: none;
	}

	#logo {
		height: 1.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding-inline: 1em;
	}

	nav {
		display: flex;
		flex: 0;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0px;
	}

	#main {
		grid-area: main;
		justify-self: flex-start;
		border-radius: 3em;
		background-color: rgba(var(--rgb-light-100), 0);
		backdrop-filter: blur(24px);
	}

	#category {
		grid-area: category;
	}

	.category-name {
		position: relative;
		transition: left 0.35s 0.25s cubic-bezier(0.8, 0, 0.2, 1);
	}

	.category-reset {
		position: absolute;
		display: inline-block;
		top: 0.15em;
		padding: 0;
		margin: 0;
		transform: translateX(-40%);
	}

	#user {
		grid-area: user;
		justify-content: flex-end;
	}
</style>

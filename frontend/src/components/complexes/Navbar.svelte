<script lang="ts">
	import { session } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import Badge from '$components/primitives/Badge.svelte';
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { isExploreArticle } from '$stores/explore';
	import { currentPath, loadingCategory } from '$stores/navigation';
	import { mainScroll } from '$stores/scroll';
	import { category, showCategory } from '$stores/search';
	import { signOut } from '$utils/auth';
	import { colors } from '$utils/colors';
	import { gotoCategory } from '$utils/navigation';
	import { creationBaseRoute, creationRoutes, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routes';
	import type { Category } from 'src/types/categories';
	import { onMount } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let navbarHeight: number = 0;

	let mounted = false;
	let navbarRef: HTMLElement;
	let resizeObserver: ResizeObserver;
	let hidden;
	let overlay;
	let resetableCategory: Category = null;
	const hiddenThreshold = 100;

	$: hidden = $mainScroll.down && $mainScroll.y > hiddenThreshold;
	$: overlay = $mainScroll.y > hiddenThreshold + 100;
	$: resetableCategory = $isExploreArticle && !$loadingCategory ? $category : null;

	function hasCategoryResetIcon(category: Category, current) {
		return $isExploreArticle && category === current && !$loadingCategory;
	}

	function updateHeight() {
		navbarHeight = navbarRef.offsetHeight;
	}

	onMount(() => {
		mounted = true;
		resizeObserver = new ResizeObserver(updateHeight);
		resizeObserver.observe(navbarRef);
	});
</script>

<header bind:this={navbarRef} class:hidden class:overlay>
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
				<Button variant="navbar" href={route.pathname} active={$currentPath.main === route.pathname}>
					{route.title}
				</Button>
			{/each}
		</nav>
		{#if $showCategory}
			<nav
				class="category"
				in:fly={{ y: 20, duration: 500, easing: expoOut, delay: 150 }}
				out:fly={{ y: 20, duration: 500, easing: expoIn, delay: 0 }}
			>
				<Switch name="category" variant="navbar">
					{#each exploreRoutes as r, i}
						<SwitchItem
							id={r.category}
							value={r.category}
							bind:group={$category}
							on:click={() => gotoCategory(r)}
							loading={$loadingCategory === r.category}
							disabled={r.category === $category && !$isExploreArticle}
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
				<Button href="/" variant="navbar" square={true}>
					<Icon name="home" slot="icon" />
				</Button>
			</Tooltip>
			{#if $session.user}
				<div
					in:fly={{ y: 20, duration: 350, easing: expoOut, delay: 350 }}
					out:fly={{ y: -20, duration: 350, easing: expoOut }}
				>
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
				</div>
			{:else}
				<div
					in:fly={{ y: 20, duration: 350, easing: expoOut, delay: 350 }}
					out:fly={{ y: -20, duration: 350, easing: expoOut }}
				>
					<Button variant="navbar" href={userBaseRoute.pathname} icon="user">
						<Icon name="user" slot="icon" />
						<Badge slot="badge" />
					</Button>
					<Button variant="cta" href={userBaseRoute.pathname}>Créer un comtpe</Button>
				</div>
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
			[gutter-left-end main-start]
			1fr
			[main-end category-start]
			auto
			[category-end user-start]
			1fr
			[user-end gutter-right-start]
			auto
			[gutter-right-end full-end];
		width: 100%;
		align-items: center;
		padding: 1rem;
		padding-bottom: 0.5rem;
		margin: 0;
		gap: 0;
		font-size: var(--size-small);
		transition: all 0.25s;
		z-index: 100;
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

	.main {
		grid-area: main;
		justify-self: flex-start;
		border-radius: 3em;
		background-color: rgba(var(--rgb-light-100), 0);
		backdrop-filter: blur(24px);
	}

	.category {
		grid-area: category;
	}

	.user {
		grid-area: user;
		justify-content: flex-end;
	}
</style>

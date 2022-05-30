<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import { currentPath } from '$stores/currentPath';
	import { mainScroll } from '$stores/scroll';
	import { category, showCategory } from '$stores/search';
	import { signOut } from '$utils/auth';
	import { colors } from '$utils/colors';
	import { creationBaseRoute, creationRoutes, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routes';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let navbarHeight: number = 0;

	let mounted = false;
	let navbarRef: HTMLElement;
	let resizeObserver: ResizeObserver;
	let hidden;
	let overlay;
	const hiddenThreshold = 100;

	$: hidden = $mainScroll.down && $mainScroll.y > hiddenThreshold;
	$: overlay = $mainScroll.y > hiddenThreshold + 100;

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
	<div id="wrapper">
		{#if mounted}
			<nav id="main" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 500 }}>
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
					in:fly={{ y: 30, duration: 500, easing: expoOut, delay: 0 }}
					out:fly={{ y: 30, duration: 500, easing: expoOut, delay: 750 }}
				>
					<Switch name="category" variant="navbar">
						{#each exploreRoutes as r, i}
							<SwitchItem
								id={r.category}
								value={r.category}
								group={$category}
								on:input={() => goto(r.pathname)}
							>
								{r.title}
							</SwitchItem>
						{/each}
					</Switch>
				</nav>
			{/if}
			<nav id="user" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 1000 }}>
				<Button href="/" variant="navbar" square={true} icon="home" />
				{#if $session.user}
					<Popover placement="bottom" align="end" useHover={true}>
						<Button slot="control" href={creationBaseRoute.pathname} icon="new-file" />
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
					<Button variant="navbar" href={userBaseRoute.pathname} icon="user" />
					<Button variant="cta" href={userBaseRoute.pathname}>S'inscrire</Button>
				{/if}
			</nav>
		{/if}
	</div>
</header>

<style lang="postcss">
	header {
		position: fixed;
		z-index: 1;
		width: 100%;
		top: 0;
		margin: 0;
		padding: 1rem;
		padding-bottom: 0.5rem;
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
		background-color: rgba(var(--rgb-light-100), 0.05);
		backdrop-filter: blur(24px);
	}

	#category {
		grid-area: category;
	}

	#user {
		grid-area: user;
		justify-content: flex-end;
	}
</style>

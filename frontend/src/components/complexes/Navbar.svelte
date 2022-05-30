<script lang="ts">
	import { session } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import { mainScroll } from '$stores/scroll';
	import { showCategory } from '$stores/search';
	import { signOut } from '$utils/auth';
	import { colors } from '$utils/colors';
	import { cssSize } from '$utils/helpers/css';
	import { creationBaseRoute, creationRoutes, exploreRoutes, mainRoutes, userBaseRoute } from '$utils/routes';
	import { sizes } from '$utils/sizes';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let height: number = 0;

	let mounted = false;
	let navbarRef: HTMLElement;
	let resizeObserver: ResizeObserver;
	let hidden;
	let overlay;
	const hiddenThreshold = 100;

	$: hidden = $mainScroll.down && $mainScroll.y > hiddenThreshold;
	$: overlay = $mainScroll.y > hiddenThreshold + 100;

	function updateHeight() {
		height = navbarRef.offsetHeight;
	}

	onMount(() => {
		mounted = true;
		resizeObserver = new ResizeObserver(updateHeight);
		resizeObserver.observe(navbarRef);
	});
</script>

<header style:font-size={cssSize(sizes.small)} bind:this={navbarRef}>
	<div id="nav-wrapper" class:hidden class:overlay>
		{#if mounted}
			<nav id="main" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 500 }}>
				<a id="logo" href="/">
					<Logo intro={true} color={colors.dark[900]} hoverColor={colors.primary[500]} />
				</a>
				{#each mainRoutes as route}
					<a href={route.pathname}>
						{route.title}
					</a>
				{/each}
			</nav>
			{#if $showCategory}
				<nav
					id="category"
					in:fly={{ y: 30, duration: 500, easing: expoOut, delay: 0 }}
					out:fly={{ y: 30, duration: 500, easing: expoOut, delay: 150 }}
				>
					{#each exploreRoutes as r, i}
						<a href={r.pathname}>
							{r.title}
						</a>
					{/each}
				</nav>
			{/if}
			<nav id="user" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 1000 }}>
				<Button href="/" square={true} icon="home" />
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
					<Button variant="nav" href={userBaseRoute.pathname} icon="user" />
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
	}

	#nav-wrapper {
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
		transition: all 0.25s;

		&.overlay {
			backdrop-filter: blur(12px);
			background-color: rgba(var(--rgb-light-100), 0.8);
		}

		&.hidden {
			transform: translateY(-100%);
			pointer-events: none;
			opacity: 0;
		}
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
		display: inline-flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 3px;
	}

	#main {
		grid-area: main;
		justify-content: flex-start;
	}

	#category {
		grid-area: category;
	}

	#user {
		grid-area: user;
		justify-content: flex-end;
	}
</style>

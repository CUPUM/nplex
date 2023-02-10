<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import { page } from '$app/stores';
	import OverflowEffect from '$components/OverflowEffect.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { col } from '$utils/css';
	import type { Routes } from '$utils/routes';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let routes: Routes;
</script>

<nav in:fly={{ y: -12, delay: 250, easing: expoOut }} use:horizontalScroll={{}}>
	<OverflowEffect>
		{#each Object.values(routes) as route}
			<a href={route.pathname} data-current={$page.url.pathname === route.pathname || undefined}>
				<Ripple color={col('primary', 500)} />
				<span class="inner">
					{route.title}
				</span>
			</a>
		{/each}
	</OverflowEffect>
</nav>

<style lang="scss">
	nav {
		--scroll-size: 0;
		position: sticky;
		font-size: var(--ui-text-sm);
		max-width: var(--ui-nav-center-w);
		top: 1rem;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow-x: auto;
		background: col(bg, 300);
		margin-top: 1rem;
		border-radius: var(--ui-radius-md);
	}

	a {
		position: relative;
		display: flex;
		align-items: center;
		font-weight: 500;
		flex: none;
		height: var(--ui-height);
		border-radius: var(--ui-radius-md);
		padding-inline: var(--ui-pad-x);
		// backdrop-filter: blur(3px);
		transition: all 0.15s ease-out;

		&:hover:not([data-current]) {
			color: col(primary, 700);
			background: col(primary, 100, 0.1);
		}

		&[data-current] {
			position: sticky;
			left: 0;
			right: 0;
			z-index: 10;
			color: col(primary, 500);
			background: col(bg, 300, 0.9);

			&::after {
				width: calc(100% - 3rem);
				left: 1.5rem;
				opacity: 1;
			}
		}

		.inner {
			font-size: var(--ui-text-md);
			position: relative;
			top: -0.1em;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			// top: 100%;
			left: 50%;
			width: 0%;
			height: var(--ui-inset);
			opacity: 0;
			background: currentColor;
			border-radius: 3px 3px 0 0;
			transition: all 0.25s var(--ui-ease-out);
		}
	}
</style>

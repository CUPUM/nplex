<script lang="ts">
	import { page } from '$app/stores';
	import Ripple from '$components/Ripple.svelte';
	import { col } from '$utils/css';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { descriptorsRoutes } from './common';
</script>

<nav>
	{#each Object.values(descriptorsRoutes) as route, i}
		<a
			in:fly={{ x: 6, delay: i * 50, easing: cubicOut }}
			class="focus-press"
			href={route.pathname}
			data-current={$page.url.pathname == route.pathname || undefined}
		>
			<Ripple color={col('primary', '500')} />
			<span class="inner">
				{route.title}
			</span>
		</a>
	{/each}
	<div class="mark" />
</nav>

<style lang="scss">
	nav {
		grid-column: 2;
		font-size: var(--ui-text-sm);
		padding-inline: 1.5rem;
		padding-top: var(--ui-radius-lg);
		justify-self: flex-start;
		position: sticky;
		top: var(--ui-nav-px);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		overflow: visible;
		z-index: 1;

		@include tablet {
			position: relative;
			top: 0;
			width: 100%;
			max-width: var(--ui-width-main);
			flex-direction: row;
			border-bottom: 1px solid col(fg, 500, 0.05);
		}
	}

	a {
		flex: none;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: var(--ui-radius-md);
		padding-block: 1em;
		padding-inline: 1.25em;
		font-weight: 500;
		color: col(fg, 100);
		background: col(bg, 700, 0.8);
		backdrop-filter: blur(8px);
		transition: all 0.15s ease-out;

		&:hover:not([data-current]) {
			color: col(primary, 900);
			background: col(primary, 300, 0.1);
		}

		&[data-current] {
			cursor: default;
			color: col(primary, 700);
			// background: col(primary, 300, 0.2);
			transition: all 0.2s ease-out;
		}
	}

	.inner {
		position: relative;
		display: inline-block;
		top: -0.1em;
	}
</style>

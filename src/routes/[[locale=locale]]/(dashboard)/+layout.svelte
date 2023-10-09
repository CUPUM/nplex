<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from '$lib/transitions/slide';
	import { expoOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let scrollY = 0;
	let headerHeight = 0;
</script>

<svelte:window bind:scrollY />

<article>
	{#if $page.data.dashboard?.header}
		<header
			in:slide={{ duration: 750, easing: expoOut, opacity: 0 }}
			out:slide={{ easing: expoOut, duration: 500, opacity: 0 }}
			class:detached={scrollY > headerHeight / 2}
			class:scrolled={scrollY > 0}
			bind:clientHeight={headerHeight}
		>
			<svelte:component this={$page.data.dashboard.header} />
		</header>
	{/if}
	{#if $page.data.dashboard?.breadcrumbs}
		<div class="dashboard-breadcrumbs">Breadcrumbs</div>
	{/if}
	{#if $page.data.dashboard?.sidebar}
		<div class="dashboard-sidebar">
			<svelte:component this={$page.data.dashboard.sidebar} />
		</div>
	{/if}
	<section in:fade>
		<slot />
	</section>
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		@media (--md) {
			display: grid;
			grid-template-columns: fit-content(var(--dashboard-navbar)) minmax(0, 1fr);
			padding-inline: 0.75rem;
		}
	}

	header {
		grid-column: 1 / -1;
		margin-bottom: 0.5rem;
		border-radius: var(--radius-xl);
		overflow: hidden;
		position: sticky;
		top: var(--navbar-height);
		z-index: -1;
		transform: scale(1);
		transform-origin: top center;
		transition: all var(--duration-medium) var(--ease-out-expo);

		&.detached {
			opacity: 0;
			pointer-events: none;
			transition: all var(--duration-medium) ease-out;
		}

		&.scrolled {
			transform: scale(0.98);
			transition: all var(--duration-2xslow) var(--ease-out-expo);
		}
	}

	.dashboard-breadcrumbs {
		grid-column: 1 / -1;
	}

	.dashboard-sidebar {
		display: flex;
		flex-direction: row;
		align-self: stretch;
		overflow-x: auto;
		top: var(--navbar-height);
		position: sticky;
		gap: 0.5rem;
		z-index: 1;

		@media (--md) {
			margin-right: 0.5rem;
			align-self: flex-start;
			overflow-x: hidden;
			overflow-y: auto;
			width: var(--dashboard-navbar);
			flex-direction: column;
		}
	}

	section {
		grid-column: 2 / 3;
		border-radius: var(--radius-lg);
		background-color: var(--color-neutral-50);
		:global(:--dark) & {
			background-color: var(--color-neutral-800);
		}
	}
</style>

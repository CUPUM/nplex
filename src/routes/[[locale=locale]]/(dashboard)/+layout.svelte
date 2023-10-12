<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from '$lib/transitions/slide';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let scrollY = 0;
	let headerHeight = 0;
</script>

<svelte:window bind:scrollY />

<article>
	{#if $page.data.dashboard?.header}
		<header
			id="dashboard-header"
			in:slide={{ duration: 750, easing: expoOut, opacity: 0 }}
			out:slide={{ easing: expoOut, duration: 500, opacity: 0 }}
			class:scrolled={scrollY > 20}
			bind:clientHeight={headerHeight}
		>
			<svelte:component this={$page.data.dashboard.header} />
		</header>
	{/if}
	{#if $page.data.dashboard?.breadcrumbs}
		<div id="dashboard-breadcrumbs">Breadcrumbs</div>
	{/if}
	{#if $page.data.dashboard?.sidebar}
		<div id="dashboard-sidebar">
			<svelte:component this={$page.data.dashboard.sidebar} />
		</div>
	{/if}
	<section in:scale={{ start: 0.98, duration: 350, easing: expoOut }} id="dashboard-content">
		<slot />
	</section>
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		perspective: 1500px;
		@media (--md) {
			display: grid;
			grid-template-columns: fit-content(var(--dashboard-navbar)) minmax(0, 1fr);
			padding-inline: 0.75rem;
		}
	}

	#dashboard-header {
		grid-column: 1 / -1;
		margin-bottom: 0.5rem;
		border-radius: var(--radius-xl);
		/* position: sticky;
		top: var(--navbar-height); */
		z-index: -1;
		transform-origin: bottom center;
		transition: all var(--duration-2xslow) var(--ease-out-expo);

		&.scrolled {
			transform: rotateX(45deg);
			opacity: 0;
		}
	}

	#dashboard-breadcrumbs {
		grid-column: 1 / -1;
	}

	#dashboard-sidebar {
		display: flex;
		flex-direction: row;
		align-self: stretch;
		overflow-x: auto;
		top: var(--navbar-sticky);
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

	#dashboard-content {
		scroll-margin-block-start: var(--navbar-sticky);
		grid-column: 2 / 3;
		border-radius: var(--radius-lg);
		/* background-color: var(--color-neutral-50); */
		:global(:--dark) & {
			/* background-color: var(--color-neutral-800); */
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from '$lib/transitions/slide';
	import { expoOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<article>
	{#if $page.data.dashboard?.header}
		<header
			in:slide={{ duration: 750, easing: expoOut, opacity: 0 }}
			out:slide={{ easing: expoOut, duration: 500, opacity: 0 }}
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
		display: grid;
		grid-template-columns: fit-content(var(--dashboard-navbar)) 1fr;
		@media (--lg) {
			padding-inline: 0.75rem;
		}
	}

	header {
		grid-column: 1 / -1;
		margin-bottom: 0.5rem;
		border-radius: var(--radius-xl);
		overflow: hidden;
	}

	.dashboard-breadcrumbs {
		grid-column: 1 / -1;
	}

	.dashboard-sidebar {
		width: var(--dashboard-navbar);
		display: flex;
		flex-direction: row;
		align-self: stretch;
		overflow-x: auto;
		top: var(--navbar-height);
		position: sticky;
		gap: 0.5rem;
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
		grid-column: 2;
		border-radius: var(--radius-lg);
		background-color: var(--color-neutral-50);
		:global(:--dark) & {
			background-color: var(--color-neutral-800);
		}
	}
</style>

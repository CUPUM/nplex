<script lang="ts">
	import type { ComponentType } from 'svelte';
	import DashboardHeader from './DashboardHeader.svelte';
	import Sidebar from './Sidebar.svelte';

	export let header: ComponentType | undefined = undefined;
	export let sidebar: ComponentType | undefined = undefined;
	export let footer: ComponentType | undefined = undefined;
</script>

<article class="dashboard">
	{#if $$slots.header || header}
		<DashboardHeader>
			{#if $$slots.header}
				<slot name="header" />
			{:else}
				<svelte:component this={header} />
			{/if}
		</DashboardHeader>
	{/if}
	{#if $$slots.sidebar || sidebar}
		<Sidebar>
			{#if $$slots.header}
				<slot name="sidebar" />
			{:else}
				<svelte:component this={sidebar} />
			{/if}
		</Sidebar>
	{/if}
	<section class="dashboard-main">
		<slot />
	</section>
	{#if $$slots.footer || footer}
		<footer class="dashboard-footer">
			{#if $$slots.footer}
				<slot name="footer" />
			{:else}
				<svelte:component this={footer} />
			{/if}
		</footer>
	{/if}
</article>

<style lang="postcss">
	.dashboard {
		position: relative;
		display: grid;
		grid-template-columns:
			[dashboard-start sidebar-start footer-start] var(--sidebar-width)
			[sidebar-end content-start] 1fr
			[content-end dashboard-end footer-end];
		flex-direction: column;
		gap: var(--base-gutter);
		border-radius: var(--radius-lg);
		perspective: 999px;
		padding-inline: 0.75rem;
		container-type: inline-size;
	}

	.dashboard-main {
		position: relative;
		display: grid;
		grid-template-columns:
			[full-start] 1fr
			[center-start] minmax(0, var(--content-width))
			[center-end] 1fr
			[full-end];
		gap: inherit;
		scroll-margin-block-start: var(--sticky-top);
		border-radius: inherit;
		min-height: calc(100vh - var(--sticky-top));
		min-height: calc(100svh - var(--sticky-top));

		@media (--lg) {
			grid-template-columns:
				[full-start] 1fr
				[center-start] var(--content-width)
				[center-end] 1fr
				minmax(auto, var(--sidebar-width))
				[full-end];
		}
	}

	.dashboard-footer {
		grid-column: footer;
	}
</style>

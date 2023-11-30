<script context="module" lang="ts">
	export const DASHBOARD_MAIN_ID = 'dashboard-main';
</script>

<script lang="ts">
	import { slide } from '$lib/transitions/slide';
	import { composeMeshgradient } from '$lib/utils/mesh-gradient';
	import { onMount, type ComponentType } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import Sidebar from './Sidebar.svelte';

	export let header: ComponentType | undefined = undefined;
	export let sidebar: ComponentType | undefined = undefined;
	export let footer: ComponentType | undefined = undefined;

	let scrollY = 0;
	let meshGradient: string;

	$: hasHeader = $$slots.header || header;
	$: hasSidebar = $$slots.sidebar || sidebar;
	$: hasFooter = $$slots.footer || footer;

	onMount(() => {
		meshGradient = composeMeshgradient({
			colors: [
				'var(--color-primary-700)',
				'var(--color-primary-600)',
				'var(--color-secondary-700)',
				'var(--color-primary-300)',
				'var(--color-secondary-100)',
				'var(--color-secondary-600)',
			],
			nodes: 7,
			spread: [25, 200],
		});
	});
</script>

<svelte:window bind:scrollY />

<article
	id="dashboard"
	class:has-header={hasHeader}
	class:has-sidebar={hasSidebar}
	class:has-footer={hasFooter}
>
	{#if hasHeader}
		<header
			id="dashboard-header"
			in:slide={{ duration: 750, easing: expoOut, opacity: 0 }}
			out:slide={{ easing: expoOut, duration: 500, opacity: 0 }}
			style:background={meshGradient}
			style:transform="rotateX({Math.min(90, scrollY * 0.25)}deg)"
			style:opacity={Math.max(0, 1 - scrollY * 0.005)}
		>
			{#if $$slots.header}
				<slot name="header" />
			{:else}
				<svelte:component this={header} />
			{/if}
		</header>
	{/if}
	{#if hasSidebar}
		<Sidebar>
			{#if $$slots.header}
				<slot name="sidebar" />
			{:else}
				<svelte:component this={sidebar} />
			{/if}
		</Sidebar>
	{/if}
	<section id={DASHBOARD_MAIN_ID}>
		<slot />
	</section>
	{#if hasFooter}
		<footer id="dashboard-footer">
			{#if $$slots.footer}
				<slot name="footer" />
			{:else}
				<svelte:component this={footer} />
			{/if}
		</footer>
	{/if}
</article>

<style lang="postcss">
	#dashboard {
		position: relative;
		display: grid;
		grid-template-columns:
			[full-start sidebar-start footer-start] 0px
			[sidebar-end main-start] 1fr
			[main-end full-end footer-end];
		flex-direction: column;
		align-content: flex-start;
		gap: var(--base-gutter);
		border-radius: var(--radius-lg);
		perspective: 999px;
		padding-inline: 0.75rem;
		container-type: inline-size;
		row-gap: 0;
		column-gap: 0;
		min-height: calc(100vh - var(--navbar-height));
		min-height: calc(100svh - var(--navbar-height));
		transition: all var(--duration-fast) var(--ease-out-expo);

		&.has-sidebar {
			column-gap: var(--base-gutter);
			grid-template-columns:
				[full-start sidebar-start footer-start] var(--sidebar-width)
				[sidebar-end main-start] 1fr
				[main-end full-end footer-end];
		}

		&.has-header,
		.has-footer {
			row-gap: var(--base-gutter);
		}
	}

	#dashboard-header {
		--pattern-size: 1.5rem;
		--pattern-spacing: 3rem;
		--pattern-thickness: 1.5px;
		--_pattern-half-thickness: calc(var(--pattern-thickness) / 2);
		z-index: 0;
		position: relative;
		grid-column: 1 / -1;
		border-radius: inherit;
		transform-origin: center bottom;
		backface-visibility: hidden;
		overflow: hidden;
		perspective: 999px;
		transition: all 1s var(--ease-out-expo);
	}

	#dashboard-main {
		position: relative;
		display: grid;
		grid-column: main;
		grid-template-rows: minmax(auto, 1fr);
		grid-template-columns:
			[full-start] 1fr
			[center-start] minmax(0, var(--content-width))
			[center-end] 1fr
			[full-end];
		gap: inherit;
		align-content: start;
		scroll-margin-block-start: var(--sticky-top);
		border-radius: inherit;

		@media (--lg) {
			grid-template-columns:
				[full-start] 1fr
				[center-start] var(--content-width)
				[center-end] 1fr
				minmax(auto, var(--sidebar-width))
				[full-end];
		}
	}

	#dashboard-footer {
		grid-column: footer;
	}
</style>

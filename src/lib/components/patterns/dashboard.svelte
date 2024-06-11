<script lang="ts" context="module">
	import { defineContext } from '$lib/common/context';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	const CTX_KEY = 'dashboard';

	type DashboardContext = {
		header?: Snippet;
		sidebar?: Snippet;
		footer?: Snippet;
	};

	const [getDashboardContext, setDashboardContext] = defineContext<DashboardContext>(CTX_KEY);

	export { getDashboardContext };
</script>

<script lang="ts">
	const ctx = $state<DashboardContext>({});

	setDashboardContext(ctx);

	let { children }: { children: Snippet } = $props();
</script>

<section
	class="px-padding pb-gutter relative grid flex-1 grid-cols-[[sidebar-start_header-start_footer-start]_auto_[sidebar-end_main-start]_1fr_[main-end_header-end_footer-end]]"
>
	{#if ctx.header}
		<header class="pb-gutter" style:grid-column="header">
			{@render ctx.header()}
		</header>
	{/if}
	{#if ctx.sidebar}
		<nav
			style:grid-column="sidebar"
			class="gap-gutter w-sidebar-width top-navbar-height pr-gutter sticky flex flex-col self-start"
			transition:slide={{ axis: 'x' }}
		>
			{@render ctx.sidebar()}
		</nav>
	{/if}
	<article style:grid-column="main" class="gap-gutter flex flex-col">
		{@render children()}
	</article>
	{#if ctx.footer}
		<footer style:grid-column="footer">
			{@render ctx.footer()}
		</footer>
	{/if}
</section>

<style>
	* :global(.dashboard-section) {
		display: flex;
		flex-direction: column;
		background: var(--background-color-section);
		font-size: var(--font-size-sm);
		border-radius: var(--radius-lg);
		gap: var(--spacing-card-padding);
		padding-block: var(--spacing-card-padding);

		&:global(:has(.dashboard-section-title:first-child)) {
			padding-top: calc(0.75 * var(--spacing-card-padding));
		}
	}

	* :global(.dashboard-section-content) {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-gutter);
		align-items: flex-start;
		border-radius: inherit;
		padding-inline: var(--spacing-lg);
	}

	* :global(.dashboard-section-title) {
		align-self: flex-start;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		padding-inline: var(--spacing-card-padding);
		border-radius: var(--radius-md);
	}

	* :global(.dashboard-section-menu) {
		position: sticky;
		bottom: var(--spacing-gutter);
	}
</style>

<script lang="ts" context="module">
	import { defineContext } from '$lib/common/context';
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
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
	class="px-padding pb-gutter flex-basis-0 min-h-main-full-height relative grid grid-cols-[[sidebar-start_header-start_footer-start]_auto_[sidebar-end_main-start]_1fr_[main-end_header-end_footer-end]] content-start"
>
	{#if ctx.header}
		<header
			class="pb-gutter rounded-section relative flex flex-col"
			style:grid-column="header"
			transition:slide={{ axis: 'y', duration: 350, easing: expoOut }}
		>
			{@render ctx.header()}
		</header>
	{/if}
	{#if ctx.sidebar}
		<nav
			style:grid-column="sidebar"
			class="gap-gutter w-sidebar-width top-sticky-top pr-gutter relative sticky flex flex-col self-start"
			transition:slide={{ axis: 'x', duration: 350, easing: expoOut }}
		>
			{@render ctx.sidebar()}
		</nav>
	{/if}
	<article style:grid-column="main" class="gap-gutter flex flex-col" id="dashboard-main">
		{@render children()}
	</article>
	{#if ctx.footer}
		<footer class="pt-gutter relative" style:grid-column="footer">
			{@render ctx.footer()}
		</footer>
	{/if}
</section>

<style>
	:global {
		.dashboard-section {
			position: relative;
			display: flex;
			flex-direction: column;
			background: var(--background-color-section);
			font-size: var(--font-size-sm);
			border-radius: var(--radius-section);
			gap: var(--spacing-card-gutter);
			padding-block: var(--spacing-card-padding);

			&:has(.dashboard-section-title:first-child) {
				padding-top: calc(0.75 * var(--spacing-card-padding));
			}
		}

		.dashboard-section-title {
			align-self: flex-start;
			font-size: var(--font-size-lg);
			font-weight: var(--font-weight-bold);
			padding-inline: var(--spacing-card-padding);
		}

		.dashboard-section-description {
			align-self: flex-start;
			max-width: var(--width-prose);
			font-size: var(--font-size-sm);
			line-height: var(--line-height-md);
			padding-inline: var(--spacing-card-padding);

			p {
				margin-bottom: 1em;
				margin-top: 0.5em;
			}
		}

		.dashboard-section-content {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-card-gutter);
			border-radius: inherit;
			padding-inline: var(--spacing-lg);
			padding-block: var(--spacing-md);
			margin-inline: auto;
			align-items: stretch;
			width: 100%;
			max-width: var(--width-md);
		}

		.dashboard-section-menu {
			font-size: var(--font-size-sm);
			align-self: center;
			position: sticky;
			bottom: var(--spacing-card-padding);
			margin-inline: var(--spacing-card-padding);
		}
	}
</style>

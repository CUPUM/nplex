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
	class="relative grid flex-1 grid-cols-[[sidebar-start_header-start_footer-start]_auto_[sidebar-end_main-start]_1fr_[main-end_header-end_footer-end]]"
>
	{#if ctx.header}
		<header class="grid-column-[header] pb-gutter px-gutter">
			{@render ctx.header()}
		</header>
	{/if}
	{#if ctx.sidebar}
		<nav
			class="grid-column-[sidebar] px-gutter gap-gutter top-navbar-height sticky flex flex-col self-start"
			transition:slide={{ axis: 'x' }}
		>
			{@render ctx.sidebar()}
		</nav>
	{/if}
	<article class="grid-column-[main]">
		{@render children()}
	</article>
	{#if ctx.footer}
		<footer class="grid-column-[footer]">
			{@render ctx.footer()}
		</footer>
	{/if}
</section>

<script lang="ts" context="module">
	import { defineContext } from '$lib/common/context';
	import { onDestroy, type Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	const CTX_KEY = 'dashboard';

	const [getDashboardContext, setDashboardContext] = defineContext<{
		setHeader: (header: Snippet) => ReturnType<typeof onDestroy>;
		setSidebar: (sidebar: Snippet) => ReturnType<typeof onDestroy>;
		setFooter: (footer: Snippet) => ReturnType<typeof onDestroy>;
	}>(CTX_KEY);

	export { getDashboardContext };
</script>

<script lang="ts">
	let ctxHeaders = $state<Snippet[]>([]);
	let ctxSidebars = $state<Snippet[]>([]);
	let ctxFooters = $state<Snippet[]>([]);

	setDashboardContext({
		setHeader(snippet) {
			ctxHeaders.push(snippet);
			return onDestroy(() => {
				ctxHeaders.pop();
			});
		},
		setSidebar(snippet) {
			ctxSidebars.push(snippet);
			return onDestroy(() => {
				ctxSidebars.pop();
			});
		},
		setFooter(snippet) {
			ctxFooters.push(snippet);
			return onDestroy(() => {
				ctxFooters.pop();
			});
		},
	});

	let {
		children,
		sidebar,
		header,
		footer,
	}: {
		children: Snippet;
		sidebar?: Snippet;
		header?: Snippet;
		footer?: Snippet;
	} = $props();

	let currentHeader = $derived(ctxHeaders[ctxHeaders.length - 1] ?? header);
	let currentSidebar = $derived(ctxSidebars[ctxSidebars.length - 1] ?? sidebar);
	let currentFooter = $derived(ctxFooters[ctxFooters.length - 1] ?? footer);
</script>

<section
	class="px-padding pb-gutter flex-basis-0 min-h-main-full-height relative grid grid-cols-[[sidebar-start_header-start_footer-start]_auto_[sidebar-end_main-start]_1fr_[main-end_header-end_footer-end]] content-start"
>
	{#if currentHeader}
		<header
			class="pb-gutter rounded-dashboard relative flex flex-col"
			style:grid-column="header"
			transition:slide={{ axis: 'y', duration: 350, easing: expoOut }}
		>
			{@render currentHeader()}
		</header>
	{/if}
	{#if currentSidebar}
		<nav
			style:grid-column="sidebar"
			class="gap-gutter w-sidebar-width top-sticky-top pr-gutter relative sticky flex flex-col self-start"
			transition:slide={{ axis: 'x', duration: 350, easing: expoOut }}
		>
			{@render currentSidebar()}
		</nav>
	{/if}
	<article style:grid-column="main" class="gap-gutter flex flex-col" id="dashboard-main">
		{@render children()}
	</article>
	{#if currentFooter}
		<footer class="pt-gutter relative" style:grid-column="footer">
			{@render currentFooter()}
		</footer>
	{/if}
</section>

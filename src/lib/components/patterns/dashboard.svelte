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

	export const DASHBOARD_MAIN_ID = 'dashboard-main';
</script>

<script lang="ts">
	import ResizableSidebarHandle from './resizable-sidebar-handle.svelte';

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

<section class="px-padding pb-gap flex-basis-0 min-h-main-full-height relative flex flex-col">
	{#if currentHeader}
		<header
			class="pb-gap rounded-section relative flex flex-col"
			transition:slide={{ axis: 'y', duration: 350, easing: expoOut }}
		>
			{@render currentHeader()}
		</header>
	{/if}
	<section class="relative flex flex-1 flex-row items-start">
		{#if currentSidebar}
			<ResizableSidebarHandle>
				{#snippet sidebar(sidebar, css)}
					<nav
						use:sidebar
						style:--spacing-sidebar-width={css}
						class="gap-gap w-sidebar-width top-sticky-top relative sticky flex flex-col"
						transition:slide={{ axis: 'x', duration: 350, easing: expoOut }}
					>
						{@render currentSidebar()}
					</nav>
				{/snippet}
			</ResizableSidebarHandle>
		{/if}
		<article class="gap-gap flex flex-1 flex-col" id={DASHBOARD_MAIN_ID}>
			{@render children()}
		</article>
	</section>
	{#if currentFooter}
		<footer class="pt-gap relative">
			{@render currentFooter()}
		</footer>
	{/if}
</section>

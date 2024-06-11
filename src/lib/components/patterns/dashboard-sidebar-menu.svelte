<script context="module" lang="ts">
	import { defineContext } from '$lib/common/context';

	export const [currentSend, currentReceive] = crossfade({
		duration: 250,
		easing: expoInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 250, easing: expoOut });
		},
	});

	type DashboardSidebarMenuContext = {
		thumbKey: {};
	};

	const [getDashboardSidebarMenuContext, setDashboardSidebarMenuContext] =
		defineContext<DashboardSidebarMenuContext>({});
</script>

<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { expoInOut, expoOut } from 'svelte/easing';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { crossfade, scale } from 'svelte/transition';

	let {
		children,
		legend,
		href,
		...restProps
	}: {
		children: Snippet;
		legend?: Snippet;
	} & HTMLAnchorAttributes = $props();

	const thumbKey = {};

	setDashboardSidebarMenuContext({ thumbKey });

	onDestroy(() => {});
</script>

<menu
	class="p-menu-padding gap-menu-gutter bg-section relative flex flex-col rounded-lg"
	in:scale={{ start: 0.95, duration: 750, easing: expoOut }}
>
	{#if restProps['aria-current']}
		<div
			class="w-outline-focus bg-primary absolute top-[var(--radius-lg)] right-0 bottom-[var(--radius-lg)] rounded-full"
			in:currentReceive={{ key: thumbKey }}
			out:currentSend={{ key: thumbKey }}
		></div>
	{/if}
	{#if legend}
		<svelte:element
			this={href ? 'a' : 'legend'}
			{...restProps}
			class="text-base-softer aria-[current]:text-primary px-input-padding pb-menu-gutter relative whitespace-nowrap text-xs font-normal transition-all aria-[current]:font-bold"
		>
			{@render legend()}
		</svelte:element>
	{/if}
	<ul class="nest flex flex-col text-sm" style:--spacing-input-nest="0.25em">
		{@render children()}
	</ul>
</menu>

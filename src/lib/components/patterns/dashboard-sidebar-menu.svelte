<script context="module" lang="ts">
	import { defineContext } from '$lib/common/context';
	import { dashboardSidebarMenuThumbCrossfade } from '$lib/motion/presets';
	import { type Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';

	type DashboardSidebarMenuContext = {
		thumbKey: {};
	};

	const [getDashboardSidebarMenuContext, setDashboardSidebarMenuContext] =
		defineContext<DashboardSidebarMenuContext>({});

	export { getDashboardSidebarMenuContext };
</script>

<script lang="ts">
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
</script>

<menu
	class="p-popover-padding gap-menu-gutter bg-section rounded-section relative flex flex-col"
	in:scale={{ start: 0.95, duration: 750, easing: expoOut }}
>
	{#if restProps['aria-current']}
		<div
			class="w-outline-focus bg-primary absolute top-[var(--radius-lg)] right-0 bottom-[var(--radius-lg)] rounded-full"
			in:dashboardSidebarMenuThumbCrossfade.receive={{ key: thumbKey }}
			out:dashboardSidebarMenuThumbCrossfade.send={{ key: thumbKey }}
		></div>
	{/if}
	{#if legend}
		<svelte:element
			this={href ? 'a' : 'legend'}
			{href}
			{...restProps}
			class="text-base-dimmer aria-[current]:text-primary px-input-padding pb-menu-gutter relative whitespace-nowrap text-xs font-normal transition-all aria-[current]:font-bold"
		>
			{@render legend()}
		</svelte:element>
	{/if}
	<ul class="nest gap-menu-gutter flex flex-col text-sm" style="--spacing-input-nest: 0.25em">
		{@render children()}
	</ul>
</menu>

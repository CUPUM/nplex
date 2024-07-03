<script context="module" lang="ts">
	import { defineContext } from '$lib/common/context';
	import { dashboardSidebarMenuThumbCrossfade } from '$lib/motion/presets';
	import { type Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { slide } from 'svelte/transition';

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
	class="p-md gap-input-group-gap bg-card-soft rounded-section relative flex flex-col"
	in:slide|global={{ axis: 'y', duration: 750, easing: expoOut }}
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
			class="text-base-dimmest aria-[current]:text-primary px-input-padding pb-input-group-gap relative whitespace-nowrap text-xs font-normal transition-all aria-[current]:font-bold"
		>
			{@render legend()}
		</svelte:element>
	{/if}
	<ul class="nest gap-input-group-gap flex flex-col text-sm [--spacing-input-nest:0.2em]">
		{@render children()}
	</ul>
</menu>

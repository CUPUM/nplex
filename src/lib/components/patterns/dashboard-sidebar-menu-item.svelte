<script lang="ts">
	import { dashboardSidebarMenuThumbCrossfade } from '$lib/motion/presets';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { ripple } from '../primitives/ripple.svelte';
	import { getDashboardSidebarMenuContext } from './dashboard-sidebar-menu.svelte';

	let {
		children,
		href,
		...restProps
	}: ({ href: string } & HTMLAnchorAttributes) | ({ href?: undefined } & HTMLButtonAttributes) =
		$props();

	const menuCtx = getDashboardSidebarMenuContext();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="disabled:opacity-softer aria-[disabled]:opacity-softer gap-input-gap aria-[current]:text-primary-accent px-input-padding hover:not-aria-[current]:bg-input hover:not-aria-[current]:text-input-accent text-input *:icon:opacity-softer hover:not-aria-[current]:*:icon:opacity-soft rounded-input leading-sm *:icon:h-[calc(1em*var(--line-height-sm))] *:icon:w-[1em] *:icon:flex-none *:icon:self-start *:icon:transition-opacity aria-[current]:*:icon:opacity-100 relative flex flex-row whitespace-normal py-[calc(var(--spacing-input-padding)*0.5)] font-semibold transition-all aria-[current]:cursor-default"
	{href}
	{...restProps}
	use:ripple
>
	{#if restProps['aria-current'] && menuCtx}
		<div
			class="w-outline-focus bg-primary -right-card-padding absolute top-[.5em] bottom-[.5em] rounded-full"
			in:dashboardSidebarMenuThumbCrossfade.receive|global={{ key: menuCtx.thumbKey }}
			out:dashboardSidebarMenuThumbCrossfade.send={{ key: menuCtx.thumbKey }}
		></div>
	{/if}
	{@render children?.()}
</svelte:element>

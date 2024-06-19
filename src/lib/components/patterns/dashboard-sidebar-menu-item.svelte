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

	const menuCtx = getDashboardSidebarMenuContext(true);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="button button-nav h-[unset] origin-right whitespace-normal py-[calc(var(--spacing-input-padding)*0.5)]"
	{href}
	{...restProps}
	use:ripple
>
	{#if restProps['aria-current']}
		<div
			class="w-outline-focus bg-primary -right-popover-padding absolute top-[.5em] bottom-[.5em] rounded-full"
			in:dashboardSidebarMenuThumbCrossfade.receive|global={{ key: menuCtx.thumbKey }}
			out:dashboardSidebarMenuThumbCrossfade.send={{ key: menuCtx.thumbKey }}
		></div>
	{/if}
	{@render children?.()}
</svelte:element>

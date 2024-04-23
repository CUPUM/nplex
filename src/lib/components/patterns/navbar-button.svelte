<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { linkAttributes } from '../primitives/link.svelte';
	import { cn } from '../utilities';

	let {
		children,
		href,
		hreflang,
		currentOnSubpath,
		class: className,
		...buttonProps
	}:
		| (Parameters<typeof linkAttributes>[0] & HTMLAnchorAttributes)
		| (HTMLButtonAttributes & {
				href?: undefined;
				hreflang?: undefined;
				currentOnSubpath?: undefined;
		  }) = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...buttonProps}
	{...href ? linkAttributes({ href, hreflang, currentOnSubpath }) : {}}
	class={cn(
		'px-brick-gutter h-brick rounded-brick hover:text-primary-accent aria-[current]:text-primary active:animate-press relative flex flex-row items-center justify-center text-sm font-bold transition-all',
		className
	)}
	use:ripple
>
	{@render children?.()}
</svelte:element>

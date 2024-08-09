<script lang="ts">
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		href,
		children,
		class: className,
		...buttonProps
	}:
		| HTMLAnchorAttributes
		| (HTMLButtonAttributes & {
				href?: undefined;
				hreflang?: undefined;
		  }) = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	{...buttonProps}
	class={cn(
		'hover:text-primary-accent after:bg-base/soft not-has-logo:current:text-on-checked not-has-logo:current:after:bg-checked hover:bg-primary/10 px-input-padding h-input gap-input-gap user-select-none rounded-input duration-medium after:rounded-inherit *:icon:stroke-lg current-has-data-[thumb]:bg-transparent *:icon:w-[input-icon] relative flex flex-row items-center justify-center text-base font-bold transition-all ease-out after:absolute after:inset-0 after:-z-10 after:backdrop-blur-md [.aspect-square]:px-0',
		className
	)}
	use:ripple
>
	{@render children?.()}
</svelte:element>

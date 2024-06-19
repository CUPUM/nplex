<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { ripple } from '../primitives/ripple.svelte';
	import { cn } from '../utilities';

	let {
		children,
		href,
		class: className,
		...restProps
	}:
		| ({ href: string } & HTMLAnchorAttributes)
		| ({ href?: undefined } & HTMLButtonAttributes) = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class={cn('button button-nav font-semibold', className)}
	{href}
	{...restProps}
	use:ripple
>
	{@render children?.()}
</svelte:element>

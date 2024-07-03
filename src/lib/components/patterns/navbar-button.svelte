<script lang="ts">
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { ComponentProps } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Link, { linkAttributes } from '../primitives/link.svelte';
	import { cn } from '../utilities';

	let {
		children,
		href,
		hreflang,
		currentOnSubpath,
		class: className,
		...buttonProps
	}: (
		| ComponentProps<Link>
		| (HTMLButtonAttributes & {
				href?: undefined;
				hreflang?: undefined;
				currentOnSubpath?: undefined;
		  })
	) & {
		'data-square'?: boolean;
		'data-logo'?: boolean;
	} = $props();

	let _linkAttributes = $derived(
		href ? linkAttributes(href, { lang: hreflang, currentOnSubpath }) : undefined
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...buttonProps}
	{..._linkAttributes}
	class={cn(
		'hover:text-primary-accent not-data-logo:aria-[current]:text-on-checked not-data-logo:aria-[current]:bg-checked not-data-logo:hover:bg-primary/10 px-input-padding h-input gap-input-gutter user-select-none rounded-input duration-medium after:rounded-inherit *:[.lucide-icon]:stroke-lg relative flex flex-row items-center justify-center text-base font-bold transition-all ease-out after:inset-0 after:-z-1 after:backdrop-blur-md not-data-logo:after:absolute aria-[current]-has-data-[thumb]:bg-transparent data-logo:px-[var(--outline-width-focus)] data-logo:[--ripple-color:transparent] data-[square=true]:aspect-square data-[square=true]:px-0 *:[.lucide-icon]:w-[input-icon]',
		className
	)}
	use:ripple
>
	{@render children?.()}
</svelte:element>

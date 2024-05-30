<script lang="ts">
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { ComponentProps } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Link, { linkAttributes } from '../primitives/link.svelte';

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
	} = $props();

	let _linkAttributes = $derived(
		href ? linkAttributes(href, { lang: hreflang, currentOnSubpath }) : undefined
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...buttonProps}
	{..._linkAttributes}
	class="navbar-button {className}"
	use:ripple
>
	{@render children?.()}
</svelte:element>

<style>
	.navbar-button {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-input-gap);
		padding-left: var(--spacing-input-gutter);
		padding-right: var(--spacing-input-gutter);
		height: var(--spacing-input);
		border-radius: var(--radius-input);
		font-weight: var(--font-weight-bold);
		color: var(--color-fg);
		transition: all var(--transition-duration-medium) var(--transition-timing-function-out);

		&[data-square] {
			aspect-ratio: 1;
			padding-inline: 0;
		}

		&:active {
			animation: var(--animate-press);
		}

		&:hover {
			color: var(--color-primary-strong);
			/* background: color-mix(in srgb, var(--color-primary-soft) 10%, transparent); */
		}

		&[aria-current] {
			color: var(--color-primary);
		}

		& :global(:is(.lucide-icon, .spinner)) {
			stroke-width: 2.5px;
		}
	}
</style>

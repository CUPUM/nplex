<script lang="ts">
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { ComponentProps } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Link, { linkAttributes } from '../../lib/components/primitives/link.svelte';

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
	/* :global(#navbar:hover) {
		.navbar-button {
			background: var(--background-color-base);
		}
	} */

	.navbar-button {
		user-select: none;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-input-gutter);
		padding-left: var(--spacing-input-padding);
		padding-right: var(--spacing-input-padding);
		height: var(--spacing-input);
		border-radius: var(--radius-input);
		font-weight: var(--font-weight-bold);
		color: var(--color-fg);
		backdrop-filter: blur(var(--blur-md));
		box-shadow: 0 0.25em 0.75em 0 transparent;
		transition: all var(--transition-duration-medium) var(--transition-timing-function-out);

		&[data-square] {
			aspect-ratio: 1;
			padding-inline: 0;
		}

		&:active {
			animation: var(--animate-press);
			box-shadow: 0 0.25em 0.75em 0
				color-mix(in srgb, var(--color-primary) var(--opacity-softer), transparent);
		}

		&:hover {
			color: var(--color-primary-strong);
			/* background: color-mix(in srgb, var(--color-primary-soft) 10%, transparent); */
		}

		&[data-logo='true'] {
			color: var(--color-primary);
		}

		&:is([aria-current], [aria-expanded='true']):not([data-logo='true']) {
			color: var(--color-primary);
			box-shadow: 0 0 0 var(--border-width-input)
				color-mix(in srgb, var(--color-primary) var(--opacity-softer), transparent);
		}

		& :global(:is(.lucide-icon, .spinner)) {
			stroke-width: 2.5px;
		}
	}
</style>

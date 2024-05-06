<script lang="ts">
	import { ripple } from '$lib/actions/ripple.svelte';
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
	) & { 'data-square'?: boolean } = $props();

	let attributes = $derived(
		href ? linkAttributes(href, { lang: hreflang, currentOnSubpath }) : undefined
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...buttonProps}
	{...attributes}
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
		gap: var(--spacing-brick-gap);
		padding-left: var(--spacing-brick-gutter);
		padding-right: var(--spacing-brick-gutter);
		height: var(--spacing-brick);
		border-radius: var(--radius-brick);
		font-weight: var(--font-weight-bold);
		color: var(--color-fg);
		font-size: var(--font-size-sm);
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
	}
</style>

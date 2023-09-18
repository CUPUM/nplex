<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { i18nlink } from '$lib/i18n/link';
	import type { Action } from 'svelte/action';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = { href?: string; square?: boolean; logoButton?: boolean; action?: Action } & (
		| Omit<HTMLAnchorAttributes, 'href'>
		| HTMLButtonAttributes
	);

	export let href: $$Props['href'] = undefined;
	export let square: $$Props['square'] = undefined;
	export let action: $$Props['action'] = undefined;
	export let logoButton: $$Props['logoButton'] = undefined;

	$: as = href ? 'a' : 'button';
	$: linkAttributes = href ? $i18nlink(href) : {};
	$: _action = action ?? ((node: HTMLElement) => {});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={as}
	use:ripple={{
		color: 'var(--color-primary-500)',
		opacityStart: 0.2,
	}}
	{...$$restProps}
	{...linkAttributes}
	class="nav-button"
	class:square
	class:logo-button={logoButton}
	use:_action
	on:pointerdown
	on:keydown
>
	<slot />
</svelte:element>

<style lang="scss">
	.nav-button {
		position: relative;
		display: flex;
		white-space: nowrap;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		font-size: var(--size-sm);
		height: 3.25rem;
		padding-inline: 1.25em;
		border-radius: var(--radius-full);
		letter-spacing: 0.02em;
		outline: 1px solid transparent;
		outline-offset: 4px;
		transition:
			all 0.1s ease-out,
			outline 0.2s ease-out,
			outline-offset 0.2s ease-out;
		@include lg {
			padding-inline: var(--size-lg);
			border-radius: var(--radius-md);
		}

		&:hover:not([data-current]),
		&[data-state='open'] {
			color: var(--color-primary-500);
			background-color: color-mix(in srgb, var(--color-primary-300) 20%, transparent);
			@include dark {
				background-color: color-mix(in srgb, var(--color-primary-700) 20%, transparent);
			}
		}

		&[data-loading] {
			color: color-mix(in srgb, var(--color-neutral-500) 50%, transparent);
			transform: scale(0.9);
		}

		&:focus-visible:not([data-current]) {
			z-index: 1;
			outline: 3px solid color-mix(in hsl, var(--color-primary-500) 50%, transparent);
			outline-offset: 0;
		}

		&[data-state='open'] {
			z-index: 1;
		}

		&.square {
			aspect-ratio: 1;
			padding: 0;
			overflow: hidden;
			& :global(.nav-button-icon) {
				position: absolute;
			}
		}

		&[data-current] {
			cursor: default;
			color: var(--color-primary-500);
			box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary-500) 25%, transparent);
		}

		&.logo-button {
			box-shadow: none;
			@include lg {
				font-size: 1.5em;
			}
		}
	}
</style>

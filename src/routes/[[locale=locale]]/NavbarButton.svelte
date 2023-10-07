<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { MODES } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import type { DialogElements, DropdownMenuElements } from '@melt-ui/svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = (
		| ({ href: string } & HTMLButtonAttributes)
		| ({ href?: undefined } & HTMLAnchorAttributes)
	) & {
		outline?: boolean;
		square?: boolean;
		melt?: DropdownMenuElements['trigger'] | DialogElements['trigger'];
	};

	export let href: $$Props['href'] = undefined;
	export let square: $$Props['square'] = undefined;
	export let melt: $$Props['melt'] = undefined;
	export let outline: $$Props['outline'] = true;

	function navripple(node: HTMLElement) {
		return ripple(node, {
			color: $mode === MODES.LIGHT ? 'var(--color-primary-700)' : 'var(--color-primary-400)',
			opacityStart: 0.2,
		});
	}

	$: action = $melt?.action ?? (() => {});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	class="navbar-button"
	class:square
	class:no-outline={!outline}
	{href}
	use:navripple
	use:action
	{...$melt}
	{...$$restProps}
	on:pointerdown
	on:keydown
>
	<slot />
</svelte:element>

<style lang="postcss">
	.navbar-button {
		--button-size: 3rem;
		--button-padding: 1.1em;
		--button-radius: var(--base-radius);
		position: relative;
		display: flex;
		white-space: nowrap;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		font-size: var(--size-sm);
		height: calc(var(--button-size) - 2 * var(--group-inset, 0px));
		padding-inline: calc(var(--button-padding) - var(--group-inset, 0px));
		border-radius: calc(var(--button-radius) - var(--group-inset, 0px));
		letter-spacing: 0.02em;
		outline: 1px solid transparent;
		outline-offset: 4px;
		backdrop-filter: blur(8px);
		transition:
			all 0.1s ease-out,
			outline 0.2s ease-out,
			outline-offset 0.2s ease-out;

		&:hover:not([data-current]),
		&[data-state='open'] {
			color: var(--color-primary-700);
			background-color: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
			:global(:--dark) & {
				color: var(--color-primary-500);
				background-color: color-mix(in srgb, var(--color-primary-600) 10%, transparent);
			}

			& :global(.button-icon) {
				stroke-width: 2.75;
				transform: scale(0.92);
			}
		}

		&[data-loading] {
			color: color-mix(in srgb, var(--color-neutral-500) 50%, transparent);
			transform: scale(0.8);
		}

		&:focus-visible:not([data-current]) {
			z-index: 1;
			outline-offset: 2px;
			outline: 2px solid color-mix(in hsl, var(--color-primary-500) 50%, transparent);
		}

		&.no-outline {
			outline-width: 0 !important;
			backdrop-filter: none;
		}

		&[data-state='open'] {
			z-index: 1;
		}

		&.square {
			aspect-ratio: 1;
			padding: 0;
			overflow: hidden;
		}

		&[data-current] {
			cursor: default;
			color: var(--color-primary-600);
			outline-offset: 0;
			outline: 3px solid color-mix(in hsl, var(--color-primary-600) 75%, transparent);
			:global(:--dark) & {
				color: var(--color-primary-500);
				outline: 3px solid color-mix(in hsl, var(--color-primary-500) 50%, transparent);
			}

			& :global(.button-icon) {
				stroke-width: 3;
			}
		}

		& :global(.button-icon) {
			all: unset;
			fill: none;
			stroke: currentColor;
			stroke-linecap: round;
			stroke-width: 2.5;
			height: 1.25em;
			transform: scale(1);
			transition:
				stroke-width 0.25s ease-out,
				transform 1s var(--ease-out-expo);
		}
	}
</style>

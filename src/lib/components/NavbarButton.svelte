<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { MODES } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import type { StoresValues } from '$lib/utils/types';
	import type { DialogElements, DropdownMenuElements, TooltipElements } from '@melt-ui/svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = (
		| ({ href: string } & HTMLAnchorAttributes)
		| ({ href?: undefined } & HTMLButtonAttributes)
	) & {
		ghost?: boolean;
		square?: boolean;
		rounded?: boolean;
		tooltip?: StoresValues<TooltipElements['trigger']>;
		menu?: DropdownMenuElements['trigger'];
		dialog?: DialogElements['trigger'];
	};

	export let href: $$Props['href'] = undefined;
	export let square: $$Props['square'] = undefined;
	export let rounded: $$Props['rounded'] = undefined;
	export let ghost: $$Props['ghost'] = false;
	export let tooltip: StoresValues<TooltipElements['trigger']> | undefined = undefined;
	export let menu: DropdownMenuElements['trigger'] | undefined = undefined;
	export let dialog: DialogElements['trigger'] | undefined = undefined;

	function navripple(node: HTMLElement) {
		return ripple(node, {
			color: $mode === MODES.LIGHT ? 'var(--color-primary-700)' : 'var(--color-primary-400)',
			opacityStart: 0.2,
		});
	}

	$: menuaction = $menu?.action ?? (() => ({}));
	$: tooltipaction = tooltip?.action ?? (() => ({}));
	$: dialogaction = $dialog?.action ?? (() => ({}));
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	class="navbar-button"
	class:square
	class:ghost
	class:rounded
	{href}
	use:navripple
	on:click
	{...$$restProps}
	use:menuaction
	{...$menu}
	use:dialogaction
	{...$dialog}
	use:tooltipaction
	{...tooltip}
>
	<slot />
</svelte:element>

<style lang="postcss">
	.navbar-button {
		--button-size: 3.2em;
		--button-padding: 1em;
		--button-radius: var(--base-radius);
		position: relative;
		display: flex;
		white-space: nowrap;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		height: calc(var(--button-size) - 2 * var(--group-nesting, 0px));
		padding-inline: calc(var(--button-padding) - var(--group-nesting, 0px));
		border-radius: calc(var(--button-radius) - var(--group-nesting, 0px));
		letter-spacing: 0.02em;
		outline: 1px solid transparent;
		outline-offset: -2px;
		backdrop-filter: blur(16px);
		background: color-mix(in srgb, var(--base-bg) 50%, transparent);
		transition:
			all 0.1s ease-out,
			outline 0.2s ease-out,
			outline-offset 0.2s ease-out;

		&:hover:not([data-current]),
		&[data-state='open'] {
			color: var(--color-primary-700);
			background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
			:global(:--dark) & {
				color: var(--color-primary-500);
				background: color-mix(in srgb, var(--color-primary-600) 10%, transparent);
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
			&.no-outline {
				background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
			}
		}

		&.ghost {
			outline-width: 0 !important;
			background: none;
			backdrop-filter: none;
		}

		&[data-state='open'] {
			z-index: 1;
		}

		&.rounded {
			--button-radius: var(--radius-full);
		}

		&.square {
			aspect-ratio: 1;
			padding: 0;
			overflow: hidden;
		}

		&[data-current] {
			cursor: default;
			color: var(--color-primary-700);
			:global(:--dark) & {
				color: var(--color-primary-500);
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

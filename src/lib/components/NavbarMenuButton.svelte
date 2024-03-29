<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { MODES } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import type { DropdownMenuElements } from '@melt-ui/svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = (
		| ({ href: string } & HTMLAnchorAttributes)
		| ({ href?: undefined } & HTMLButtonAttributes)
	) & {
		melt?: DropdownMenuElements['item'];
	};

	export let href: $$Props['href'] = undefined;
	export let melt: $$Props['melt'] = undefined;

	function buttonripple(node: HTMLElement) {
		return ripple(node, {
			color: $mode === MODES.LIGHT ? 'var(--color-primary-900)' : 'var(--color-primary-200)',
			opacityStart: 0.2,
		});
	}

	$: action = $melt?.action ?? (() => {});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	class="navbar-menu-button"
	use:buttonripple
	on:click
	{href}
	use:action
	{...$melt}
	{...$$restProps}
>
	<slot />
</svelte:element>

<style lang="postcss">
	.navbar-menu-button {
		user-select: none;
		position: relative;
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0.8em 1em;
		gap: 1em;
		border-radius: var(--radius-sm);
		transition: all 0.1s ease-out;

		&:active {
			animation: var(--animation-press);
		}

		&:disabled,
		&[data-disabled] {
			pointer-events: none;
			opacity: 0.25;
			/* filter: blur(1px); */
		}

		&[data-current] {
			cursor: default;
			color: var(--color-primary-600);
			:global(:--dark) & {
				color: var(--color-primary-400);
			}

			& :global(.button-icon) {
				opacity: 1;
			}
		}

		&:hover:not([data-current]),
		&:focus-visible:not([data-current]) {
			color: var(--color-primary-700);
			background: color-mix(in srgb, var(--color-primary-700) 10%, transparent);
			:global(:--dark) & {
				color: var(--color-primary-500);
				background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
			}

			& :global(.button-icon) {
				opacity: 1;
				transform: translateX(0.2em);
			}
		}

		&:focus-visible {
			outline: var(--base-focus-ring);
		}

		& :global(.button-icon) {
			all: unset;
			fill: none;
			stroke: currentColor;
			stroke-width: 2.5;
			stroke-linecap: square;
			stroke-linejoin: round;
			width: 1em;
			opacity: 0.35;
			transition: all 0.25s ease-out;
		}
	}
</style>

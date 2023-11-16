<script lang="ts" context="module">
	export const [currentSend, currentReceive] = crossfade({
		duration: 250,
		easing: expoInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 250, easing: expoOut });
		},
	});
</script>

<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { onDestroy } from 'svelte';
	import { expoInOut, expoOut } from 'svelte/easing';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { crossfade, fly, scale } from 'svelte/transition';
	import { getSidebarIndex, getSidebarKey } from './Sidebar.svelte';
	import { getGroupDelay, getGroupIndex } from './SidebarGroup.svelte';

	type $$Props = { danger?: boolean } & (
		| ({ href: string } & HTMLAnchorAttributes)
		| ({ href?: undefined } & HTMLButtonAttributes)
	);

	export let href: $$Props['href'] = undefined;
	export let danger: $$Props['danger'] = undefined;

	const indexCtx = getGroupIndex() ?? getSidebarIndex();
	const index = indexCtx?.add() ?? 0;
	const groupDelay = getGroupDelay() ?? 0;
	const delay = groupDelay + index * 100;
	const needleKey = getSidebarKey();

	$: current = $$restProps['data-current'];

	onDestroy(() => {
		indexCtx?.remove();
	});
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="item"
	class:danger
	{...$$restProps}
	{href}
	use:ripple
	in:fly={{ x: -6, delay, duration: 750, easing: expoOut }}
>
	<slot />
	{#if current}
		<div
			class="needle"
			in:currentReceive={{ key: needleKey }}
			out:currentSend={{ key: needleKey }}
		></div>
	{/if}
</svelte:element>

<style lang="postcss">
	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		z-index: 1;
		border-radius: var(--radius-sm);
		line-height: 1.5em;
		transition: all 0.15s ease-out;
		white-space: wrap;
		font-weight: 400;
		padding: 0.8em 1.25em;
		font-size: 0.9rem;
		opacity: 0.9;

		&:disabled,
		&[aria-disabled] {
			opacity: 0.2;
			pointer-events: none;
		}

		&:active {
			animation: var(--animation-press);
		}

		&:hover,
		&:focus-visible {
			&:not([data-current]) {
				opacity: 1;
				color: var(--color-neutral-950);
				background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
				:global(:--dark) & {
					color: var(--color-neutral-50);
				}
				&.danger {
					color: var(--color-error-600);
					background-color: color-mix(in srgb, var(--color-error-500) 10%, transparent);
					:global(:--dark) & {
						color: var(--color-error-400);
					}
				}
				:global(.button-icon) {
					opacity: 1;
					transform: translateX(0.2em);
				}
			}
		}

		&[data-current] {
			opacity: 1;
			color: var(--color-primary-600);
			font-weight: 550;
			:global(:--dark) & {
				color: var(--color-primary-500);
			}
			:global(.button-icon) {
				opacity: 1;
			}
		}

		&.danger {
			color: var(--color-error-700);
			:global(:--dark) & {
				color: var(--color-error-300);
			}
		}

		:global(.button-icon) {
			flex: none;
			opacity: 0.35;
			transition: all var(--duration-fast) ease-out;
			width: 1.25em;
			stroke-width: 2;
			transform: translateX(0);
		}
	}

	.needle {
		position: absolute;
		transform-origin: right;
		top: 0.75em;
		bottom: 0.75em;
		right: calc(-1 * var(--sidebar-group-nesting));
		width: var(--sidebar-needle-size);
		border-radius: inherit;
		background-color: var(--color-primary-600);
		:global(:--dark) & {
			background-color: var(--color-primary-500);
		}
		.danger & {
			background-color: var(--color-error-800);
			:global(:--dark) & {
				background-color: var(--color-error-300);
			}
		}
	}
</style>

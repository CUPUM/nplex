<!-- 
	@component
	Attaches a tooltip element to the last HTML element passed through the component's default slot.

 -->
<svelte:options accessors={true} />

<script lang="ts" context="module">
	const TIP_ROUNDNESS = 20;
	const TIP =
		`M 0,-0 C ${TIP_ROUNDNESS},0 ` +
		`${50 - TIP_ROUNDNESS},50 50,50 C ${50 + TIP_ROUNDNESS},50 ` +
		`${100 - TIP_ROUNDNESS},0 100,-0 Z`;
	const TIME_BUFFER_IN = 350;
	const TIME_BUFFER_OUT = 500;
	let TIMER: any;
	let DELAY = false;
</script>

<script lang="ts">
	import { STATES, type State } from '$utils/enums';

	import { THEMES, type ThemeName } from '$utils/themes';
	import type { ComponentProps } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Tether from './Tether.svelte';
	import Tip from './Tip.svelte';

	export let message: string | undefined | null = null;
	export let disabled: boolean | undefined = undefined;
	export let opened: boolean = false;
	export let hover: boolean = true;
	export let theme: ThemeName = THEMES.dark;
	export let state: State = STATES.Normal;
	export let place: ComponentProps<Tether>['place'] = 'top';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let distance: ComponentProps<Tether>['distance'] = 5;
	export let passive: boolean = false;

	function open() {
		opened = true;
	}
	function close() {
		opened = false;
	}

	$: if (disabled) {
		close();
	}
</script>

<Tether
	on:pointerdown={() => {
		if (!hover && !passive) open();
	}}
	on:clickoutside={() => {
		if (!hover && !passive) close();
	}}
	on:pointerenter={() => {
		if (hover && !passive) {
			clearTimeout(TIMER);
			if (DELAY) {
				TIMER = setTimeout(() => {
					open();
					DELAY = false;
				}, TIME_BUFFER_IN);
			} else {
				open();
			}
		}
	}}
	on:pointerleave={() => {
		if (hover && !passive) close();
		clearTimeout(TIMER);
		TIMER = setTimeout(() => {
			DELAY = true;
		}, TIME_BUFFER_OUT);
	}}
	{place}
	{align}
	{distance}
>
	<slot slot="anchor" open={opened} />
	{#if opened && message && !disabled}
		<div
			data-theme={theme}
			class="tooltip {place} {align}"
			in:scale={{ start: 0.9, easing: cubicOut, duration: 100, opacity: 0 }}
			out:scale={{ start: 0.95, easing: cubicIn, duration: 150, opacity: 0 }}
		>
			<slot name="message" open={opened}>
				{@html message}
			</slot>
			<Tip class="tip" />
		</div>
	{/if}
</Tether>

<style lang="scss">
	.tooltip {
		--tip-pad: calc(0.5 * var(--w));
		--tip-size: 1em;
		--d-sum: calc(var(--d) + 0.5 * var(--tip-size));
		user-select: none;
		position: absolute;
		pointer-events: none;
		display: block;
		flex: none;
		// white-space: nowrap;
		width: max-content;
		line-height: 1.3;
		font-weight: 350;
		font-size: var(--ui-text-sm);
		max-width: var(--ui-width-sm);
		padding: 0.5em 1em 0.6em 1em;
		margin: 0;
		background: col(bg, 100, 0.94);
		color: col(fg, 300);
		border-radius: 0.8em;
		letter-spacing: 0.02em;
		transform-origin: inherit;
		z-index: 1000;
		// box-shadow: 0 0.8em 1.8em -0.8em rgba(0, 10, 20, 0.5);

		:global(.tip) {
			font-size: var(--tip-size);
			color: col(bg, 100, 0.94);
		}
	}

	.top {
		bottom: var(--d-sum);
		& :global(.tip) {
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 100%);
		}
	}

	.bottom {
		top: var(--d-sum);
		& :global(.tip) {
			top: 0;
			left: 50%;
			transform: translate(-50%, -100%) rotate(180deg);
		}
	}

	.top,
	.bottom {
		&.start {
			& :global(.tip) {
				left: var(--tip-pad);
			}
		}
		&.end {
			& :global(.tip) {
				left: calc(100% - var(--tip-pad));
			}
		}
	}

	.right {
		left: var(--d-sum);
		& :global(.tip) {
			left: 0;
			top: 50%;
			transform: translate(-100%, -50%) rotate(90deg);
		}
	}

	.left {
		right: var(--d-sum);
		& :global(.tip) {
			right: 0;
			top: 50%;
			transform: translate(100%, -50%) rotate(-90deg);
		}
	}

	.left,
	.right {
		&.start {
			& :global(.tip) {
				top: var(--tip-pad);
			}
		}
		&.end {
			& :global(.tip) {
				top: calc(100% - var(--tip-pad));
			}
		}
	}
</style>

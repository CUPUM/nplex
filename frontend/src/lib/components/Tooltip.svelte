<!-- 
	@component
	Attaches a tooltip element to the last HTML element passed through the component's default slot.

 -->
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
	import { THEMES, type ThemeName } from '$utils/themes';
	import type { ComponentProps } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Tether from './Tether.svelte';

	export let message: string = '';
	export let disabled: boolean | undefined = undefined;
	export let open: boolean = false;
	export let hover: boolean = true;
	export let theme: ThemeName = THEMES.dark;
	export let place: ComponentProps<Tether>['place'] = 'top';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let distance: ComponentProps<Tether>['distance'] = 5;
	export function show() {
		open = true;
	}
	export function hide() {
		open = false;
	}

	$: if (!message || disabled) {
		hide();
	}
</script>

<Tether
	on:pointerdown={() => {
		if (!hover) show();
	}}
	on:clickoutside={() => {
		if (!hover) hide();
	}}
	on:pointerenter={() => {
		if (hover) {
			clearTimeout(TIMER);
			if (DELAY) {
				TIMER = setTimeout(() => {
					show();
					DELAY = false;
				}, TIME_BUFFER_IN);
			} else {
				show();
			}
		}
	}}
	on:pointerleave={() => {
		if (hover) hide();
		clearTimeout(TIMER);
		TIMER = setTimeout(() => {
			DELAY = true;
		}, TIME_BUFFER_OUT);
	}}
	{place}
	{align}
	{distance}
>
	<slot slot="anchor" {open} />
	{#if open}
		<div
			data-theme={theme}
			class="tooltip {place} {align}"
			in:scale={{ start: 0.5, easing: expoOut, duration: 100 }}
			out:scale={{ start: 0.75, easing: expoIn, duration: 75 }}
		>
			<slot name="message" {open}>
				{@html message}
			</slot>
			<svg class="tip" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<path d={TIP} />
			</svg>
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
		font-size: var(--ui-text-xs);
		max-width: var(--ui-width-p);
		padding: 0.5em 1em 0.6em 1em;
		margin: 0;
		background: col(bg, 100, 0.94);
		color: col(fg, 500);
		border-radius: 0.8em;
		letter-spacing: 0.02em;
		transform-origin: inherit;
		z-index: 1000;
		// box-shadow: 0 0.8em 1.8em -0.8em rgba(0, 10, 20, 0.5);
	}

	.tip {
		position: absolute;
		height: var(--tip-size);
		width: var(--tip-size);
		padding: 0;
		margin: 0;
		background: transparent;
		overflow: visible;
		path {
			fill: col(bg, 100, 0.94);
		}
	}

	.top {
		bottom: var(--d-sum);
		& .tip {
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 100%);
		}
	}

	.bottom {
		top: var(--d-sum);
		& .tip {
			top: 0;
			left: 50%;
			transform: translate(-50%, -100%) rotate(180deg);
		}
	}

	.top,
	.bottom {
		&.start {
			& .tip {
				left: var(--tip-pad);
			}
		}
		&.end {
			& .tip {
				left: calc(100% - var(--tip-pad));
			}
		}
	}

	.right {
		left: var(--d-sum);
		& .tip {
			left: 0;
			top: 50%;
			transform: translate(-100%, -50%) rotate(90deg);
		}
	}

	.left {
		right: var(--d-sum);
		& .tip {
			right: 0;
			top: 50%;
			transform: translate(100%, -50%) rotate(-90deg);
		}
	}

	.left,
	.right {
		&.start {
			& .tip {
				top: var(--tip-pad);
			}
		}
		&.end {
			& .tip {
				top: calc(100% - var(--tip-pad));
			}
		}
	}
</style>

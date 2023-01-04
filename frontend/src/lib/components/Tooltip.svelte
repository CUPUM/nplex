<!-- 
	@component
	Attaches a tooltip element to the last HTML element passed through the component's default slot.

 -->
<script lang="ts">
	import { THEME_NAMES } from '$utils/themes';
	import type { ComponentProps } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Tether from './Tether.svelte';

	export let message: string = '';
	export let disabled: boolean | undefined = undefined;
	export let open: boolean = false;
	export let hover: boolean = true;
	export let place: ComponentProps<Tether>['place'] = 'top';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let distance: ComponentProps<Tether>['distance'] = 5;

	let controlRef: HTMLElement;
	let destructors: () => void;
	const tipRoundness = 20;
	const tip =
		`M 0,-0 C ${tipRoundness},0 ` +
		`${50 - tipRoundness},50 50,50 C ${50 + tipRoundness},50 ` +
		`${100 - tipRoundness},0 100,-0 Z`;

	function show() {
		open = true;
	}

	function hide() {
		open = false;
	}

	$: if (!message || disabled) {
		hide();
	}

	function setTriggers(ref: HTMLElement) {
		if (destructors) destructors();
		const start = hover ? 'mouseenter' : 'click';
		const end = hover ? 'mouseleave' : 'clickoutside';
		ref.addEventListener(start, show);
		ref.addEventListener(end, hide);
		destructors = () => {
			ref.removeEventListener(start, show);
			ref.removeEventListener(end, hide);
		};
	}

	$: if (controlRef) {
		setTriggers(controlRef);
	}
</script>

<Tether bind:controlRef {place} {align} {distance}>
	<slot slot="control" {open} />
	{#if open}
		<div
			class="tooltip {place} {align}"
			data-theme={THEME_NAMES.dark}
			in:scale={{ start: 0.5, easing: expoOut, duration: 100 }}
			out:scale={{ start: 0.75, easing: expoIn, duration: 75 }}
		>
			<slot name="message" {open}>
				{message}
			</slot>
			<svg class="tip" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<path d={tip} />
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
		white-space: nowrap;
		font-weight: 300;
		font-size: var(--ui-text-sm);
		padding: 0.5em 1em 0.6em 1em;
		margin: 0;
		background: col(bg, 900, 0.95);
		color: col(fg, 100);
		border-radius: 0.5em;
		letter-spacing: 0.02em;
		transform-origin: inherit;
		z-index: 1000;
		box-shadow: 0 0.8em 1.8em -0.8em rgba(0, 10, 20, 0.5);
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
			fill: col(bg, 900, 0.95);
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

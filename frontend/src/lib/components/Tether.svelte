<svelte:options accessors />

<!--
	@component
	Tethers slotted content to a given HTMLElement or to the mouse-position.
	Useful for positioning content relative to controls, in cases like tooltips and popovers.

	Attention: Make sure the offsetParent of the anchor is not 'static' positioned.
	If the tethered item is statically positionned inside a component that is transitioned,
	there will be a miscalculation of its position due to the initial offsetParent
	being different when the svelte applies a non static position for the transition.

	Two CSS classes can be accessed:
	- `.ui-anchor`
	- `.ui-tether`: has the place and align classes
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { cssSize } from '$utils/css';
	import { debounce } from '$utils/modifiers';
	import { onDestroy, onMount } from 'svelte';

	export let place: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'start';
	export let distance: number | string = 0;

	/**
	 * Anchoring div, with "display: contents" style.
	 */
	export let anchorRef: HTMLElement | undefined = undefined;

	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let x: number;
	let y: number;
	let w: number;
	let h: number;
	let dispose: () => void;

	const updatePosition = debounce(async () => {
		if (anchorRef?.firstElementChild instanceof HTMLElement) {
			y = anchorRef.firstElementChild.offsetTop;
			x = anchorRef.firstElementChild.offsetLeft;
			w = anchorRef.firstElementChild.offsetWidth;
			h = anchorRef.firstElementChild.offsetHeight;
		}
	}, 50);

	function tether(anchor: HTMLElement) {
		anchor.addEventListener('transitionend', updatePosition, {});
		resizeObs = new ResizeObserver(updatePosition);
		mutationObs = new MutationObserver(updatePosition);
		if (anchor.offsetParent) {
			resizeObs.observe(anchor);
			resizeObs.observe(anchor.offsetParent);
			mutationObs.observe(anchor, { attributes: true });
			mutationObs.observe(anchor.offsetParent, { attributes: true });
			anchor.offsetParent.addEventListener('transitionend', () => console.log(anchor.offsetParent));
		}
		updatePosition();
		dispose = () => {
			anchor.removeEventListener('transitionend', updatePosition);
			resizeObs?.disconnect();
			mutationObs?.disconnect();
		};
	}

	onMount(async () => {
		tether(anchorRef!);
	});

	onDestroy(() => {
		if (dispose) {
			dispose();
		}
	});
</script>

<div
	use:clickoutside
	bind:this={anchorRef}
	class="ui-anchor"
	on:clickoutside
	on:keydown
	on:click
	on:pointerup
	on:pointerleave
	on:pointerenter
>
	<slot name="anchor" {updatePosition} />
</div>
<div
	class="ui-tether {place} {align}"
	style:--x="{x}px"
	style:--y="{y}px"
	style:--w="{w}px"
	style:--h="{h}px"
	style:--d={cssSize(distance)}
>
	<slot {anchorRef} {updatePosition} />
</div>

<style lang="scss">
	.ui-anchor {
		position: relative;
		display: contents !important;
	}

	.ui-tether {
		pointer-events: none;
		user-select: none;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		overflow: visible;
		& > :global(:where(*)) {
			flex: 0;
			pointer-events: all;
			user-select: initial;
			position: relative;
			overflow: visible;
		}
	}

	.top,
	.bottom {
		left: var(--x);
		width: var(--w);
		&.start {
			justify-content: flex-start;
		}
		&.end {
			justify-content: flex-end;
		}
	}

	.top {
		top: var(--y);
		transform-origin: center bottom;
		&.start {
			transform-origin: calc(0.5 * var(--w)) bottom;
		}
		&.end {
			transform-origin: calc(100% - 0.5 * var(--w)) bottom;
		}
	}

	.bottom {
		top: calc(var(--y) + var(--h));
		transform-origin: center top;
		&.start {
			transform-origin: calc(0.5 * var(--w)) top;
		}
		&.end {
			transform-origin: calc(100% - 0.5 * var(--w)) top;
		}
	}

	.left,
	.right {
		top: var(--y);
		height: var(--h);
		&.start {
			align-items: flex-start;
		}
		&.end {
			align-items: flex-end;
		}
	}

	.left {
		left: var(--x);
		transform-origin: right center;
		&.start {
			transform-origin: right calc(0.5 * var(--h));
		}
		&.end {
			transform-origin: right calc(100% - 0.5 * var(--h));
		}
	}

	.right {
		left: calc(var(--x) + var(--w));
		transform-origin: left center;
		&.start {
			transform-origin: left calc(0.5 * var(--h));
		}
		&.end {
			transform-origin: left calc(100% - 0.5 * var(--h));
		}
	}
</style>

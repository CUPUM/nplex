<svelte:options accessors />

<!--
	@component
	Tethers slotted content to a given HTMLElement or to the mouse-position.
	Useful for positioning content relative to controls, in cases like tooltips and popovers.

-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { cssSize } from '$utils/css';
	import { onDestroy } from 'svelte';

	export let place: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'start';
	export let distance: number | string = 0;

	/**
	 * Anchoring div, with "display: contents" style.
	 */
	export let anchorRef: HTMLElement | undefined = undefined;

	/**
	 * Attached content.
	 */
	let tetherRef: HTMLElement;

	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let x: number;
	let y: number;
	let w: number;
	let h: number;
	let dispose: () => void;

	function updatePosition() {
		if (anchorRef?.firstElementChild instanceof HTMLElement) {
			y = anchorRef.firstElementChild.offsetTop;
			x = anchorRef.firstElementChild.offsetLeft;
			w = anchorRef.firstElementChild.offsetWidth;
			h = anchorRef.firstElementChild.offsetHeight;
		}
	}

	function tether(anchor: HTMLElement) {
		anchor.addEventListener('transitionend', updatePosition);
		resizeObs = new ResizeObserver(updatePosition);
		mutationObs = new MutationObserver(updatePosition);
		if (anchor.offsetParent) {
			resizeObs.observe(anchor, {});
			resizeObs.observe(anchor.offsetParent, {});
			mutationObs.observe(anchor, { attributes: true });
			mutationObs.observe(anchor.offsetParent, { attributes: true });
		}
		dispose = () => {
			anchor.removeEventListener('transitionend', updatePosition);
			resizeObs?.disconnect();
			mutationObs?.disconnect();
		};
	}

	$: if (anchorRef) {
		tether(anchorRef);
		updatePosition();
	}

	onDestroy(() => {
		if (dispose) {
			dispose();
		}
	});
</script>

<div
	bind:this={anchorRef}
	class="anchor"
	use:clickoutside
	on:clickoutside|self
	on:pointerdown|self
	on:pointerup|self
	on:pointerleave|self
	on:pointerenter|self
>
	<slot name="anchor" />
</div>
<div
	bind:this={tetherRef}
	class="tether {place} {align}"
	style:--x="{x}px"
	style:--y="{y}px"
	style:--w="{w}px"
	style:--h="{h}px"
	style:--d={cssSize(distance)}
>
	<slot {anchorRef} />
</div>

<style lang="scss">
	.anchor {
		position: relative;
		display: contents !important;
	}

	.tether {
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
			transform-origin: left bottom;
		}
		&.end {
			transform-origin: right bottom;
		}
	}

	.bottom {
		top: calc(var(--y) + var(--h));
		transform-origin: center top;
		&.start {
			transform-origin: left top;
		}
		&.end {
			transform-origin: right top;
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
			transform-origin: right top;
		}
		&.end {
			transform-origin: right bottom;
		}
	}

	.right {
		left: calc(var(--x) + var(--w));
		transform-origin: left center;
		&.start {
			transform-origin: left top;
		}
		&.end {
			transform-origin: left bottom;
		}
	}
</style>

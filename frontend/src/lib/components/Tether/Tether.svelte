<svelte:options accessors />

<!--
	@component
	Tethers slotted content to a given HTMLElement or to the mouse-position.
	Useful for positioning content relative to controls, in cases like tooltips and popovers.

	Attention: Make sure the offsetParent of the anchor is not 'static'ally positioned.
	If the tethered item is statically positionned inside a component that is transitioned,
	there will be a miscalculation of its position due to the initial offsetParent
	being different when the svelte applies a non static position for the transition.
-->

<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { getClosestBoxChild, targetIsWithin } from '$utils/dom';
	import { KEY } from '$utils/enums';
	import { debounce } from '$utils/modifiers';
	import { createEventDispatcher, tick } from 'svelte';

	export let opened: boolean = false;
	export let disabled: boolean = false;
	export let useClick: boolean = true; // Is click (or space/enter when keyboard navigating) required to open the tether? Else hover or focusin will be used.
	export let closeOnNav: boolean | { params: boolean; hash: boolean; pathname: boolean } = true;
	export let closeOnClickoutside: boolean = true;
	export let place: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'start';
	export let distance: string | undefined = undefined;
	export let boundingElement: Element | undefined = undefined; // Used as box reference for automatic positioning and sizing correction.

	let anchorRef: HTMLElement | undefined;
	let contentRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let x: number;
	let y: number;
	let w: number;
	let h: number;
	let downedOutside = false;

	const updatePosition = debounce(async () => {
		if (anchorRef) {
			x = anchorRef.offsetLeft;
			y = anchorRef.offsetTop;
			w = anchorRef.offsetWidth;
			h = anchorRef.offsetHeight;
		}
	}, 50);

	// function handleScroll(e: Event) {
	// 	// To do: update box limits in accordance with scroll-resulting viewport...
	// 	if (!autoPosition) {
	// 		return;
	// 	}
	// }

	function setAnchor(anchor: HTMLElement) {
		anchorRef = getClosestBoxChild(anchor, { includeTarget: true });
		anchor.addEventListener('transitionend', updatePosition, {});
		resizeObs = new ResizeObserver(updatePosition);
		mutationObs = new MutationObserver(updatePosition);
		if (anchor.offsetParent) {
			resizeObs.observe(anchor);
			resizeObs.observe(anchor.offsetParent);
			mutationObs.observe(anchor, { attributes: true });
			mutationObs.observe(anchor.offsetParent, { attributes: true });
		}
		updatePosition();
		return {
			destroy() {
				if (anchorRef === anchor) {
					anchor.removeEventListener('transitionend', updatePosition);
					resizeObs?.disconnect();
					mutationObs?.disconnect();
				}
			},
		};
	}

	const dispatch = createEventDispatcher<{
		open: null;
		close: null;
	}>();

	$: if (disabled) {
		opened = false;
	}

	$: dispatch(opened ? 'open' : 'close');

	function open() {
		opened = true;
	}

	function close() {
		opened = false;
	}

	function toggle() {
		opened = !opened;
	}

	function handleHoverStart(e: PointerEvent) {
		if (disabled || useClick) {
			return;
		}
		open();
	}

	function handleHoverEnd(e: PointerEvent) {
		if (
			disabled ||
			useClick ||
			targetIsWithin(e.relatedTarget, contentRef) ||
			targetIsWithin(e.relatedTarget, anchorRef)
		) {
			return;
		}
		close();
	}

	function handleClick(e: MouseEvent) {
		if (disabled || !useClick) {
			return;
		}
		toggle();
	}

	function handleFocusStart(e: FocusEvent) {
		if (disabled || useClick) {
			return;
		}
		open();
	}

	function handleKeypress(e: KeyboardEvent) {
		if (disabled || !useClick) {
			return;
		}
		if (e.key === KEY.Enter || e.key === KEY.Space) {
			toggle();
		}
	}

	function handleFocusEnd(e: FocusEvent) {
		if (
			disabled ||
			targetIsWithin(e.relatedTarget, contentRef) ||
			targetIsWithin(e.relatedTarget, anchorRef)
		) {
			return;
		}
		close();
	}

	function handleWindowClickStart(e: PointerEvent) {
		if (disabled || !closeOnClickoutside) {
			return;
		}
		downedOutside = true;
	}

	function handleWindowClickEnd(e: PointerEvent) {
		if (!downedOutside) {
			return;
		}
		downedOutside = false;
		if (disabled || !closeOnClickoutside) {
			return;
		}
		close();
	}

	afterNavigate(async () => {
		if (closeOnNav) {
			await tick(); // Awaiting a tick avoids conflict with other navigation-related logic (ex.: button loading state check).
			close();
		}
	});
</script>

<svelte:window on:pointerdown={handleWindowClickStart} on:pointerup={handleWindowClickEnd} />

<div
	class="tether-anchor"
	use:setAnchor
	on:click={handleClick}
	on:keypress={handleKeypress}
	on:pointerenter={handleHoverStart}
	on:pointerleave={handleHoverEnd}
	on:focusin={handleFocusStart}
	on:focusout={handleFocusEnd}
	class:opened
>
	<slot name="anchor" {opened} {open} {close} {toggle} />
</div>
{#if opened}
	<div
		bind:this={contentRef}
		class="tether-content {place} {align}"
		style:--tether-x="{x}px"
		style:--tether-y="{y}px"
		style:--tether-w="{w}px"
		style:--tether-h="{h}px"
		style:--tether-d={distance ?? '0px'}
		on:focusout={handleFocusEnd}
		on:pointerenter={handleHoverStart}
		on:pointerleave={handleHoverEnd}
	>
		<slot name="content" {opened} {open} {close} {toggle} />
	</div>
{/if}

<style lang="scss">
	.tether-anchor {
		all: inherit;
		display: contents;
	}

	.opened {
		z-index: 999;
	}

	.tether-content {
		position: absolute;
		z-index: 999;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		overflow: visible;
		perspective: 500px;
	}

	.top,
	.bottom {
		left: var(--tether-x);
		width: var(--tether-w);
		&.start {
			justify-content: flex-start;
		}
		&.end {
			justify-content: flex-end;
		}
	}

	.top {
		top: var(--tether-y);
		padding-bottom: var(--tether-d);
		transform-origin: center bottom;
		&.start {
			transform-origin: calc(0.5 * var(--tether-w)) bottom;
		}
		&.end {
			transform-origin: calc(100% - 0.5 * var(--tether-w)) bottom;
		}
	}

	.bottom {
		top: calc(var(--tether-y) + var(--tether-h));
		padding-top: var(--tether-d);
		transform-origin: center top;
		&.start {
			transform-origin: calc(0.5 * var(--tether-w)) top;
		}
		&.end {
			transform-origin: calc(100% - 0.5 * var(--tether-w)) top;
		}
	}

	.left,
	.right {
		top: var(--tether-y);
		height: var(--tether-h);
		&.start {
			align-items: flex-start;
		}
		&.end {
			align-items: flex-end;
		}
	}

	.left {
		left: var(--tether-x);
		padding-right: var(--tether-d);
		transform-origin: right center;
		&.start {
			transform-origin: right calc(0.5 * var(--tether-h));
		}
		&.end {
			transform-origin: right calc(100% - 0.5 * var(--tether-h));
		}
	}

	.right {
		left: calc(var(--tether-x) + var(--tether-w));
		padding-left: var(--tether-d);
		transform-origin: left center;
		&.start {
			transform-origin: left calc(0.5 * var(--tether-h));
		}
		&.end {
			transform-origin: left calc(100% - 0.5 * var(--tether-h));
		}
	}
</style>

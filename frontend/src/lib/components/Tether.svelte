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
	import { onDestroy, onMount } from 'svelte';

	export let place: 'top' | 'right' | 'bottom' | 'left';
	export let align: 'start' | 'center' | 'end' | 'stretch';
	export let distance: number | string;
	export let controlRef: HTMLElement | undefined = undefined;

	let tetherRef: HTMLElement;
	let mutationObs: MutationObserver;
	let controlRefPresenceObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let x: number;
	let y: number;
	let w: number;
	let h: number;
	let destructors: () => void;

	function updatePosition() {
		if (controlRef) {
			y = controlRef.offsetTop;
			x = controlRef.offsetLeft;
			w = controlRef.offsetWidth;
			h = controlRef.offsetHeight;
		}
	}

	function updateControlRef(e?: MutationRecord[]) {
		if (
			!controlRef ||
			(e &&
				e.some((m) =>
					controlRef instanceof Element ? Array.from(m.removedNodes).includes(controlRef) : false
				))
		) {
			if (tetherRef.previousElementSibling instanceof HTMLElement) {
				controlRef = tetherRef.previousElementSibling ?? undefined;
			}
		}
	}

	function tether(control: HTMLElement) {
		if (destructors) destructors();
		control.addEventListener('transitionend', updatePosition);
		resizeObs = new ResizeObserver(updatePosition);
		mutationObs = new MutationObserver(updatePosition);
		controlRefPresenceObs = new MutationObserver(updateControlRef);
		if (control.offsetParent) {
			resizeObs.observe(control, {});
			resizeObs.observe(control.offsetParent, {});
			mutationObs.observe(control, { attributes: true });
			mutationObs.observe(control.offsetParent, { attributes: true });
			controlRefPresenceObs.observe(control.offsetParent, { childList: true });
		}
		destructors = () => {
			control.removeEventListener('transitionend', updatePosition);
			resizeObs?.disconnect();
			mutationObs?.disconnect();
			controlRefPresenceObs?.disconnect();
		};
	}

	$: if (controlRef) {
		tether(controlRef);
	}

	onMount(() => {
		updateControlRef();
		updatePosition();
	});

	onDestroy(() => {
		if (destructors) destructors();
	});
</script>

<slot name="control" />
<div
	class="tether {place} {align}"
	bind:this={tetherRef}
	use:clickoutside
	style:--x="{x}px"
	style:--y="{y}px"
	style:--w="{w}px"
	style:--h="{h}px"
	style:--d={cssSize(distance)}
>
	<slot {controlRef} />
</div>

<style lang="scss">
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

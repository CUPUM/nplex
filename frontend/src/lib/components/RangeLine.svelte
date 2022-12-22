<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { createEventDispatcher, getContext, onDestroy } from 'svelte';
	import { getRangeContext } from './Range.svelte';

	const CTX_KEY = 'range-line-context';

	interface RangeLineContext {}

	export function getRangeLineContext() {
		return getContext<RangeLineContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	export let from: number | undefined = undefined;
	export let to: number | undefined = undefined;
	export let bidirectional: boolean = false;
	export let draggable: boolean = false;

	const { min, max, step, direction, pc, px, disabled } = getRangeContext();
	const dispatch = createEventDispatcher();

	let active = false;
	let lineRef: HTMLElement;
	let prevx: number | undefined;
	let prevy: number | undefined;

	$: _from = from ?? $min;
	$: _to = to ?? $max;
	$: p1 = pc(bidirectional ? Math.min(_from, _to) : _from);
	$: p2 = pc(bidirectional ? Math.max(_from, _to) : _to);

	function drag(e: PointerEvent) {
		if (!lineRef || prevx === undefined || prevy === undefined) {
			return;
		}
		let delta = 0;
		if (direction === 'row') {
			delta = e.pageX - prevx;
		} else {
			delta = e.pageY - prevy;
		}
		if (from !== undefined) {
			from = Math.min(Math.max(from + px(delta), $min), $max);
		}
		if (to !== undefined) {
			to = Math.min(Math.max(to + px(delta), $min), $max);
		}
		prevx = e.pageX;
		prevy = e.pageY;
	}

	function dragstart(e: PointerEvent) {
		if (!draggable || $disabled) {
			return;
		}
		active = true;
		prevx = e.pageX;
		prevy = e.pageY;
		if (browser) {
			document.addEventListener('pointerup', dragend, { once: true });
			document.addEventListener('pointermove', drag);
		}
	}

	function dragend(e: PointerEvent) {
		active = false;
		prevx = undefined;
		prevy = undefined;
		document.removeEventListener('pointerup', dragend);
		document.removeEventListener('pointermove', drag);
	}

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('pointerup', dragend);
			document.removeEventListener('pointermove', drag);
		}
	});
</script>

<svelte:element
	this={draggable && !$disabled ? 'button' : 'div'}
	bind:this={lineRef}
	style:--p1="{p1}%"
	style:--p2="{p2}%"
	class="line"
	class:active
	on:pointerdown={dragstart}
/>
<slot />

<style lang="scss">
	.line {
		--line-thickness: calc(var(--track-thickness) + 4px);
		position: absolute;
		background: purple;
		outline: none;

		:global(.row .inner) > & {
			height: var(--line-thickness);
			left: var(--p1);
			width: calc(var(--p2) - var(--p1));
		}

		:global(.column .inner) > & {
			background: red;
			width: var(--line-thickness);
			top: var(--p1);
			height: calc(var(--p2) - var(--p1));
		}

		&::before {
			content: '';
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 99px;
			background: blue;
			transition: all 0.2s var(--ui-ease-out);
		}
	}

	.active,
	.line:focus-visible {
		background: red;

		&::before {
			opacity: 0.5;
			top: -5px;
			left: -5px;
			bottom: -5px;
			right: -5px;
		}
	}
</style>

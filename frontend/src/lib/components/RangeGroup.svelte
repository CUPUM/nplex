<!--
	@component
	# Range Group
	Group two range values for co-dependent behavior and visual cues.
	
-->
<script lang="ts" context="module">
	const POINT = {
		from: 'from',
		to: 'to',
	} as const;
	type Point = ValueOf<typeof POINT>;
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onDestroy, tick } from 'svelte';
	import { spring } from 'svelte/motion';
	import type { ValueOf } from 'ts-essentials';
	import { getRangeContext } from './Range.svelte';
	import { rangeThumbSpringOptions } from './RangeThumb.svelte';

	const { min, max, step, snap, direction, pc, map, disabled } = getRangeContext();

	export let from: number = $min;
	export let to: number = $max;
	export let draggable: boolean = false;
	export let push: boolean = false;
	export let collide: boolean = true;
	export let line: boolean = true;

	function pushing(pusher: Point) {
		if (pusher === POINT.from) {
			to = Math.max(to, from);
		} else {
			from = Math.min(to, from);
		}
	}

	async function colliding(collider: Point) {
		if (collider === POINT.from) {
			await tick();
			from = Math.min(to, from);
		} else {
			await tick();
			to = Math.max(to, from);
		}
	}

	$: if (push && from !== undefined) {
		pushing(POINT.from);
	}
	$: if (push && to !== undefined) {
		pushing(POINT.to);
	}
	$: if (collide && !push && from !== undefined) {
		colliding(POINT.from);
	}
	$: if (collide && !push && to !== undefined) {
		colliding(POINT.to);
	}

	const dispatch = createEventDispatcher();
	const relfrom = spring(from, rangeThumbSpringOptions);
	const relto = spring(to, rangeThumbSpringOptions);

	let active = false;
	let lineRef: HTMLElement;
	let startfrom: number | undefined;
	let startto: number | undefined;
	let startx: number | undefined;
	let starty: number | undefined;

	$: relfrom.set(pc(collide ? from : Math.min(from, to)));
	$: relto.set(pc(collide ? to : Math.max(from, to)));

	function drag(e: PointerEvent) {
		if (!lineRef || startx === undefined || starty === undefined) {
			return;
		}
		let delta = 0;
		if (direction === 'row') {
			delta = e.pageX - startx;
		} else {
			delta = e.pageY - starty;
		}
		if (startfrom !== undefined) {
			from = snap(Math.min(Math.max(startfrom + map(delta), $min), $max));
		}
		if (startto !== undefined) {
			to = snap(Math.min(Math.max(startto + map(delta), $min), $max));
		}
	}

	function dragstart(e: PointerEvent) {
		active = true;
		startfrom = from;
		startto = to;
		startx = e.pageX;
		starty = e.pageY;
		if (browser) {
			document.addEventListener('pointerup', dragend, { once: true });
			document.addEventListener('pointermove', drag);
		}
	}

	function dragend(e: PointerEvent) {
		active = false;
		startfrom = undefined;
		startto = undefined;
		startx = undefined;
		starty = undefined;
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

{#if line}
	<svelte:element
		this={draggable ? 'button' : 'div'}
		disabled={$disabled}
		bind:this={lineRef}
		style:--relfrom="{$relfrom}%"
		style:--relto="{$relto}%"
		class="line"
		class:active
		on:pointerdown={dragstart}
	/>
{/if}

<style lang="scss">
	.line {
		--line-thickness: calc(var(--track-thickness) + 2px);
		position: absolute;
		background: blue;
		border-radius: 99px;
		outline: none;

		:global(.row .inner) > & {
			height: var(--line-thickness);
			left: var(--relfrom);
			width: max(0%, calc(var(--relto) - var(--relfrom)));
		}

		:global(.column .inner) > & {
			background: red;
			width: var(--line-thickness);
			top: var(--relfrom);
			height: max(0%, calc(var(--relto) - var(--relfrom)));
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

	.line:disabled,
	div {
		pointer-events: none;
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

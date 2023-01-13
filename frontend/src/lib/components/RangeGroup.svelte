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

	function stepify(value: number, step: number, op: 'ceil' | 'round' | 'floor') {
		const stepped = value / step;
		return Math[op](stepped) * step;
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount, tick } from 'svelte';
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

	const relfrom = spring(from, rangeThumbSpringOptions);
	const relto = spring(to, rangeThumbSpringOptions);

	let lineRef: HTMLElement;
	let startfrom: number | undefined;
	let startto: number | undefined;
	let startx: number | undefined;
	let starty: number | undefined;

	$: relfrom.set(pc(collide ? from : Math.min(from, to)));
	$: relto.set(pc(collide ? to : Math.max(from, to)));

	onMount(() => {
		relfrom.set(pc(collide ? from : Math.min(from, to)), { hard: true });
		relto.set(pc(collide ? to : Math.max(from, to)), { hard: true });
	});

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
		type="button"
		disabled={$disabled}
		bind:this={lineRef}
		style:--relfrom="{$relfrom}%"
		style:--relto="{$relto}%"
		class="line"
		on:pointerdown={dragstart}
	>
		{#if $$slots.default}
			<label>
				<slot />
			</label>
		{/if}
	</svelte:element>
{/if}

<style lang="scss">
	.line {
		--line-thickness: calc(var(--track-thickness) + 2px);
		position: absolute;
		border-radius: 99px;
		outline: none;
		transition: box-shadow 0.25s var(--ui-ease-out), background 0.25s var(--ui-ease-out);

		:global(.row .inner) > & {
			height: var(--line-thickness);
			left: var(--relfrom);
			width: max(0%, calc(var(--relto) - var(--relfrom)));
		}

		:global(.column .inner) > & {
			width: var(--line-thickness);
			top: var(--relfrom);
			height: max(0%, calc(var(--relto) - var(--relfrom)));
		}
	}

	.line:disabled,
	div {
		pointer-events: none;
	}

	// Variants

	:global(.default .inner) > {
		button {
			background: col(fg, 000);
			box-shadow: 0 0 0 0 col(primary, 500, 0);

			&:active,
			&:focus-visible {
				background: col(primary, 700);
				box-shadow: 0 0 0 var(--outline-width) col(primary, 300, 0.5);
			}
		}
	}
</style>

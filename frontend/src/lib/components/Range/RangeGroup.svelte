<!--
	@component
	# Range Group
	Group two range values for co-dependent behavior and visual cues.
	
-->
<script lang="ts" context="module">
	const POINT = {
		From: 'from',
		To: 'to',
	} as const;
	type Point = ValueOf<typeof POINT>;
</script>

<script lang="ts">
	import slide from '$actions/slide';
	import type { AppCustomEvent } from '$types/utils';
	import { snap } from '$utils/number';
	import { spring } from 'svelte/motion';
	import type { ValueOf } from 'ts-essentials';
	import { getRangeContext, rangeSpringOptions } from './Range.svelte';

	const { min, max, step, valueToPercent, pxToValue, disabled } = getRangeContext();

	export let from: number = $min;
	export let to: number = $max;
	export let draggable: boolean = false;
	export let maxdelta: number | undefined = undefined;
	export let mindelta: number = 0;
	export let pushpull: boolean = false;
	export let collide: boolean = true;
	export let line: boolean = true;

	function applyPushpull(pusher: Point) {
		if (pusher === POINT.From) {
			const toMax = Math.max(to, from + mindelta);
			to = maxdelta ? Math.min(toMax, $max, from + maxdelta) : Math.min(toMax, $max);
		} else {
			const fromMin = Math.min(to - mindelta, from);
			from = maxdelta ? Math.max(fromMin, $min, to - maxdelta) : Math.max(fromMin, $min);
		}
	}

	async function applyCollide(collider: Point) {
		if (collider === POINT.From) {
			const inner = Math.min(to - mindelta, from);
			from = maxdelta ? Math.max(inner, to - maxdelta) : inner;
		} else {
			const inner = Math.max(to, from + mindelta);
			to = maxdelta ? Math.min(inner, to + maxdelta) : inner;
		}
	}

	$: if (pushpull && from != undefined) {
		applyPushpull(POINT.From);
	}
	$: if (pushpull && to != undefined) {
		applyPushpull(POINT.To);
	}
	$: if (collide && !pushpull && from != undefined) {
		applyCollide(POINT.From);
	}
	$: if (collide && !pushpull && to != undefined) {
		applyCollide(POINT.To);
	}

	const relativeFrom = spring(valueToPercent(from), rangeSpringOptions);
	const relativeTo = spring(valueToPercent(to), rangeSpringOptions);

	$: $relativeFrom = valueToPercent(collide ? from : Math.min(from, to));
	$: $relativeTo = valueToPercent(collide ? to : Math.max(from, to));

	let lineRef: HTMLElement;
	let startFromValue: number | null = null;
	let startToValue: number | null = null;

	// function handleKey(e: KeyboardEvent) {
	// 	if (!focused) {
	// 		return;
	// 	}
	// 	const jump = e.shiftKey ? ($max - $min) / 10 : $step;
	// 	switch (e.key) {
	// 		case KEY.ArrowUp:
	// 		case KEY.ArrowRight:
	// 			from += jump;
	// 			to += jump;
	// 			break;
	// 		case KEY.ArrowDown:
	// 		case KEY.ArrowLeft:
	// 			from -= jump;
	// 			to -= jump;
	// 			break;
	// 	}
	// }

	function handleMove(e: AppCustomEvent<'on:slide.move'>) {
		if (startFromValue != null) {
			from = snap(Math.min(Math.max(startFromValue + pxToValue(e.detail.d), $min), $max), $step, {
				origin: $min,
			});
		}
		if (startToValue != null) {
			to = snap(Math.min(Math.max(startToValue + pxToValue(e.detail.d), $min), $max), $step, {
				origin: $min,
			});
		}
	}
</script>

{#if line}
	<button
		disabled={$disabled || !draggable}
		style:--range-line-from-percent="{$relativeFrom}%"
		style:--range-line-to-percent="{$relativeTo}%"
		class="range-line"
		use:slide
		on:slide.start={() => {
			startFromValue = from;
			startToValue = to;
		}}
		on:slide.move={handleMove}
		on:slide.end={() => {
			startFromValue = null;
			startToValue = null;
		}}
	>
		{#if $$slots.default}
			<label>
				<slot />
			</label>
		{/if}
	</button>
{/if}

<style lang="scss">
	@use './RangeGroup.scss';
</style>

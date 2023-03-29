<!--
	@component
	# Range Group
	Group two range values for co-dependent behavior and visual cues.
	
-->
<script lang="ts" context="module">
	const POINT = {
		From: 'form',
		To: 'to',
	} as const;
</script>

<script lang="ts">
	import slide from '$actions/slide';
	import type { AppCustomEvent, NonUndefinable } from '$types/utils';
	import { snap } from '$utils/number';
	import { tick } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { spring } from 'svelte/motion';
	import { getRangeContext, motionOptions } from './Range.svelte';
	import RangeThumb from './RangeThumb.svelte';

	const { min, max, step, valueToPercent, pxToValue, disabled } = getRangeContext();

	type $$Props = HTMLInputAttributes & {
		from?: number;
		to?: number;
		draggable?: boolean;
		maxDelta?: number;
		minDelta?: number;
		pushpull?: boolean;
		collide?: boolean;
		line?: boolean;
	};

	export let from: $$Props['from'] = undefined;
	export let to: $$Props['to'] = undefined;
	export let draggable: $$Props['draggable'] = false;
	export let maxDelta: $$Props['maxDelta'] = undefined;
	export let minDelta: NonUndefinable<$$Props['minDelta']> = 0;
	export let pushpull: $$Props['pushpull'] = false;
	export let collide: $$Props['collide'] = true;
	export let line: $$Props['line'] = true;

	let computedFrom = from ?? $min;
	let computedTo = to ?? $max;
	$: computedFrom = from ?? $min;
	$: computedTo = to ?? $max;

	async function checkFrom() {
		if (pushpull) {
			await tick();
			const toMin = Math.max(computedFrom + minDelta, computedTo);
			to = maxDelta ? Math.min($max, toMin, computedFrom + maxDelta) : Math.min($max, toMin);
		} else if (collide) {
			const fromMax = Math.min(computedTo - minDelta, computedFrom);
			from = maxDelta ? Math.max($min, fromMax, computedTo - maxDelta) : Math.max(fromMax, $min);
		}
	}

	async function checkTo() {
		if (pushpull) {
			await tick();
			const fromMax = Math.min(computedTo - minDelta, computedFrom);
			from = maxDelta ? Math.max($min, fromMax, computedTo - maxDelta) : Math.max($min, fromMax);
		} else if (collide) {
			const toMin = Math.max(computedFrom + minDelta, computedTo);
			to = maxDelta ? Math.min($max, toMin, computedFrom + maxDelta) : Math.min(toMin, $max);
		}
	}

	$: if (from) checkFrom();
	$: if (to) checkTo();

	const relativeFrom = spring(valueToPercent(computedFrom), motionOptions);
	$: $min,
		$max,
		relativeFrom.set(valueToPercent(collide ? computedFrom : Math.min(computedFrom, computedTo)));

	const relativeTo = spring(valueToPercent(computedTo), motionOptions);
	$: $min,
		$max,
		relativeTo.set(valueToPercent(collide ? computedTo : Math.max(computedFrom, computedTo)));

	let startFromValue: number | null = null;
	let startToValue: number | null = null;

	function handleLineMove(e: AppCustomEvent<'on:slide.move'>) {
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

<br />
{#if line}
	<button
		disabled={$disabled || !draggable}
		style:--range-line-from-percent="{$relativeFrom}%"
		style:--range-line-to-percent="{$relativeTo}%"
		class="range-line"
		use:slide
		on:slide.start={() => {
			startFromValue = from ?? null;
			startToValue = to ?? null;
		}}
		on:slide.move={handleLineMove}
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
{#if from != null}
	<RangeThumb bind:value={from} />
{/if}
{#if to != null}
	<RangeThumb bind:value={to} />
{/if}
<input type="hidden" {...$$restProps} readonly value="[{computedFrom},{computedTo}]" />

<style lang="scss">
	@use './RangeGroup.scss';
</style>

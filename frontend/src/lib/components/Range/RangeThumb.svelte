<!--
	@component
	# Range Thumb
	Range input thumb control.
	
-->
<script lang="ts">
	import slide from '$actions/slide';
	import type { AppCustomEvent } from '$types/utils';
	import { POSITIONINGS, type Positioning } from '$utils/enums';
	import { snap } from '$utils/number';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { spring } from 'svelte/motion';
	import { scale } from 'svelte/transition';
	import { getRangeContext, rangeSpringOptions } from './Range.svelte';

	const {
		min: rangeMin,
		max: rangeMax,
		step,
		disabled: rangeDisabled,
		reverse,
		valueToPercent,
		pxToValue,
	} = getRangeContext();

	type $$Props = Omit<HTMLInputAttributes, 'value'> & {
		value: number;
		min?: number;
		max?: number;
		disabled?: boolean;
		readonly?: boolean;
		labelPosition?: Positioning;
	};

	export let value: $$Props['value'] = 0;
	export let min: $$Props['min'] = undefined;
	export let max: $$Props['max'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export let readonly: $$Props['readonly'] = undefined;
	export let labelPosition: $$Props['labelPosition'] = POSITIONINGS.BlockStart;

	const relativeValue = spring(valueToPercent(value), rangeSpringOptions);

	$: $relativeValue = valueToPercent(value);
	$: computedMax = max ?? $rangeMax;
	$: computedMin = min ?? $rangeMin;

	let startValue: number | null = null;

	function handleMove(e: AppCustomEvent<'on:slide.move'>) {
		if (startValue == null) {
			return;
		}
		value = snap(
			Math.max(Math.min(startValue + pxToValue(e.detail.d), computedMax), computedMin),
			$step,
			{
				origin: $rangeMin,
			}
		);
	}
</script>

<label
	class="range-thumb"
	class:disabled
	class:readonly
	use:slide
	on:slide.start={() => {
		startValue = value;
	}}
	on:slide.move={handleMove}
	on:slide.end={() => {
		startValue = null;
	}}
	style:--range-thumb-percent="{$relativeValue}%"
>
	<input
		{...$$restProps}
		type="range"
		min={computedMin}
		max={computedMax}
		disabled={$rangeDisabled || disabled}
		{readonly}
		step={$step}
		bind:value
		on:input
		on:change
		on:reset
		on:focus
		on:blur
	/>
	{#if $$slots.default}
		<div
			class="range-label {labelPosition}"
			transition:scale|local={{ duration: 200, start: 0.95 }}
		>
			<slot {value} />
		</div>
	{/if}
</label>

<style lang="scss">
	@use './RangeThumb.scss';
</style>

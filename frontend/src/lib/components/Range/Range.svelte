<!--
	@component
	# Range
	A range input primitive that can host RangeGroups and RangeThumbs.
	
-->
<script lang="ts" context="module">
	const CTX_KEY = 'range-context';

	interface RangeContext {
		min: Readable<number>;
		max: Readable<number>;
		step: Readable<number>;
		disabled: Readable<boolean | undefined>;
		reverse: Readable<boolean | undefined>;
		valueToPercent: (value: number) => number;
		pxToValue: (px: number) => number;
	}

	export function getRangeContext() {
		return getContext<RangeContext>(CTX_KEY);
	}

	export const rangeSpringOptions: Parameters<typeof spring<number>>[1] = {
		stiffness: 0.25,
		damping: 0.75,
	};
</script>

<script lang="ts">
	import resize from '$actions/resize';
	import type { AppCustomEvent } from '$types/utils';

	import {
		ORIENTATIONS,
		STATES,
		VARIANTS,
		type Orientation,
		type State,
		type Variant,
	} from '$utils/enums';
	import { getContext, setContext } from 'svelte';
	import type { spring } from 'svelte/motion';
	import { readonly, writable, type Readable } from 'svelte/store';

	export let id: string | undefined = undefined;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let ticks: 'step' | number | undefined = undefined;
	export let orientation: Orientation = ORIENTATIONS.Row;
	export let reverse: boolean | undefined = undefined;
	export let variant: Variant = VARIANTS.Default;
	export let state: State = STATES.Normal;
	export let disabled: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	const _min = writable(min);
	$: _min.set(min);
	const _max = writable(max);
	$: _max.set(max);
	const _step = writable(step);
	$: _step.set(step);
	const _disabled = writable<boolean | undefined>(disabled);
	$: _disabled.set(disabled);
	const _reverse = writable<boolean | undefined>(reverse);
	$: _reverse.set(reverse);

	let trackSize = 0;

	function handleResize(e: AppCustomEvent<'on:resize'>) {
		// const style = getComputedStyle(e.detail.entry.target);
		trackSize = e.detail.entry.contentBoxSize[0].inlineSize;
	}

	/**
	 * Translating a domain-bound range value to a domain-bound percentage distance.
	 */
	function valueToPercent(value: number) {
		const mapped = ((value - min) / (max - min)) * 100;
		return Math.max(Math.min(mapped, 100), 0);
	}

	/**
	 * Translating a domain-less pixel value to a domain-bound range value.
	 */
	function pxToValue(px: number) {
		return (px / trackSize) * (max - min);
	}

	setContext<RangeContext>(CTX_KEY, {
		min: readonly(_min),
		max: readonly(_max),
		step: readonly(_step),
		disabled: readonly(_disabled),
		reverse: readonly(_reverse),
		valueToPercent,
		pxToValue,
	});
</script>

<fieldset
	{id}
	class="range {variant} {state} {orientation} {className}"
	class:reverse
	{style}
	style:--range-min={min}
	style:--range-max={max}
>
	<div class="range-track-container">
		<div class="range-track" use:resize on:resize={handleResize} />
		<slot />
	</div>
	{#if ticks}
		<div class="range-ticks-container">
			{#if ticks === 'step'}
				{@const arr = [
					...Array((max - min) / step)
						.fill(undefined)
						.map((un, i) => min + i * step),
					max,
				]}
				{#each arr as tick, i}
					<div class="range-tick" style:--range-tick-value={tick}>
						<slot name="tick" {tick} first={i === 0} last={i === arr.length - 1} />
					</div>
				{/each}
			{:else}
				{@const arr = [
					...Array(Math.round((max - min) / ticks))
						.fill(undefined)
						.map((un, i) => min + i * Number(ticks)),
					max,
				]}
				{#each arr as tick, i}
					<div class="range-tick" style:--range-tick-value={tick}>
						<slot name="tick" tick={Number(tick)} first={i === 0} last={i === arr.length - 1} />
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</fieldset>

<style lang="scss">
	@use './Range.scss';
</style>

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
		direction: 'row' | 'column';
		disabled: Readable<boolean | undefined>;
		pc: (value: number) => number;
		map: (value: number) => number;
		snap: (value: number) => number;
	}

	export function getRangeContext() {
		return getContext<RangeContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Readable } from 'svelte/store';

	export let min: number;
	export let max: number;
	export let step: number;
	export let ticks: 'step' | number | undefined = undefined;
	export let direction: RangeContext['direction'] = 'row';
	export let variant: 'default' | 'cta' | 'outlined' = 'default';
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

	let trackw = 0;
	let trackh = 0;

	/**
	 * Translating a domain-bound absolute value to a percentage distance.
	 */
	function pc(input: number) {
		const mapped = ((input - min) / (max - min)) * 100;
		return Math.max(Math.min(mapped, 100), 0);
	}

	/**
	 * Translating a domainless (viewport) pixel value to a bound percentage.
	 */
	function map(input: number) {
		const domain = direction === 'row' ? trackw : trackh;
		return (input / domain) * (max - min);
	}

	/**
	 * Snap a given value according to the range step-size. Snapped values are calculated from the
	 * range's min.
	 */
	function snap(input: number) {
		return Math.round((input - min) / step) * step + min;
	}

	setContext<RangeContext>(CTX_KEY, {
		min: { subscribe: _min.subscribe },
		max: { subscribe: _max.subscribe },
		step: { subscribe: _step.subscribe },
		direction,
		disabled: { subscribe: _disabled.subscribe },
		pc,
		map,
		snap,
	});
</script>

<fieldset
	class="range {variant} {direction} {className}"
	{style}
	style:--min={min}
	style:--max={max}
>
	<div class="inner">
		<div class="track" bind:clientWidth={trackw} bind:clientHeight={trackh} />
		{#if ticks}
			{#if ticks === 'step'}
				{@const arr = [
					...Array((max - min) / step)
						.fill(undefined)
						.map((un, i) => min + i * step),
					max,
				]}
				{#each arr as tick, i}
					<div class="tick" style:--tick={tick}>
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
					<div class="tick" style:--tick={tick}>
						<slot name="tick" tick={Number(tick)} first={i === 0} last={i === arr.length - 1} />
					</div>
				{/each}
			{/if}
		{/if}
		<slot />
	</div>
</fieldset>

<style lang="scss">
	:where(.range) {
		--domain: calc(var(--max) - var(--min));
		--thumb-size: 1em;
		--thumb-radius: calc(var(--thumb-size) * 0.5);
		--track-thickness: max(3px, 0.3em);
		--outline-width: 5px;
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
	}

	:where(.row) {
		padding-inline: var(--thumb-radius);
		.inner {
			width: 100%;
			height: var(--ui-height);
		}
	}

	:where(.column) {
		padding-block: var(--thumb-radius);
		.inner {
			height: 100%;
			width: var(--ui-height);
		}
	}

	.inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.track {
		position: absolute;
		border-radius: 99px;
		.row & {
			box-sizing: content-box;
			padding-inline: calc(0.5 * var(--track-thickness));
			width: 100%;
			height: var(--track-thickness);
		}
		.column & {
			height: 100%;
			width: var(--track-thickness);
		}
	}

	.tick {
		--d: 1em;
		--l: 0.5em;
		font-size: var(--ui-text-xs);
		font-variant-numeric: tabular-nums;
		text-align: center;
		// z-index: 1;
		color: col(fg, 100, 0.5);
		position: absolute;
		left: calc((var(--tick) - var(--min)) * 100% / var(--domain));
		top: 50%;
		margin-top: calc(0.5 * var(--track-thickness));
		padding-top: var(--d);
		height: 1em;
		width: max-content;
		transform: translateX(-50%);
		&::before {
			top: 0;
			left: calc(50%);
			transform: translateX(-50%);
			content: '';
			position: absolute;
			height: var(--l);
			width: 1.5px;
			background: col(fg, 100, 0.1);
		}
		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	bottom: 100%;
		// 	width: var(--track-thickness);
		// 	aspect-ratio: 1;
		// 	border-radius: 50%;
		// 	background: col(fg, 100, 0.2);
		// 	left: calc(50%);
		// 	transform: translateX(-50%);
		// }
	}

	// Variants

	.default {
		.track {
			background: col(fg, 100, 0.2);
		}
	}

	.outlined {
	}

	.cta {
		.track {
			background: col(primary, 900, 0.5);
		}
	}
</style>

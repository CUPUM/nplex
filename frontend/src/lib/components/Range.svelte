<script lang="ts" context="module">
	const CTX_KEY = 'range-context';

	interface RangeContext {
		min: Readable<number>;
		max: Readable<number>;
		step: Readable<number>;
		direction: 'row' | 'column';
		disabled: Readable<boolean | undefined>;
		pc: (value: number) => number;
		px: (value: number) => number;
	}

	export function getRangeContext() {
		return getContext<RangeContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Readable } from 'svelte/store';

	export let min: string | number;
	export let max: string | number;
	export let step: string | number;
	export let direction: RangeContext['direction'] = 'row';
	export let disabled: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	const _min = writable(+min);
	$: _min.set(+min);
	const _max = writable(+max);
	$: _max.set(+max);
	const _step = writable(+step);
	$: _step.set(+step);
	const _disabled = writable<boolean | undefined>(disabled);
	$: _disabled.set(disabled);

	let trackw = 0;
	let trackh = 0;

	/**
	 * Translating a domain-bound absolute value to a percentage distance.
	 */
	function pc(input: number) {
		const mapped = Math.max((input - +min) / +max - +min) * 100;
		return Math.max(Math.min(mapped, +max), +min);
	}

	/**
	 * Translating a domainless (viewport) pixel value to a bound percentage.
	 */
	function px(input: number) {
		const domain = direction === 'row' ? trackw : trackh;
		return (input * (+max - +min)) / domain;
	}

	setContext<RangeContext>(CTX_KEY, {
		min: { subscribe: _min.subscribe },
		max: { subscribe: _max.subscribe },
		step: { subscribe: _step.subscribe },
		direction,
		disabled: { subscribe: _disabled.subscribe },
		pc,
		px,
	});
</script>

<fieldset class="range {direction} {className}" {style}>
	<div class="inner">
		<div class="track" bind:clientWidth={trackw} bind:clientHeight={trackh} />
		<slot />
	</div>
</fieldset>

<style lang="scss">
	:where(.range) {
		--thumb-size: 1em;
		--thumb-radius: calc(var(--thumb-size) * 0.5);
		--track-thickness: max(2px, 0.1em);
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		border: 1px solid red;
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
		background: currentColor;
		border-radius: 99px;

		.row & {
			width: 100%;
			height: var(--track-thickness);
		}

		.column & {
			height: 100%;
			width: var(--track-thickness);
		}
	}
</style>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext } from 'svelte';
	import { spring } from 'svelte/motion';
	import type { RangeContext } from './Range.svelte';

	const { min, max, step } = getContext<RangeContext>(Ctx.Range);

	export let value: number;
	export let name: string;

	const springValue = spring(value, { stiffness: 0.35, damping: 0.65 });

	$: springValue.set(value);
</script>

<div class="thumb" style:--value={value} />
<input
	type="range"
	{name}
	step={$step}
	min={$min}
	max={$max}
	id="{name}-thumb"
	on:input={(e) => (value = +e.target.value)}
	value={$springValue}
/>

<style lang="scss">
	input {
		position: absolute;
		width: 100%;
		padding: 0;
		margin: 0;
		top: 0;
		height: 0;
	}

	.thumb {
		--size: 40px;
		position: absolute;
		top: calc(-0.5 * var(--size));
		left: calc((((100% - 0.5 * var(--size)) * var(--value)) / (var(--max) - var(--min))) - 0.5 * var(--size));
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background-color: royalblue;
	}
</style>

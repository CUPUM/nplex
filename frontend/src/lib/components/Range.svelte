<script lang="ts" context="module">
	export interface RangeContext {
		min: Writable<number>;
		max: Writable<number>;
		step: Writable<number>;
	}
</script>

<script lang="ts">
	import { Ctx } from '$utils/enums';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let min: string | number = 0;
	export let max: string | number = 10;
	export let step: string | number = 1;
	export let tickMarks: boolean = false;

	const _min = writable(+min);
	const _max = writable(+max);
	const _step = writable(+step);

	$: $_min = +min;
	$: $_max = +max;
	$: $_step = +step;

	setContext<RangeContext>(Ctx.Range, {
		min: _min,
		max: _max,
		step: _step,
	});
</script>

<fieldset style:--min={$_min} style:--max={$_max}>
	<div class="track">
		{#if tickMarks}
			<div class="ticks">
				<div class="tick" />
			</div>
		{/if}
		<slot />
	</div>
</fieldset>

<style lang="scss">
	fieldset {
		padding: 0;
		border: none;
		position: relative;
	}

	.track {
		position: relative;
		height: 3px;
		width: 100%;
		background-color: red;
	}

	.ticks {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}
</style>

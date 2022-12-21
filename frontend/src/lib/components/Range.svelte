<script lang="ts" context="module">
	const CTX_KEY = 'range-context';

	interface RangeContext {
		min: Readable<number>;
		max: Readable<number>;
		step: Readable<number>;
	}

	export function getRangeContext() {
		return getContext<RangeContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Readable } from 'svelte/store';

	export let min: string | number = 0;
	export let max: string | number = 10;
	export let step: string | number = 1;
	export let direction: 'horizontal' | 'vertical' = 'horizontal';

	const _min = writable(+min);
	$: _min.set(+min);
	const _max = writable(+max);
	$: _max.set(+max);
	const _step = writable(+step);
	$: _step.set(+step);

	$: $_min = +min;
	$: $_max = +max;
	$: $_step = +step;

	setContext<RangeContext>(CTX_KEY, {
		min: { subscribe: _min.subscribe },
		max: { subscribe: _max.subscribe },
		step: { subscribe: _step.subscribe },
	});
</script>

<fieldset class="range {direction}">
	<slot />
</fieldset>

<style lang="scss">
	:where(.range) {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: minmax(var(--ui-height), auto);
		background: red;
	}

	.vertical {
	}
</style>

<script lang="ts">
	import { throttle } from '$utils/modifiers';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { fly, type TransitionConfig } from 'svelte/transition';

	type T = $$Generic<{
		in: (
			element: Element,
			options: P extends Record<string, unknown> ? P : never
		) => TransitionConfig;
	}>;

	export let value: number;
	export let format: (value: number) => string = (v) => v.toString();
	export let timeout: number = 250;
	export let transition: T['in'] = fly as any;
	export let transitionOptions:
		| Parameters<T['in']>[1]
		| ((i: number, value: number, prev: number) => Parameters<T['in']>[1])
		| undefined = (i, value, prev) => ({
		y: 10 * (value > prev ? -1 : 1),
		duration: 150,
		easing: cubicOut,
	});

	let chars: number[];
	let prev: typeof chars;

	$: throttled = throttle(format, timeout);
	$: if (value !== undefined) {
		prev = chars;
		chars = throttled(value)
			.split('')
			.map((str) => Number(str));
	}

	function key(n: number, i: number) {
		return n + ' ' + i;
	}
</script>

<span class="counter">
	{#each chars as n, i (key(n, chars.length - i + 1))}
		<span
			class="char"
			in:transition={transitionOptions instanceof Function
				? transitionOptions(i, n, prev[chars.length - 1])
				: transitionOptions}
			animate:flip
		>
			{n}
		</span>
	{/each}
</span>

<style lang="scss">
	span {
		position: relative;
		display: inline-block;
		font-variant-numeric: tabular-nums lining-nums;
	}

	.counter {
		word-wrap: none;
	}

	.char {
		display: inline-block;
	}
</style>

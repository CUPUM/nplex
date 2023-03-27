<!--
	@component
	Image Placeholder
	
 -->
<script lang="ts" context="module">
	const MIN_NODES = 2;
	const MAX_NODES = 5;
	const SPREAD_MIN = 40;
	const SPREAD_MAX = 110;
	const OUTSET = 20;
	const AREA = 100 + 2 * OUTSET;
	const SPREAD_RANGE = SPREAD_MAX - SPREAD_MIN;
</script>

<script lang="ts">
	import { THEME_PALETTES } from '$utils/themes';

	export let color: string | string[] = THEME_PALETTES.light.bg[900];
	export let style: string | undefined = undefined;

	// function formatColors(input: typeof color) {
	// 	const n = Math.round(Math.random() * (MAX_NODES - MIN_NODES)) + MIN_NODES;
	// 	if (typeof input === 'string') {
	// 		const arr = Array(n).fill(color);
	// 		return arr;
	// 	}
	// 	const arr = Array(n)
	// 		.fill(null)
	// 		.map((_) => {
	// 			const a = '';
	// 			const b = '';
	// 			return [a, b];
	// 		});
	// }

	function formatBackground(input: typeof color) {
		if (typeof input === 'string') {
			const n = Math.round(Math.random() * (MAX_NODES - MIN_NODES)) + MIN_NODES;
			input = Array(n).fill(input);
		}
		const bg = `linear-gradient(90deg, ${input[0]} -10%, ${input[input.length - 1]} 110%)`;
		return input
			.map((c) => {
				const x = (Math.random() * AREA - OUTSET).toFixed(1);
				const y = (Math.random() * AREA - OUTSET).toFixed(1);
				const spread = (SPREAD_MIN + Math.random() * SPREAD_RANGE).toFixed(1);
				return `radial-gradient(circle at ${x}% ${y}%, ${c} 0px, transparent ${spread}%)`;
			})
			.join(',');
	}

	const background = formatBackground(color);
	// $: if (color) {
	// 	background = formatBackground(color);
	// }
</script>

<div style:--background={background} {style} />

<style lang="scss">
	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--background);
		border-radius: inherit;
	}
</style>

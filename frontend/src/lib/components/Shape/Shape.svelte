<!--
	@component
	# Shape
	Unified api to draw primitive shapes in svg as `path` elements and with extended features such as rounded corners.

 -->
<script lang="ts">
	// type $$Props = SVGAttributes<SVGPathElement> & {
	// 	shape: typeof shape;
	// 	rounding: typeof rounding;
	// 	size: typeof size;
	// };

	export let shape: 'triangle' | 'circle' | 'rectangle' | 'square' | 'arch';
	export let rounding: number = 0.2;
	export let size: number = 100;
	export let x: number;
	export let y: number;
</script>

{#if shape === 'arch'}
	<rect {x} {y} height={size} width={size} r={rounding} />
{:else if shape === 'circle'}
	<rect {x} {y} height={size} width={size} r={rounding} />
{:else if shape === 'square'}
	<rect {x} {y} r={rounding} />
{:else if shape === 'rectangle'}{/if}

<style lang="scss">
</style>

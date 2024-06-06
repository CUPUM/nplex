<script lang="ts">
	import { transform } from '$lib/motion/transform';
	import { expoOut, quadIn } from 'svelte/easing';
	import type { SVGAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';

	let {
		speed = 1,
		tail = true,
		intro = true,
		outro = true,
		class: className,
		width = 24,
		height = 24,
		viewBox = '0 0 24 24',
		preserveAspectRatio = 'xMidYMid',
		...restProps
	}: {
		speed?: number;
		tail?: boolean;
		intro?: boolean;
		outro?: boolean;
	} & SVGAttributes<SVGElement> = $props();

	const origin = '12,22';
	const circle = 'A 10,10 90,1,1 12.01,22';
	const square = 'L 2,22 2,2 22,2 22,22';
	const arc = 'L 2,22 2,12 A 10,10 90,0,1 22,12 L 22,22 2,22';
	const triangle = 'L 2,22 12,2 22,22';
	const d = `M ${origin} ${circle} ${square} ${arc} ${triangle} Z`;

	// let svgRef: SVGElement | undefined;
	// $inspect(() => {
	// 	if (svgRef) {
	// 		const path = svgRef.querySelector('path:not(.tail)');
	// 		if (path instanceof SVGPathElement) {
	// 			console.log(path.getTotalLength());
	// 		}
	// 	}
	// });
</script>

<svg
	class="spinner {className}"
	{width}
	{height}
	{viewBox}
	{preserveAspectRatio}
	{...restProps}
	style:--spinner-speed={speed}
	in:transform|global={{
		duration: intro ? 750 : 0,
		scale: 0.5,
		rotate: [0, 0, -180],
		opacity: 1,
		easing: expoOut,
	}}
	out:scale|global={{
		duration: outro ? 150 : 0,
		start: 0.9,
		easing: quadIn,
	}}
>
	<path class="path" {d} />
	{#if tail}
		<path class="path tail" {d} />
	{/if}
</svg>

<style>
	.spinner {
		--count: 4;
		--duration: calc(1s / var(--spinner-speed));
		--total-duration: calc(var(--count) * var(--duration));
		overflow: visible;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.path {
		--total-length: 279px;
		--trace-length: 30px;
		animation-duration: var(--total-duration);
		stroke-dasharray: var(--trace-length) var(--total-length);
		animation-name: trace;
		animation-fill-mode: both;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	.tail {
		opacity: var(--opacity-softer);
		animation-delay: calc(var(--total-duration) * 0.04); /* manually tweaked factor */
	}

	@keyframes trace {
		0% {
			stroke-dashoffset: var(--total-length);
		}
		100% {
			stroke-dashoffset: calc(-1 * var(--trace-length));
		}
	}
</style>

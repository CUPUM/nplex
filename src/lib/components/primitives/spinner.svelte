<script lang="ts">
	import { transform } from '$lib/motion/transform';
	import { expoOut, quadIn } from 'svelte/easing';
	import type { SVGAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';

	export let thickness: SVGAttributes<SVGPathElement>['stroke-width'] = 12;
	export let linecap: SVGAttributes<SVGPathElement>['stroke-linecap'] = 'round';
	export let linejoin: SVGAttributes<SVGPathElement>['stroke-linejoin'] = 'round';
	export let speed: number = 1;
	export let trail: boolean = true;
	export let intro: boolean = true;
	export let outro: boolean = true;
	export let offset: string = '0s';

	const origin = '50,95';
	const circle = 'A 45,45 0,1,1 50.1,95';
	const square = 'L 5,95 5,5 95,5 95,95';
	const arc = 'L 5,95 5,50 A 45,45 0,0,1 95,50 L 95,95 5,95';
	const triangle = 'L 0,95 50,0 100,95';
	const d = `M ${origin} ${circle} ${square} ${arc} ${triangle} Z`;
</script>

<svg
	width="1em"
	height="1em"
	style:--linecap={linecap}
	style:--thickness="{thickness}px"
	style:--linejoin={linejoin}
	style:--speed={speed}
	style:--offset={offset}
	viewBox="0 0 100 100"
	preserveAspectRatio="xMidYMid"
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
	<path {d} />
	{#if trail}
		<path class="secondary" {d} />
	{/if}
</svg>

<style>
	svg {
		--count: 4;
		--duration: calc(1s / var(--speed));
		--total-duration: calc(var(--count) * var(--duration));
		background: transparent;
		overflow: visible;
	}

	path {
		--length: 1278px;
		--trace: 100px;
		--tail: 15px;
		fill: none;
		stroke: var(--spinner-color, currentColor);
		animation-duration: var(--total-duration);
		stroke-dasharray: var(--trace) var(--length);
		stroke-width: var(--thickness);
		stroke-linecap: var(--linecap);
		stroke-linejoin: var(--linejoin);
		animation-name: trace;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		animation-delay: var(--delay);
		/* animation-delay: calc(var(--offset) + var(--delay, 0s)); */
	}

	.secondary {
		animation-delay: calc(var(--total-duration) / 40);
		opacity: 0.35;
		stroke-dasharray: var(--tail) calc(var(--length) + var(--trace) - var(--tail));
	}

	@keyframes trace {
		0% {
			stroke-dashoffset: var(--length);
		}
		100% {
			stroke-dashoffset: calc(-1 * var(--trace));
		}
	}
</style>

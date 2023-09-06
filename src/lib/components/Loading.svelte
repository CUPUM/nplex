<!-- 
	@component
	Use this component to add loading spinner overlay to any element/container.
 -->
<script lang="ts">
	import { transform } from '$lib/transitions/transform';
	import { cubicIn, expoOut } from 'svelte/easing';
	import type { SVGAttributes } from 'svelte/elements';

	export let color: string | undefined = undefined;
	export let thickness: SVGAttributes<SVGPathElement>['stroke-width'] = 12;
	export let linecap: SVGAttributes<SVGPathElement>['stroke-linecap'] = 'square';
</script>

<div
	class="loading"
	style:--loading-color={color}
	style:--thickness={thickness}
	style:--linecap={linecap}
>
	<svg
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
		in:transform|global={{
			duration: 750,
			scale: 0.5,
			rotate: [0, 0, -180],
			opacity: 1,
			easing: expoOut,
		}}
		out:transform|global={{
			duration: 200,
			scale: 1.1,
			rotate: [0, 0, 90],
			opacity: 0,
			easing: cubicIn,
		}}
		width="1em"
		height="1em"
	>
		<circle class="v" cx="50" cy="50" r="45" style:--i="0" style:--l="283" />
		<path class="v" d="M 50,5 L 95,95 5,95 50,5 Z" style:--i="1" style:--l="292" />
		<rect class="v" x="10" y="10" width="80" height="80" style:--i="2" style:--l="320" />
		<circle class="v" cx="50" cy="50" r="45" style:--i="3" style:--l="283" />
		<!-- d="M 90,90 C 90,90 10,90 10,90 C 10,90 10,50 10,50 C 12,-5 88,-5 90,50 Z" -->
		<path
			rotate="180"
			class="v"
			d="M 10,10 C 10,10 90,10 90,10 C 90,10 90,50 90,50 C 88,105 12,105 10,50 Z"
			style:--i="4"
			style:--l="290"
		/>
	</svg>
</div>

<style lang="scss">
	.loading {
		user-select: none;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: transparent;
		background: transparent;
		font-size: 1.25em;
	}

	svg {
		--draw-s: 1.5s;
		--shapes-n: 5;
		background: transparent;
		overflow: visible;
		animation-duration: calc(2 * var(--draw-s));
		animation-name: clock;
		animation-timing-function: cubic-bezier(0.8, 0, 0.2, 1);
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
	}

	@keyframes clock {
		0% {
			transform: rotate(90deg);
		}
		25% {
			transform: rotate(180deg);
		}
		50% {
			transform: rotate(270deg);
		}
		75% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(450deg);
		}
	}

	.v {
		opacity: 0;
		fill: none;
		stroke: var(--loading-color, var(--color-primary-800));
		@include dark {
			stroke: var(--loading-color, var(--color-primary-200));
		}
		stroke-width: var(--thickness);
		stroke-linejoin: round;
		stroke-linecap: var(--linecap);
		animation-duration: calc(var(--draw-s) * var(--shapes-n));
		stroke-dashoffset: 0;
		animation-delay: calc(var(--i) * var(--draw-s));
		animation-name: draw;
		animation-timing-function: linear; // cubic-bezier(0.6, 0, 0.4, 1);
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
	}

	@keyframes draw {
		0% {
			opacity: 1;
			stroke-dasharray: 0 0 0 var(--l);
		}
		10% {
			stroke-dasharray: 0 0 var(--l) 0;
		}
		20% {
			opacity: 1;
			stroke-dasharray: 0 var(--l) var(--l) 0;
		}
		21% {
			opacity: 0;
		}
	}
</style>

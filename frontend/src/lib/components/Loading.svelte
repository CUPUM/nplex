<!-- 
	@component
	Use this component to add loading spinner overlay to any element/container.
 -->
<script lang="ts">
	import { elasticOut, expoIn } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let style: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const duration = 4;
	// These shapes must contain the same amounts and types of points for the animation to work.
	const shapes = [
		// Circle
		'M 10,50 C 10,28 28,10 50,10 C 72,10 90,29 90,50 C 90,72 72,90 50,90 C 28,90 10,72 10,50 Z',
		// Square
		'M 15,15 C 15,15 85,15 85,15 C 85,15 85,85 85,85 C 85,85 15,85 15,85 C 15,85 15,15 15,15 Z',
		// Triangle
		'M 50,10 C 50,10 50,10 50,10 C 50,10 90,85 90,85 C 90,85 10,85 10,85 C 10,85 50,10 50,10 Z',
		// Arc
		// 'M 15,50 C 17,-3 83,-3 85,50 C 85,50 85,85 85,85 C 85,85 15,85 15,85 C 15,85 15,50 15,50 Z',
		'M 15,15 C 15,15 85,15 85,15 C 85,15 85,50 85,50 C 83,103 17,103 15,50 C 15,50 15,15 15,15 Z',
		// Square
		'M 15,15 C 15,15 85,15 85,15 C 85,15 85,85 85,85 C 85,85 15,85 15,85 C 15,85 15,15 15,15 Z',
		// Triangle
		'M 50,10 C 50,10 50,10 50,10 C 50,10 90,85 90,85 C 90,85 10,85 10,85 C 10,85 50,10 50,10 Z',
	];
	const d = [...shapes, shapes[0]].join(';') + ';';
	const nsteps = shapes.length + 1;
	// const offset = Math.round(Math.random() * nsteps);
	const keySplines = Array(nsteps - 1)
		.fill('.7 0 .3 1')
		.join(';');
	const keyTimes = Array(nsteps)
		.fill(null)
		.map((_, i) => i / (nsteps - 1))
		.join(';');
	const pulseValues = Array(nsteps)
		.fill(0)
		.map((_, i) => (i - 1) * 90 + ' 50 50')
		.join(';');
	const offsetKeytimes = Array(4)
		.fill(null)
		.map((_, i) => (i + 1) / 4)
		.join(';');
	const offsetValues = Array(4)
		.fill(null)
		.map((_, i) => i * 90 + ' 50 50')
		.join(';');
</script>

<div class="loading {className}" {style}>
	<svg
		class="svg"
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
		style:--duration="{duration}s"
		in:scale={{ duration: 500, start: 0, opacity: 1, easing: elasticOut }}
		out:scale={{ duration: 250, start: 0, opacity: 0, easing: expoIn }}
		width="1em"
		height="1em"
	>
		<path class="path">
			<animate
				attributeType="XML"
				{keySplines}
				{keyTimes}
				from="M 10,50 C 10,28 28,10 50,10 C 72,10 90,29 90,50 C 90,72 72,90 50,90 C 28,90 10,72 10,50 Z"
				to="M 10,50 C 10,28 28,10 50,10 C 72,10 90,29 90,50 C 90,72 72,90 50,90 C 28,90 10,72 10,50 Z"
				calcMode="spline"
				attributeName="d"
				dur="{duration}s"
				begin="0s"
				repeatCount="indefinite"
				values={d}
			/>
			<animate
				attributeType="XML"
				calcMode="linear"
				attributeName="stroke-dashoffset"
				dur="1s"
				repeatCount="indefinite"
				values="0 100"
			/>
			<!-- Implement svg animation for rotation steps -->
			<animateTransform
				attributeType="XML"
				{keySplines}
				{keyTimes}
				attributeName="transform"
				type="rotate"
				calcMode="spline"
				dur="{duration}s"
				begin="0s"
				repeatCount="indefinite"
				values={pulseValues}
			/>
			<!-- <animateTransform
				attributeType="XML"
				attributeName="transform"
				type="rotate"
				calcMode="discrete"
				keyTimes={offsetKeytimes}
				dur="{4 * duration}s"
				begin="0s"
				repeatCount="indefinite"
				additive="sum"
				values={offsetValues}
			/> -->
		</path>
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
		z-index: 100;
		font-size: 1.25em;
		color: currentColor;
	}

	.svg {
		background: transparent;
		background: transparent;
		overflow: visible;
	}

	.path {
		fill: currentColor;
		stroke: currentColor;
		stroke-width: 25px;
		// vector-effect: non-scaling-stroke;
		fill: transparent;
		stroke-dasharray: 15px 20px;
		stroke-width: 12px;
		stroke-linejoin: round;
		stroke-linecap: round;
		transform-origin: center;
		animation: dashoffset 4s linear infinite, slowspin 3.5s linear infinite;
	}

	@keyframes dashoffset {
		0% {
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: -100;
		}
	}

	@keyframes slowspin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

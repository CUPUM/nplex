<script lang="ts">
	import { colors } from '$utils/colors';
	import { cssSize, type SizeInput } from '$utils/helpers/css';
	import { circInOut, elasticOut, expoIn } from 'svelte/easing';
	import { scale, slide } from 'svelte/transition';

	export let color: string = colors.primary[500];
	export let opacity: number = 1;
	export let backgroundColor: string = 'transparent';
	export let size: SizeInput = '1em';

	let outroing = false;

	function outro() {
		outroing = true;
	}

	/**
	 * These shapes must contain the same amounts and types of points for the animation to work.
	 */
	const d =
		// Circle
		`M 10,50 C 10,28 28,10 50,10 C 72,10 90,29 90,50 C 90,72 72,90 50,90 C 28,90 10,72 10,50 Z;` +
		// Square
		`M 15,15 C 15,15 85,15 85,15 C 85,15 85,85 85,85 C 85,85 15,85 15,85 C 15,85 15,15 15,15 Z;` +
		// Triangle
		`M 50,10 C 50,10 50,10 50,10 C 50,10 90,85 90,85 C 90,85 10,85 10,85 C 10,85 50,10 50,10 Z;` +
		// Arc
		`M 15,50 C 15,28.5 28.5,10 50,10 C 71,10 85,29 85,50 C 85,85 85,85 85,85 C 85,85 15,85 15,85 Z;` +
		// Circle, to loop
		`M 10,50 C 10,28 28,10 50,10 C 72,10 90,29 90,50 C 90,72 72,90 50,90 C 28,90 10,72 10,50 Z;`;

	const nshapes = 5;
	const offset = Math.round(Math.random() * nshapes);

	const keySplines = Array(nshapes - 1)
		.fill('.8 0 0.2 1')
		.join(';');

	const keyTimes = Array(nshapes)
		.fill(null)
		.map((_, i) => i / (nshapes - 1))
		.join(';');
</script>

<div id="container" style:opacity style:font-size={cssSize(size)} style:color>
	<div
		id="bg"
		style:background-color={backgroundColor}
		on:outrostart={outro}
		transition:slide={{ duration: 450, easing: circInOut }}
		class:outroing
	/>
	<svg
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
		in:scale={{ duration: 500, easing: elasticOut }}
		out:scale={{ duration: 350, easing: expoIn }}
	>
		<path>
			<animate
				{keySplines}
				{keyTimes}
				from="M 10,50 C 10,28 28,10 50,10 C 72,10 90,29 90,50 C 90,72 72,90 50,90 C 28,90 10,72 10,50 Z"
				to="M 10,50 C 10,28 28,10 50,10 C 72,10 90,29 90,50 C 90,72 72,90 50,90 C 28,90 10,72 10,50 Z"
				calcMode="spline"
				attributeName="d"
				dur="4s"
				begin="0s"
				repeatCount="indefinite"
				values={d}
			/>
		</path>
	</svg>
</div>

<style lang="postcss">
	#container {
		user-select: none;
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: transparent;
		background-color: transparent;
		z-index: 100;
	}

	#bg {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;

		&.outroing {
			top: 0;
			bottom: unset;
		}
	}

	svg {
		width: 1em;
		height: 1em;
		background: transparent;
		background-color: transparent;
		overflow: visible;
		animation-name: spin;
		animation-duration: 4s;
		animation-fill-mode: none;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.2, 0, 0.2, 1);
	}

	path {
		fill: currentColor;
		stroke: currentColor;
		stroke-width: 20px;
		stroke-linejoin: round;
		stroke-linecap: round;
		transform-origin: center;
		animation-name: slowspin;
		animation-duration: 9s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes slowspin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(-90deg);
		}
		25% {
			transform: rotate(180deg);
		}
		50% {
			transform: rotate(450deg);
		}
		75% {
			transform: rotate(720deg);
		}
		100% {
			transform: rotate(990deg);
		}
	}
</style>

<script lang="ts">
	import { colors } from '$utils/colors';
	import { fade } from 'svelte/transition';

	export let type: 'logo' | 'default' = 'default';
</script>

<div
	in:fade={{
		duration: 150,
	}}
	out:fade={{
		duration: 100,
	}}
	{...$$restProps}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
		<!-- <rect y="200" x="200" width="600" height="600" vector-effect="non-scaling-stroke" /> -->
		<path
			d="M 50,50
				m -50,0
				a 50,50 0 1,0 100,0
				l 0,-50 -100,0 0,100 100,0 0,-50
				a 50,50 0 1,0 -100,0"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
</div>

<style lang="postcss">
	div {
		z-index: 100;
		user-select: non;
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: var(--color-primary-500);
	}

	svg {
		user-select: none;
		pointer-events: none;
		width: 1em;
		height: 1em;
		max-width: 100%;
		max-height: 100%;
		overflow: visible;
		background: transparent;
		background-color: transparent;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes morph {
		0% {
			rx: 0%;
		}
		100% {
			rx: 50%;
		}
	}

	@keyframes trace {
		0% {
			stroke-dashoffset: 0%;
		}
		100% {
			stroke-dashoffset: 100%;
		}
	}

	path {
		fill: none;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-width: 2px;
		stroke-dasharray: 25% 75%;
		transform-origin: 50% 50%;
		animation: trace 4s linear infinite, spin 2s cubic-bezier(0.6, 0, 0.4, 1) infinite;
	}

	/* rect {
		stroke: currentColor;
		stroke-width: 2px;
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		transform-origin: 50% 50%;
		stroke-dasharray: 10% 5%;
		animation: spin 2s cubic-bezier(0.7, 0, 0.3, 1) infinite, morph 1s linear infinite alternate,
			trace 25s linear infinite;
	} */
</style>

<!--
	@component
	# Ripple
	Adds a visual ripple effect on interactive elements.
-->
<script lang="ts" context="module">
	export const RIPPLE_ATTRIBUTE = 'data-ripple-host';
	const N_ANIMATIONS = 3;
</script>

<script lang="ts">
	import { getBoxDistances } from '$utils/geometry/box';

	export let host: HTMLElement | undefined = undefined;
	export let easing: string = 'cubic-bezier(0, 0, .5, 1)';
	/**
	 * R multiplier where duration = d * speed.
	 */
	export let speed: number = 1;
	export let duration: number | undefined = undefined;
	export let delay = 0;
	export let opacityStart = 0.1;
	export let opacityEnd = 0;
	export let opacityEasing = 'ease-out';
	export let opacityDuration = 1000;
	export let opacityDelay = 0;
	export let spreadStart = 0;
	export let spreadEnd = 1;
	export let spreadEasing = easing;
	export let spreadSpeed = speed;
	export let spreadDuration = duration;
	export let spreadDelay = delay;
	export let color: string = 'var(--ripple-color, var(--ui-ripple-color))';
	export let colorStart: string = color;
	export let colorEnd: string = colorStart;
	export let colorEasing = easing;
	export let colorSpeed = speed;
	export let colorDuration = duration;
	export let colorDelay = delay;
	export let blur: number = 8;

	let destructor: () => void;
	let ripples: {
		x: number;
		y: number;
		d: number;
		animations: number;
		out?: boolean;
	}[] = [];
	let containerRef: HTMLDivElement;
	$: listenerRef = host ?? containerRef?.parentElement;

	function add(e: MouseEvent) {
		if (
			containerRef &&
			e.target instanceof Element &&
			e.target.closest(`[${RIPPLE_ATTRIBUTE}]`) === listenerRef
		) {
			const rect = containerRef.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const d = 2 * Math.max(...getBoxDistances([x, y], rect));
			const ripple = {
				x,
				y,
				d,
				animations: N_ANIMATIONS,
			};
			ripples.push(ripple);
			ripples = ripples;
			document.addEventListener('pointerup', remove);
			document.addEventListener('pointercancel', remove);
		}
	}

	function remove() {
		ripples[ripples.length - 1].out = true;
		ripples = ripples;
		document.removeEventListener('pointerup', remove);
		document.removeEventListener('pointercancel', remove);
	}

	function end(e: AnimationEvent, ripple: (typeof ripples)[number]) {
		ripple.animations--;
		if (!ripple.animations) {
			ripples.splice(ripples.indexOf(ripple), 1);
			ripples = ripples;
		}
	}

	function listen(element: HTMLElement | null) {
		if (destructor) destructor();
		if (element) {
			element.addEventListener('pointerdown', add);
			element.setAttribute(RIPPLE_ATTRIBUTE, '');
			destructor = () => {
				element.removeEventListener('pointerdown', add);
				element.removeAttribute(RIPPLE_ATTRIBUTE);
			};
		}
	}

	$: listen(listenerRef);
</script>

<div
	bind:this={containerRef}
	class="container"
	style:--opacity-start={opacityStart}
	style:--opacity-end={opacityEnd}
	style:--opacity-easing={opacityEasing}
	style:--opacity-delay="{opacityDelay}ms"
	style:--spread-start={spreadStart}
	style:--spread-end={spreadEnd}
	style:--spread-easing={spreadEasing}
	style:--spread-delay="{spreadDelay}ms"
	style:--color-start={colorStart}
	style:--color-end={colorEnd}
	style:--color-easing={colorEasing}
	style:--color-delay="{colorDelay}ms"
	style:--blur="{blur}px"
>
	{#each ripples as r (r)}
		<div
			class="ripple"
			class:out={r.out}
			style:--x="{r.x}px"
			style:--y="{r.y}px"
			style:--d="{r.d}px"
			style:--opacity-duration="{opacityDuration}ms"
			style:--spread-duration="{spreadDuration ?? 100 + (0.5 * r.d) / spreadSpeed}ms"
			style:--color-duration="{colorDuration ?? 100 + (0.5 * r.d) / colorSpeed}ms"
			on:animationend|self={(e) => end(e, r)}
		/>
	{/each}
</div>

<style lang="scss">
	.container {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: inherit;
		overflow: hidden;
		z-index: 10;
	}

	.ripple {
		position: absolute;
		left: var(--x);
		top: var(--y);
		opacity: var(--opacity-start);
		width: calc(var(--d) * var(--spread-start));
		color: var(--color-start);
		background: currentColor;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		// filter: blur(var(--blur));
		box-shadow: 0 0 var(--blur) currentColor;
		animation: var(--spread-duration) var(--spread-easing) var(--spread-delay) 1 forwards spread,
			var(--color-duration) var(--color-easing) var(--color-delay) 1 forwards color;
	}

	.out {
		animation: var(--opacity-duration) var(--opacity-easing) var(--opacity-delay) 1 forwards fade,
			var(--spread-duration) var(--spread-easing) var(--spread-delay) 1 forwards spread,
			var(--color-duration) var(--color-easing) var(--color-delay) 1 forwards color;
	}

	@keyframes fade {
		to {
			opacity: var(--opacity-end);
		}
	}

	@keyframes spread {
		to {
			width: calc(var(--d) * var(--spread-end));
		}
	}

	@keyframes color {
		to {
			color: var(--color-end);
		}
	}
</style>

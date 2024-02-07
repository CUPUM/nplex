<!--
	@component
	# Ripple
	Adds a visual ripple effect on interactive elements.

	Customizable CSS properties:
	- `--ripple-color`: Color form start to end;
	- `--ripple-color-start`: Color origin, at the start of the ripple animation, overwrites `--ripple-color` if used.
	- `--ripple-color-end`: Color target, at the end of the ripple animation, overwrites `--ripple-color` if used.
-->
<script lang="ts" context="module">
	const HOST_ATTRIBUTE = 'data-ripple-host';
	const N_ANIMATIONS = 3;
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

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
	export let color: string | undefined = undefined;
	export let colorStart: typeof color = undefined;
	export let colorEnd: typeof color = undefined;
	export let colorEasing = easing;
	export let colorSpeed = speed;
	export let colorDuration = duration;
	export let colorDelay = delay;
	export let blur: number = 0;

	let containerRef: HTMLDivElement;
	let destructor: () => void;
	let ripples: {
		x: number;
		y: number;
		d: number;
		animations: number;
		out: boolean;
	}[] = [];

	function add(e: PointerEvent) {
		if (
			containerRef.parentElement &&
			// Catching only the directly descending events, prevents conflict between nested ripple triggers.
			e.target instanceof Element &&
			e.target.closest(`[${HOST_ATTRIBUTE}]`) === containerRef.parentElement
		) {
			// We use bounding client rect, even if a bit more computationally expensive, to account for
			// child element event targets that steal the offsetX and offsetY value referentials.
			const rect = containerRef.parentElement.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const rx = Math.max(x, rect.right - e.clientX);
			const ry = Math.max(y, rect.bottom - e.clientY);
			const d = 2 * Math.hypot(rx, ry);
			const ripple = {
				x,
				y,
				d,
				animations: N_ANIMATIONS,
				out: false,
			};
			ripples.push(ripple);
			ripples = ripples;
			function out() {
				ripple.out = true;
				ripples = ripples;
				document.removeEventListener('pointerup', out);
				document.removeEventListener('pointercancel', out);
			}
			// Listen on document to account for mouse drag that exit the target.
			document.addEventListener('pointerup', out);
			document.addEventListener('pointercancel', out);
		}
	}

	function end(e: AnimationEvent, ripple: (typeof ripples)[number]) {
		// Sadly we can't use a k-v check instead of a simple count since we cannot know the hashed scope name of the css animations.
		ripple.animations--;
		if (!ripple.animations) {
			ripples.splice(ripples.indexOf(ripple), 1);
			ripples = ripples;
		}
	}

	function listen(element: HTMLElement | null) {
		if (destructor) {
			destructor();
		}
		if (element) {
			element.addEventListener('pointerdown', add);
			element.setAttribute(HOST_ATTRIBUTE, '');
			destructor = () => {
				element.removeEventListener('pointerdown', add);
				element.removeAttribute(HOST_ATTRIBUTE);
			};
		}
	}

	onMount(() => {
		listen(containerRef.parentElement);
	});

	onDestroy(() => {
		if (destructor) {
			destructor();
		}
	});
</script>

<div
	bind:this={containerRef}
	class="container"
	style:--ripple-color={color}
	style:--ripple-color-start={colorStart}
	style:--ripple-color-end={colorEnd}
	style:--opacity-start={opacityStart}
	style:--opacity-end={opacityEnd}
	style:--opacity-easing={opacityEasing}
	style:--opacity-delay="{opacityDelay}ms"
	style:--spread-start={spreadStart}
	style:--spread-end={spreadEnd}
	style:--spread-easing={spreadEasing}
	style:--spread-delay="{spreadDelay}ms"
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

<style lang="postcss">
	.container {
		--_color-start: var(--ripple-color-start, var(--ripple-color));
		--_color-end: var(--ripple-color-end, var(--ripple-color));
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
		color: var(--_color-start);
		background: currentColor;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		filter: blur(var(--blur));
		box-shadow: 0 0 var(--blur) currentColor;
		animation:
			var(--spread-duration) var(--spread-easing) var(--spread-delay) 1 forwards spread,
			var(--color-duration) var(--color-easing) var(--color-delay) 1 forwards color;
	}

	.out {
		animation:
			var(--opacity-duration) var(--opacity-easing) var(--opacity-delay) 1 forwards fade,
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
			color: var(--_color-end);
		}
	}
</style>

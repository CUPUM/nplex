<!--
	@component
	# Ripple
	Adds a visual ripple effect on interactive elements.
-->
<script lang="ts" context="module">
	export const RIPPLE_ATTRIBUTE = 'ripple-host';
</script>

<script lang="ts">
	export let host: HTMLElement | undefined = undefined;
	export let easing: string = 'cubic-bezier(0, 0, .2, 1)';
	export let duration = 350;
	export let delay = 0;
	export let opacityStart = 0.25;
	export let opacityEnd = 0;
	export let opacityEasing = 'ease-out';
	export let opacityDuration = 1000;
	export let opacityDelay = 350;
	export let spreadStart = 0;
	export let spreadEnd = 1;
	export let spreadEasing = easing;
	export let spreadDuration = duration;
	export let spreadDelay = delay;
	export let color: string = 'rgb(120, 130, 140)';
	export let colorStart: string = color;
	export let colorEnd: string = colorStart;
	export let colorEasing = easing;
	export let colorDuration = duration;
	export let colorDelay = delay;
	export let blur: number = 0;

	const N_ANIMATIONS = 3;

	let destructor: () => void;
	let ripples: { x: number; y: number; d: number; animations: number }[] = [];
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
			const d =
				2 *
				Math.max(
					Math.ceil(Math.hypot(x, y)),
					Math.ceil(Math.hypot(rect.width - x, rect.height - y))
				);
			const r = {
				x,
				y,
				d,
				animations: N_ANIMATIONS,
			};
			ripples.push(r);
			ripples = ripples;
		}
	}

	function end(e: AnimationEvent, ripple: typeof ripples[number]) {
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
	style:--opacity-duration="{opacityDuration}ms"
	style:--opacity-delay="{opacityDelay}ms"
	style:--spread-start={spreadStart}
	style:--spread-end={spreadEnd}
	style:--spread-easing={spreadEasing}
	style:--spread-duration="{spreadDuration}ms"
	style:--spread-delay="{spreadDelay}ms"
	style:--color-start={colorStart}
	style:--color-end={colorEnd}
	style:--color-easing={colorEasing}
	style:--color-duration="{colorDuration}ms"
	style:--color-delay="{colorDelay}ms"
	style:--blur="{blur}px"
>
	{#each ripples as r (r)}
		<div
			class="ripple"
			style:--x="{r.x}px"
			style:--y="{r.y}px"
			style:--d="{r.d}px"
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
	}

	.ripple {
		position: absolute;
		left: var(--x);
		top: var(--y);
		opacity: var(--opacity-start);
		width: calc(var(--d) * var(--spread-start));
		background: var(--color-start);
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		filter: blur(var(--blur));
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
			background: var(--color-end);
		}
	}
</style>

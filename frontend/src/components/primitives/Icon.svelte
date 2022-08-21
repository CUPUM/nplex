<script context="module" lang="ts">
	const queue = new Set();
	const duration = 250;
	const delay = 150;
</script>

<script lang="ts">
	import { transform } from '$transitions/transform';

	import { cssSize, type SizeInput } from '$utils/css';
	import { icons } from '$utils/icons/icons';
	import { onDestroy, onMount } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let size: SizeInput = '1em';
	export let color: string = 'currentColor';
	export let secondaryColor: string = color;
	export let strokeWidth: SizeInput = 1.5;
	export let scaleStroke: boolean = true;
	export let strokeOpacity: number = 1;
	export let fillOpacity: number = 1;
	export let intro: boolean = false;

	let icon = icons[name];
	let mounted = !intro;
	let instance;
	let timeout;

	$: icon = icons[name];

	onMount(() => {
		if (!mounted) {
			queue.add(instance);
			timeout = setTimeout(() => {
				mounted = true;
				queue.delete(instance);
			}, [...queue].length * (duration / 3) + delay);
		}
	});

	onDestroy(() => {
		clearTimeout(timeout);
		queue.delete(instance);
	});
</script>

<svg
	bind:this={instance}
	xmlns="http://www.w3.org/2000/svg"
	aria-label="icon-image-{name}"
	viewBox={icon.viewBox}
	style:color
	style:--size={cssSize(size)}
	style:--secondary-color={secondaryColor}
	style:--thickness={cssSize(strokeWidth)}
	preserveAspectRatio="xMidYMid"
	class="icon"
>
	{#if mounted}
		{#key name}
			<g
				in:transform|local={{
					scale: 0.5,
					rotateZ: 20,
					duration: 200,
					delay: 50,
					easing: cubicOut,
				}}
				out:transform|local={{ scale: 0.75, rotateZ: -20, duration: 150, easing: cubicIn }}
			>
				{#if icon.strokes.length}
					{#each icon.strokes as stroke, i}
						<path
							in:draw|local={{ duration, delay: i * (delay / 2) }}
							d={stroke.d}
							class="stroke {stroke.type}"
							vector-effect={scaleStroke ? '' : 'non-scaling-stroke'}
						/>
					{/each}
				{/if}
				{#if icon.fills.length}
					{@const i_offset = icon.strokes.length}
					{#each icon.fills as fill, i}
						<path
							in:fade|local={{ duration, delay: (i + i_offset) * (delay / 2) }}
							d={fill.d}
							class="fill {fill.type}"
						/>
					{/each}
				{/if}
			</g>
		{/key}
	{/if}
</svg>

<style lang="scss">
	svg {
		display: inline-flex;
		overflow: visible;
		position: relative;
		width: var(--size);
		height: var(--size);
		padding: 0;
		margin: 0;
		perspective: 100px;
		top: 0.1em;
	}

	g {
		transform-style: preserve-3d;
		transform-origin: center;
	}

	path {
		&.stroke {
			fill: none;
			stroke: currentColor;
			stroke-width: var(--thickness);
			stroke-linejoin: round;
			stroke-linecap: round;
			transition: stroke 0.3s ease;

			&.secondary {
				stroke: var(--secondary-color);
			}
		}

		&.fill {
			fill: currentColor;
			transition: fill 0.3s ease;

			&.secondary {
				fill: var(--secondary-color);
			}
		}
	}
</style>

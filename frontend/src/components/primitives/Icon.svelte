<script context="module" lang="ts">
	const queue = new Set();
	const duration = 350;
	const delay = 250;
</script>

<script lang="ts">
	import { cssSize, type SizeInput } from '$utils/css';
	import { icons } from '$utils/icons/icons';
	import { onDestroy, onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { draw, fade, scale } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let size: SizeInput = '1em';
	export let color: string = 'currentColor';
	export let secondaryColor: string = color;
	export let strokeWidth: SizeInput = 1.5;
	export let strokeOpacity: number = 1;
	export let fillOpacity: number = 1;

	let icon = icons[name];
	let mounted = false;
	let instance;
	let timeout;

	$: icon = icons[name];

	onMount(() => {
		queue.add(instance);
		timeout = setTimeout(() => {
			mounted = true;
			queue.delete(instance);
		}, [...queue].indexOf(instance) * (duration / 3) + delay);
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
	style:font-size={cssSize(size)}
	style:color
	style:--secondary-color={secondaryColor}
	style:--thickness={cssSize(strokeWidth)}
	preserveAspectRatio="xMidYMid"
>
	{#if mounted}
		{#key name}
			<g transition:scale|local={{ start: 0.5, easing: expoOut, duration: 550 }}>
				{#if icon.strokes.length}
					{#each icon.strokes as stroke, i}
						<path
							in:draw={{ duration, delay: i * 150 }}
							d={stroke.d}
							class="stroke {stroke.type}"
							vector-effect="non-scaling-stroke"
						/>
					{/each}
				{/if}
				{#if icon.fills.length}
					{@const i_offset = icon.strokes.length}
					{#each icon.fills as fill, i}
						<path in:fade={{ duration, delay: (i + i_offset) * 150 }} d={fill.d} class="fill {fill.type}" />
					{/each}
				{/if}
			</g>
		{/key}
	{/if}
</svg>

<style lang="scss">
	svg {
		display: inline-block;
		overflow: visible;
		position: relative;
		width: 1em;
		height: 1em;
		padding: 0;
		margin: 0;
	}

	g {
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

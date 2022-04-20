<script context="module" lang="ts">
	const cue = new Set();
	const duration = 500;
	const delay = 500;
</script>

<script lang="ts">
	import { icons } from '$utils/icons/icons';
	import { onDestroy, onMount } from 'svelte';
	import { cubicOut, linear, sineOut } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let highlightName: keyof typeof icons = null;
	export let size: string = '1em';
	export let color: string = 'currentColor';
	export let secondaryColor: string = color;
	export let strokeWidth: number | string = 1.5;
	export let highlight: boolean = false;

	let icon = icons[name];
	let mounted = false;
	let instance;
	let timeout;

	$: icon = highlight && highlightName ? icons[highlightName] : icons[name];

	onMount(() => {
		cue.add(instance);
		timeout = setTimeout(() => {
			mounted = true;
			cue.delete(instance);
		}, [...cue].indexOf(instance) * (duration / 3) + delay);
	});

	onDestroy(() => {
		clearTimeout(timeout);
		cue.delete(instance);
	});
</script>

<svg
	bind:this={instance}
	xmlns="http://www.w3.org/2000/svg"
	aria-label="image-icône: {name}"
	viewBox={icon.viewBox}
	style:--size={size}
	style:--color={color}
	style:--secondary-color={secondaryColor}
	style:--thickness={strokeWidth + ''}
	class:highlight
	preserveAspectRatio="xMidYMid"
	{...$$restProps}
>
	{#if mounted}
		{#key icon}
			{#if icon.strokes.length}
				{#each icon.strokes as stroke}
					<path
						in:draw={{ duration, easing: linear }}
						d={stroke.d}
						class="stroke {stroke.type}"
						vector-effect="non-scaling-stroke"
					/>
				{/each}
			{/if}
			{#if icon.fills.length}
				{#each icon.fills as fill}
					<path in:fade={{ duration }} d={fill.d} class="fill {fill.type}" />
				{/each}
			{/if}
		{/key}
	{/if}
</svg>

<style lang="postcss">
	svg {
		overflow: visible;
		position: relative;
		width: var(--size);
		height: var(--size);
	}

	path {
		&.stroke {
			fill: none;
			stroke: var(--color);
			stroke-width: var(--thickness);
			stroke-linejoin: round;
			stroke-linecap: round;
			transition: stroke 0.3s ease;

			&.secondary {
				stroke: var(--secondary-color);
			}
		}

		&.fill {
			fill: var(--color);
			transition: fill 0.3s ease;

			&.secondary {
				fill: var(--secondary-color);
			}
		}
	}
</style>

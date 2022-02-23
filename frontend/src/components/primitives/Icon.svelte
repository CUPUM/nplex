<script context="module" lang="ts">
	export type IconName = keyof typeof icons;

	const cue = new Set();
</script>

<script lang="ts">
	import { icons } from '$utils/icons/icons';
	import { onDestroy, onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';

	export let name: IconName;
	export let highlightName: keyof typeof icons = null;
	export let size: string = '1em';
	export let color: string = 'var(--color-dark-500)';
	export let strokeWidth: number | string = 1.5;
	export let highlight: boolean = false;

	const duration = 350;

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
		}, [...cue].indexOf(instance) * (duration / 2));
	});

	onDestroy(() => {
		clearTimeout(timeout);
		cue.delete(instance);
	})
</script>

<svg
	bind:this={instance}
	xmlns="http://www.w3.org/2000/svg"
	aria-label="image-icône: {name}"
	viewBox={icon.viewBox}
	style:--icon-size={size}
	style:--icon-color={color}
	style:--strokeWidth={strokeWidth + ''}
	class:highlight
>
	{#if mounted}
		{#key icon}
			{#if icon.strokes}
				<path
					transition:draw={{ duration, easing: cubicOut }}
					d={icon.strokes}
					fill="none"
					stroke-linejoin="round"
					stroke-linecap="round"
					class="strokes"
					vector-effect="non-scaling-stroke"
				/>
			{/if}
			{#if icon.fills}
				<path
					transition:fade={{ duration }}
					d={icon.fills}
					stroke="none"
					class="fills"
				/>
			{/if}
		{/key}
	{/if}
</svg>

<style>
	svg {
		overflow: visible;
		position: relative;
		width: var(--icon-size);
		height: var(--icon-size);
	}

	path.strokes {
		stroke: var(--icon-color);
		stroke-width: var(--strokeWidth);
		transition: stroke 0.3s ease;
	}

	path.fills {
		fill: var(--icon-color);
		transition: fill 0.3s ease;
	}
</style>

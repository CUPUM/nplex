<script lang="ts">
	import { icons } from '$utils/icons/icons';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let activeName: keyof typeof icons = null;
	export let active: boolean = false;
	export let strokeWidth: number = 2;
	export let color: string = 'var(--color-dark-500)';
	export let activeColor: string = 'var(--color-dark-300)';

	let icon = icons[name];
	let mounted = false;

	$: icon = active && activeName ? icons[activeName] : icons[name];

	onMount(() => {
		mounted = true;
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{...$$props}
	aria-label="icône: {name}"
	height={icon.height}
	width={icon.width}
	viewBox={icon.viewBox}
	style:--color={color}
	style:--strokeWidth={strokeWidth + ''}
	style:--activeColor={activeColor}
	class:active
>
	{#if mounted}
		{#key icon}
			{#if icon.strokes}
				<path
					transition:draw={{ speed: 0.05, easing: cubicOut }}
					d={icon.strokes}
					class="strokes"
				/>
			{/if}
			{#if icon.fills}
				<path transition:fade={{ duration: 350 }} d={icon.fills} class="fills" />
			{/if}
		{/key}
	{/if}
</svg>

<style>
	svg {
		overflow: visible;
	}

	path.strokes {
		fill: none;
		stroke: var(--color);
		stroke-width: var(--strokeWidth);
		stroke-linecap: round;
	}

	.active > path.strokes {
		stroke: var(--activeColor);
	}

	path.fills {
		stroke: none;
		fill: var(--color);
	}

	.active > path.fills {
		fill: var(--activeColor);
	}
</style>

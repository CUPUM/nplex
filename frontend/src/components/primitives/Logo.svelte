<script lang="ts">
	import { colors } from '$utils/colors';
	import logo from '$utils/logo';
	import { onMount } from 'svelte';
	import { expoInOut, expoOut, linear } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';

	export let color: string = colors.dark[100];
	export let hoverColor: string = color;
	export let intro: boolean = false;

	let show = !intro;
	// let fill = show;
	onMount(() => {
		if (!show) {
			setTimeout(() => {
				show = true;
			}, 350);
		}
	});

	// function complete(i: number) {
	// 	if (i === logo.paths.length - 1) {
	// 		fill = true;
	// 	}
	// }
</script>

<svg
	width={logo.width}
	height={logo.height}
	viewBox={logo.viewBox}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="xMidYMid"
	style:--color={color}
	style:--hover-color={hoverColor}
	{...$$restProps}
	on:click
	on:focus
>
	{#each logo.paths as path, i}
		<path
			{...path}
			vector-effect="non-scaling-stroke"
			in:fade={{ duration: 800, delay: i * 80, easing: expoInOut }}
		/>
	{/each}
</svg>

<style lang="postcss">
	svg {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: visible;
		--col: var(--color);

		&:hover {
			--col: var(--hover-color);
		}
	}

	path {
		stroke: none;
		fill: var(--col);
		transition: all 0.2s ease-out;
	}
</style>

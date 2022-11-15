<!--
	@component
	## Icon
	Primitive component to facilitate adding icons in a consistent manner across the ui.

-->
<script lang="ts" context="module">
	let queue = 0;
</script>

<script lang="ts">
	import { transform } from '$transitions/transform';
	import { cssSize } from '$utils/css';
	import { icons } from '$utils/icons';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let secondaryColor: string = 'currentColor';
	export let thickness: number | string = 1.5;
	export let scaleStroke: boolean = false;
	export let delay: number = 0;
	export let style: string | undefined = undefined;
	let class_: string = '';
	export { class_ as class };

	let iconRef: SVGElement;
	let initDelay = delay;

	$: icon = icons[name];
</script>

<svg
	bind:this={iconRef}
	xmlns="http://www.w3.org/2000/svg"
	aria-roledescription="icon-{name}"
	preserveAspectRatio="xMidYMid"
	viewBox={icon.viewBox}
	class="icon {class_}"
	{style}
	style:--secondary-color={secondaryColor}
	style:--thickness={cssSize(thickness)}
>
	{#key name}
		<g
			in:transform|local={{
				scale: 0.5,
				rotateX: 30,
				translateY: -20,
				duration: 350,
				easing: cubicOut,
			}}
			out:transform|local={{ scale: 0.75, rotateZ: -30, translateY: 20, duration: 150, easing: cubicIn }}
			on:introstart={() => (initDelay = 0)}
		>
			{#each icon.paths as path, i}
				{#if path.fill}
					<path
						in:fade={{ delay: initDelay + i * 50, duration: 400 }}
						class="fill"
						class:secondary={path.type === 'secondary'}
						d={path.d}
					/>
				{/if}
				{#if path.stroke}
					<path
						in:draw={{ delay: initDelay + i * 50, duration: 400 }}
						class="stroke"
						class:secondary={path.type === 'secondary'}
						vector-effect={scaleStroke ? '' : 'non-scaling-stroke'}
						d={path.d}
					/>
				{/if}
			{/each}
		</g>
	{/key}
</svg>

<style lang="scss">
	:where(.icon) {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		padding: 0;
		margin: 0;
		width: 1em;
		height: 1em;
		overflow: visible;
		& path {
			fill: none;
			stroke: none;
			&.fill {
				fill: currentColor;
			}
			&.stroke {
				stroke: currentColor;
				stroke-width: var(--thickness);
				stroke-linejoin: round;
				stroke-linecap: round;
			}
			&.secondary {
				color: var(--secondary-color);
			}
		}
	}
</style>

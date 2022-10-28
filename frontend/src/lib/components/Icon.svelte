<!--
	@component
	## Icon
	Primitive component to facilitate adding icons in a consistent manner across the ui.	
-->
<script lang="ts">
	import { transform } from '$transitions/transform';
	import { cssSize } from '$utils/css';
	import { icons } from '$utils/icons';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let secondaryColor: string = 'currentColor';
	export let thickness: number | string = 2;
	export let scaleStroke: boolean = true;
	export let style: string = '';
	let className: string | undefined = undefined;
	export { className as class };

	let ref: HTMLElement;

	$: icon = icons[name];
</script>

<i bind:this={ref} aria-roledescription="icon-{name}" {style} class="icon {className}">
	{#key name}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid"
			viewBox={icon.viewBox}
			class="svg"
			style:--secondary-color={secondaryColor}
			style:--thickness={cssSize(thickness)}
			in:transform|local={{
				scale: 0.5,
				rotateX: 20,
				duration: 350,
				easing: cubicOut,
			}}
			out:transform|local={{ scale: 0.75, rotateZ: -20, duration: 150, easing: cubicIn }}
		>
			{#each icon.paths as path, i}
				{#if path.fill}
					<path
						in:fade={{ delay: i * 50, duration: 400 }}
						class="fill"
						class:secondary={path.type === 'secondary'}
						d={path.d}
					/>
				{/if}
				{#if path.stroke}
					<path
						in:draw={{ delay: i * 50, duration: 400 }}
						class="stroke"
						class:secondary={path.type === 'secondary'}
						vector-effect={scaleStroke ? undefined : 'non-scaling-stroke'}
						d={path.d}
					/>
				{/if}
			{/each}
		</svg>
	{/key}
</i>

<style lang="scss">
	.icon {
		position: relative;
		display: inline-block;
		overflow: visible;
		width: 1em;
		aspect-ratio: 1 / 1;
		margin: 0;
		padding: 0;
		vertical-align: middle;
	}

	.svg {
		display: block;
		position: absolute;
		padding: 0;
		margin: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
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

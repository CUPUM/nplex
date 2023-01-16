<!--
	@component
	## Icon
	Primitive component to facilitate adding icons in a consistent manner across the ui.

-->
<script lang="ts" context="module">
	export const ICON_CLASS = {
		hover: 'i-hover-anim',
		hold: 'i-hold-anim',
	} as const;

	const PATH_LENGTH = 100;
</script>

<script lang="ts">
	import { transform } from '$transitions/transform';
	import { cssSize } from '$utils/css';
	import { icons } from '$utils/icons';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { draw as drawTransition, fade } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let secondaryColor: string = 'currentColor';
	export let strokeWidth: number = 2;
	export let strokeLinecap: 'square' | 'round' = 'square';
	export let animate: boolean = true;
	export let animateSpeed: number = 1;
	export let draw: boolean = false;
	export let drawDelay: number = 50;
	export let drawDuration: number = 500;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	$: icon = icons[name];
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	aria-roledescription="icon-{name}"
	role="presentation"
	preserveAspectRatio="xMidYMid"
	viewBox={icon.viewBox}
	class={className}
	class:animate
	{style}
	style:--secondary-color={secondaryColor}
	style:--stroke-width={cssSize(strokeWidth)}
	style:--stroke-linecap={strokeLinecap}
	style:--speed={animateSpeed}
	style:--size={icon.height}
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
			out:transform|local={{
				scale: 0.75,
				rotateX: -30,
				translateY: 20,
				duration: 250,
				easing: cubicIn,
			}}
		>
			{#if draw}
				{#each icon.paths as path, i}
					{#if path.fill}
						<path
							class="fill"
							in:fade={{ duration: drawDuration, delay: i * drawDelay }}
							class:secondary={path.type === 'secondary'}
							d={path.d}
							style:--i={i}
						/>
					{/if}
					{#if path.stroke}
						<path
							in:drawTransition={{ duration: drawDuration, delay: i * drawDelay }}
							class="stroke"
							class:secondary={path.type === 'secondary'}
							d={path.d}
							style:--l={path.length}
							style:--i={i}
							style:--dir={Math.round(Math.random()) * 2 - 1}
						/>
					{/if}
				{/each}
			{:else}
				{#each icon.paths as path, i}
					{#if path.fill}
						<path
							class="fill"
							class:secondary={path.type === 'secondary'}
							d={path.d}
							style:--i={i}
						/>
					{/if}
					{#if path.stroke}
						<path
							class="stroke"
							class:secondary={path.type === 'secondary'}
							d={path.d}
							style:--l={path.length}
							style:--i={i}
							style:--dir={Math.round(Math.random()) * 2 - 1}
						/>
					{/if}
				{/each}
			{/if}
		</g>
	{/key}
</svg>

<style lang="scss">
	:where(svg) {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		padding: 0;
		margin: 0;
		width: 1em;
		height: 1em;
		perspective: 100px;
		overflow: visible;

		g {
			transform-origin: center center;
		}

		path {
			fill: none;
			stroke: none;

			&.fill {
				fill: currentColor;
			}

			&.stroke {
				--gap: calc(var(--l) * 0.75);
				--lcorr: calc(var(--l) + 2 * var(--stroke-width));
				// Calculating the animation duration (for hover and hold modes) independently of the icon's size
				--d: calc(((var(--l) * 100ms / var(--size)) + 350ms) / var(--speed));
				stroke: currentColor;
				stroke-width: var(--stroke-width);
				stroke-linejoin: round;
				stroke-linecap: var(--stroke-linecap);
				stroke-dasharray: var(--l) var(--gap);
				stroke-dashoffset: 0;
				transition: stroke-dashoffset var(--d) calc(0.1s * var(--i)) var(--ui-ease-out);
			}

			&.secondary {
				color: var(--secondary-color);
			}
		}
	}

	:global(.i-hover-anim):hover,
	:global(.i-hold-anim) {
		.animate {
			.stroke {
				stroke-dashoffset: calc(var(--dir) * (var(--gap) + var(--l)));
			}
		}
	}
</style>

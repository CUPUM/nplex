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

	const TRANSITION_DURATION = 175;
	const TRANSITION_DELAY = TRANSITION_DURATION * 0.75;
	const TRANSITION_STAGGER = 50;
</script>

<script lang="ts">
	import { cssSize } from '$utils/css';
	import { icons } from '$utils/icons';
	import { cubicOut } from 'svelte/easing';
	import { draw, scale } from 'svelte/transition';

	export let name: keyof typeof icons;
	export let secondaryColor: string = 'currentColor';
	export let strokeWidth: number = 2;
	export let strokeLinecap: 'square' | 'round' = 'square';
	export let animate: boolean = true;
	export let animationSpeed: number = 1;
	// export let draw: boolean = false;
	// export let drawDelay: number = 50;
	// export let drawDuration: number = 500;
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
	class="ui-icon {className}"
	class:animate
	{style}
	style:--secondary-color={secondaryColor}
	style:--stroke-width={cssSize(strokeWidth)}
	style:--stroke-linecap={strokeLinecap}
	style:--speed={animationSpeed}
	style:--height={icon.height}
>
	{#each icon.paths as path, i}
		{#if path.fill}
			{#key path}
				<path
					transition:scale|local={{
						duration: TRANSITION_DURATION,
						start: 0.8,
						delay: i * TRANSITION_STAGGER,
					}}
					class="fill"
					class:secondary={path.type === 'secondary'}
					d={path.d}
					style:--i={i}
				/>
			{/key}
		{/if}
		{#if path.stroke}
			{#key path}
				<path
					in:draw|local={{
						duration: TRANSITION_DURATION,
						easing: cubicOut,
						delay: i * TRANSITION_STAGGER + TRANSITION_DELAY,
					}}
					out:draw|local={{
						duration: TRANSITION_DURATION,
						easing: cubicOut,
						delay: i * TRANSITION_STAGGER,
					}}
					class="stroke"
					class:secondary={path.type === 'secondary'}
					d={path.d}
					style:--l={path.length}
					style:--i={i}
					style:--dir={Math.round(Math.random()) * 2 - 1}
				/>
			{/key}
		{/if}
	{/each}
</svg>

<style lang="scss">
	svg {
		display: inline-block;
		position: relative;
		padding: 0;
		margin: 0;
		width: 1em;
		height: 1em;
		overflow: visible;

		path {
			fill: none;
			stroke: none;

			&.fill {
				fill: currentColor;
			}

			&.stroke {
				--gap: calc(var(--l) * 0.75);
				--lcorr: calc(var(--l) + 2 * var(--stroke-width));
				// Calculating the animation duration (for hover and hold modes) independently of the icon's height
				--d: calc(((var(--l) * 100ms / var(--height)) + 350ms) / var(--speed));
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

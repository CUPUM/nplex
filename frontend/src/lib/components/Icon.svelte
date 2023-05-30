<!--
	@component
	## Icon
	Primitive component to facilitate adding icons in a consistent manner across the ui.
-->
<script lang="ts" context="module">
	import type { SvelteEasingFunction } from '$types/utils';

	export const ICON_CLASS = {
		hover: 'i-hover-anim',
		hold: 'i-hold-anim',
	} as const;

	export const ICON_BUTTON_BASE = {
		size: '1.125em',
		strokeWidth: 2.25,
	};

	const TRANSITION_DURATION = 300;
	const TRANSITION_STAGGER = 75;

	type IconPathTransitionOptions = {
		angle?: number;
		duration?: number;
		delay?: number;
		easing?: SvelteEasingFunction;
	};

	function pathtransition(
		element: SVGPathElement,
		{ angle = 0, delay = 0, duration = 1250, easing = linear }: IconPathTransitionOptions = {}
	) {
		const style = getComputedStyle(element);
		if (style.fill !== 'none') {
			return {
				delay,
				duration,
				easing,
				css: (t, u) => `
			transform-origin: center;
			transform: scale(${1 - u * 0.5});
			opacity: ${t};
		`,
			} satisfies SvelteTransitionReturnType;
		}
		let len = element.getTotalLength();
		if (style.strokeLinecap !== 'butt') {
			len += parseInt(style.strokeWidth);
		}
		return {
			delay,
			duration,
			easing,
			css: (t, u) => `
			transform-origin: 50% 50%;
			transform: rotate(${u * angle}deg);
			stroke-dasharray: ${len};
			stroke-dashoffset: ${u * len};
		`,
		} satisfies SvelteTransitionReturnType;
	}
</script>

<script lang="ts">
	import { cssSize } from '$utils/css';
	import { icons } from '$utils/icons';
	import { onMount } from 'svelte';
	import { expoIn, expoOut, linear } from 'svelte/easing';

	export let id: string | undefined = undefined;
	export let name: keyof typeof icons;
	export let secondaryColor: string = 'currentColor';
	export let strokeWidth: number = 2;
	export let strokeLinecap: 'square' | 'round' = 'round';
	export let animate: boolean = true;
	export let animationSpeed: number = 1;
	export let size: string = '1em';
	export let intro: boolean = false;
	let className: string = '';
	export { className as class };

	$: icon = icons[name];

	let applyIn = intro;

	onMount(() => {
		applyIn = true;
	});
</script>

<svg
	{id}
	xmlns="http://www.w3.org/2000/svg"
	aria-roledescription="icon-{name}"
	role="presentation"
	preserveAspectRatio="xMidYMid"
	viewBox={icon.viewBox}
	class="ui-icon {className}"
	class:animate
	style:font-size={size}
	style:--secondary-color={secondaryColor}
	style:--stroke-width={cssSize(strokeWidth)}
	style:--stroke-linecap={strokeLinecap}
	style:--speed={animationSpeed}
	style:--height={icon.height}
>
	{#each icon.paths as path, i (path)}
		<path
			in:pathtransition|local={{
				duration: applyIn ? TRANSITION_DURATION : 0,
				delay: applyIn ? TRANSITION_DURATION + i * TRANSITION_STAGGER : 0,
				angle: 90,
				easing: expoOut,
			}}
			out:pathtransition|local={{
				duration: TRANSITION_DURATION,
				delay: i * TRANSITION_STAGGER,
				angle: -90,
				easing: expoIn,
			}}
			class:fill={path.fill}
			class:stroke={path.stroke}
			class:secondary={path.type === 'secondary'}
			d={path.d}
			style:--i={i}
			style:--dir={Math.round(Math.random()) * 2 - 1}
			style:--l={path.length}
		/>
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
			// transform-origin: center;
			fill: none;
			stroke: none;
		}

		.fill {
			fill: currentColor;
		}

		.stroke {
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

		.secondary {
			color: var(--secondary-color);
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

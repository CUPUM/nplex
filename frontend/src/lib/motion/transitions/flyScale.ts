import type { SvelteEasingFunction } from '$types/utils';
import { cubicInOut } from 'svelte/easing';

/**
 * Simple transition combining flying (translating) and scaling motion.
 */
export default function flyScale(
	element: Element,
	{
		y = 0,
		x = 0,
		scale = 1,
		opacity = 0,
		duration = 300,
		delay = 0,
		easing = cubicInOut,
	}: {
		y?: number;
		x?: number;
		scale?: number;
		opacity?: number;
		duration?: number;
		delay?: number;
		easing?: SvelteEasingFunction;
	} = {}
) {
	const style = getComputedStyle(element);
	const targetOpacity = +style.opacity;
	const baseTransform = style.transform === 'none' ? '' : style.transform;
	const deltaOpacity = targetOpacity * (1 - opacity);
	const deltaScale = 1 - scale;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${baseTransform} scale(${1 - deltaScale * u}) translate(${(1 - t) * x}px, ${
			(1 - t) * y
		}px);
			opacity: ${targetOpacity - deltaOpacity * u}
		`,
	} satisfies SvelteTransitionReturnType;
}

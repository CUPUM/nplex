import { linear } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

export type TraceTransitionOptions = {
	angle?: number;
	duration?: number;
	delay?: number;
	easing?: EasingFunction;
	scale?: number;
};

/**
 * Svelte transition similar to `draw` but with additional user-customizable puffing effect.
 */
export function trace(
	element: SVGPathElement,
	{ angle = 0, scale = 1, delay = 0, duration = 1250, easing = linear }: TraceTransitionOptions = {}
): SvelteTransitionReturnType {
	const style = getComputedStyle(element);
	const dscale = 1 - scale;

	if (style.fill !== 'none') {
		return {
			delay,
			duration,
			easing,
			css: (t, u) => `
				transform-origin: center;
				rotate: ${u * angle}deg;
				scale: ${1 - u * dscale};
				opacity: ${t};
				`,
		};
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
			transform-origin: center;
			rotate: ${u * angle}deg;
			scale: ${1 - u * dscale};
			stroke-dasharray: ${len};
			stroke-dashoffset: ${u * len};
		`,
	};
}

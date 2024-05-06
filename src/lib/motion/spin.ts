/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cubicOut } from 'svelte/easing';
import { type EasingFunction } from 'svelte/transition';

export function spin(
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = cubicOut,
		opacity = 0,
		x = 0,
		y = 0,
		z = 0,
	}: {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
		opacity?: number;
		x?: number;
		y?: number;
		z?: number;
	} = {}
): SvelteTransitionReturnType {
	const style = getComputedStyle(node);
	const opacity_s = +style.opacity;
	const opacity_d = opacity_s * (1 - opacity);
	const transform = style.transform === 'none' ? '' : style.transform;
	return {
		delay,
		duration,
		easing,
		css: (t, u) =>
			`opacity: ${opacity_s - opacity_d * u};` +
			`transform: ${transform} rotateX(${x * u}deg) rotateY(${y * u}deg) rotateZ(${z * u}deg);`,
	};
}

import { expoOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

/**
 * Pixels (to do: add support for strings such as percentages, turns, rems, etc.)
 */
type Dimension = number;

export type TransformTransitionOptions = {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	opacity?: number;
	scale?: Dimension | [Dimension, Dimension];
	translate?: Dimension | [Dimension, Dimension] | [Dimension, Dimension, Dimension];
	rotate?: Dimension | [Dimension, Dimension] | [Dimension, Dimension, Dimension];
};

function d(
	dimensions: Dimension | [Dimension, Dimension] | [Dimension, Dimension, Dimension]
): [Dimension] | [Dimension, Dimension] | [Dimension, Dimension, Dimension] {
	if (!Array.isArray(dimensions)) {
		return [dimensions];
	}
	return dimensions;
}

function cs(scaleDelta: number | undefined, u: number) {
	return 1 - (scaleDelta ?? 1) * u;
}

function ct(translateDelta: number | undefined, u: number) {
	return 1 - (translateDelta ?? 1) * u;
}

function cr(rotateDelta: number | undefined, u: number) {
	return u * (rotateDelta ?? 0);
}

/**
 * Custom transition similar to fly or scale, but with possibilities of combining transforms.
 */
export function transform(
	element: Element,
	{
		delay = 0,
		duration = 250,
		easing = expoOut,
		opacity = 0,
		scale = 1,
		translate = 0,
		rotate = 0,
	}: TransformTransitionOptions = {}
) {
	const style = getComputedStyle(element);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const si = d(scale);
	const sd = si.map((s) => 1 - s);
	// if (sd.length === 1) {
	// 	sd.push(sd[0]);
	// }
	const ti = d(translate);
	const td = ti.map((tr) => 0 - tr);
	const ri = d(rotate);
	const rd = ri.map((r) => 0 - r);

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			const ns = `scale(${cs(sd[0], u)}${sd[1] == undefined ? '' : `,${cs(sd[1], u)}`})`;
			const nt = `translate3d(${ct(td[0], u)}px,${ct(td[1], u)}px,${ct(td[2], u)}px)`;
			// prettier-ignore
			const nr = `rotateX(${cr(rd[0], u)}deg) rotateY(${cr(rd[1], u)}deg) rotateZ(${cr(rd[2], u)}deg)`;
			return `
			opacity: ${target_opacity - od * u};
			transform: ${transform} ${ns} ${nt} ${nr};
		`;
		},
	} satisfies SvelteTransitionReturnType;
}

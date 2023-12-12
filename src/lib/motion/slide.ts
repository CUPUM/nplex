/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cubicOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

/**
 * @ THIS IS TAKEN FROM SVELTE'S OWN TRANSITIONS.
 *
 * @see https://github.com/sveltejs/svelte/issues/9199
 *
 * Slides an element in and out.
 *
 * https://svelte.dev/docs/svelte-transition#slide.
 */
export function slide(
	node: HTMLElement,
	{
		delay = 0,
		duration = 400,
		easing = cubicOut,
		axis = 'y',
		opacity = 0,
	}: {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
		axis?: 'x' | 'y';
		opacity?: number;
	} = {}
): SvelteTransitionReturnType {
	const style = getComputedStyle(node);
	const opacity_s = +style.opacity;
	const opacity_d = opacity_s * (1 - opacity);
	const primary_property = axis === 'y' ? 'height' : 'width';
	const primary_property_value = parseFloat(style[primary_property]);
	const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
	const capitalized_secondary_properties = secondary_properties.map(
		(e) => `${e[0].toUpperCase()}${e.slice(1)}`
	);
	// @ts-ignore
	const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
	// @ts-ignore
	const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
	// @ts-ignore
	const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
	// @ts-ignore
	const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
	const border_width_start_value = parseFloat(
		// @ts-ignore
		style[`border${capitalized_secondary_properties[0]}Width`]
	);
	const border_width_end_value = parseFloat(
		// @ts-ignore
		style[`border${capitalized_secondary_properties[1]}Width`]
	);
	return {
		delay,
		duration,
		easing,
		css: (t, u) =>
			'overflow: hidden;' +
			`opacity: ${opacity_s - opacity_d * u};` +
			`${primary_property}: ${t * primary_property_value}px;` +
			`padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
			`padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
			`margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
			`margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
			`border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
			`border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`,
	};
}

import { expoOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

interface SlipOptions {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	opacity?: number;
	/**
	 * If the transition should apply to the host element's width.
	 */
	width?: boolean;
	/**
	 * If the transition should apply to the host element's height.
	 */
	height?: boolean;

	/**
	 * Single number for proportional scale or array of X and Y scale values.
	 */
	scale?: number | [number, number];
	/**
	 * Horizontal offset.
	 */
	x?: number;
	/**
	 * Vertical offset.
	 */
	y?: number;
	/**
	 * If the host element's box should clip its content during the transition.
	 */
	overflow?:
		| 'hidden'
		| 'visible'
		| 'hidden hidden'
		| 'visible visible'
		| 'hidden visible'
		| 'visible hidden';
}

/**
 * Transition that primes smoothly inserting an element by sizing its width and/or its height
 * (similarly to svelte's slide transition).
 *
 * This transition also allows combining this with a fly, scale, and/or fade transition, in addition
 * to an overflow property to customize content-clipping during the transition's life.
 */
export function slip(
	el: Element,
	{
		delay = 0,
		duration = 350,
		easing = expoOut,
		opacity = 1,
		width = false,
		height = false,
		scale = 1,
		x = 0,
		y = 0,
		overflow = undefined,
	}: SlipOptions
) {
	const _style = getComputedStyle(el);
	/**
	 * Saving target styles.
	 */
	const _position = _style.position;
	const _opacity = +_style.opacity;
	const _width = parseFloat(_style.width);
	const _maxWidth = parseFloat(_style.maxWidth);
	const _height = parseFloat(_style.height);
	const _maxHeight = parseFloat(_style.maxHeight);
	const _paddingTop = parseFloat(_style.paddingTop);
	const _paddingRight = parseFloat(_style.paddingRight);
	const _paddingBottom = parseFloat(_style.paddingBottom);
	const _paddingLeft = parseFloat(_style.paddingLeft);
	const _marginTop = parseFloat(_style.marginTop);
	const _marginRight = parseFloat(_style.marginRight);
	const _marginBottom = parseFloat(_style.marginBottom);
	const _marginLeft = parseFloat(_style.marginLeft);
	const _borderTop_width = parseFloat(_style.borderTopWidth);
	const _borderRight_width = parseFloat(_style.borderRightWidth);
	const _borderBottom_width = parseFloat(_style.borderBottomWidth);
	const _borderLeft_width = parseFloat(_style.borderLeftWidth);
	const _overflow = _style.overflow;
	const _transform = _style.transform === 'none' ? '' : _style.transform;

	/**
	 * Opacity difference.
	 */
	const d_opacity = _opacity - opacity;
	const d_scaleX = Array.isArray(scale) ? 1 - scale[0] : 1 - scale;
	const d_scaleY = Array.isArray(scale) ? 1 - scale[1] : 1 - scale;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			const txHeight = height
				? `height: ${t * _height}px;` +
				  `max-height: ${t * _maxHeight}px;` +
				  `padding-top: ${t * _paddingTop}px;` +
				  `padding-bottom: ${t * _paddingBottom}px;` +
				  `margin-top: ${t * _marginTop}px;` +
				  `margin-bottom: ${t * _marginBottom}px;` +
				  `border-top-width: ${t * _borderTop_width}px;` +
				  `border-bottom-width: ${t * _borderBottom_width}px;`
				: '';
			const txWidth = width
				? `width: ${t * _width}px;` +
				  `max-width: ${t * _maxWidth}px;` +
				  `padding-right: ${t * _paddingRight}px;` +
				  `padding-left: ${t * _paddingLeft}px;` +
				  `margin-right: ${t * _marginRight}px;` +
				  `margin-left: ${t * _marginLeft}px;` +
				  `border-right-width: ${t * _borderRight_width}px;` +
				  `border-left-width: ${t * _borderLeft_width}px;`
				: '';
			return (
				`overflow: ${t < 1 ? overflow : _overflow};` +
				`opacity: ${_opacity - d_opacity * u};` +
				`transform: ${_transform} scale(${1 - u * d_scaleX}, ${1 - u * d_scaleY}) translate(${
					(1 - t) * x
				}px, ${(1 - t) * y}px);` +
				txHeight +
				txWidth
			);
		},
	} satisfies SvelteTransitionReturnType;
}

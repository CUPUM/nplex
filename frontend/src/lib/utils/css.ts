import type { Theme } from '$plugins/themes/utils';
import { paramCase } from 'change-case';

/**
 * This file contains helpers used to declare styles; css or sass related.
 */

/**
 * Helper equivalent to the Sass helper function used to compose CSS var names for theme-dependent
 * colors.
 *
 * See /styles/color.scss for sass homologue.
 */
export function col<C extends keyof Theme>(color: C, shade: keyof Theme[C], alpha?: number) {
	if (alpha === undefined || alpha === 1) {
		return `var(--color-${color}-${String(shade)})`;
	}
	return `rgb(var(--rgb-${color}-${String(shade)}), ${alpha})`;
}

export function radius(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') {
	return `var(--ui-radius-${size})`;
}

/**
 * Translate unitless number or string to pixel value.
 */
export function px(value: string | number) {
	return value + 'px';
}

/**
 * Helper to quickly test an input value and format it properly for usage in css.
 */
export function cssSize(input: number | string, fallbackUnit: string = 'px') {
	if (typeof input === 'string' && parseFloat(input) + '' !== input) return input;
	return input + fallbackUnit;
}

/**
 * List of possible CSS units for sizes.
 */
export const cssSizeUnits = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'cm'] as const;

/**
 * CSS unit matcher expression.
 */
const unitsRegex = `/${cssSizeUnits.join('|')}/`;

/**
 * Helper to parse CSS values and return an object with the number and unit extracted. Returned unit
 * will be undefined if input has none or if it doesn't match any of the accepted units.
 */
export function decomposeCssSize(input: string | number): {
	value: number;
	unit: string | undefined;
} {
	const str = input + '';
	return {
		value: parseFloat(str),
		unit: str.match(unitsRegex)?.[0],
	};
}

/**
 * Compose the css string value for a faded theme color.
 *
 * @color The passed color __MUST__ either be a token from `vars.fade`, which represents a css variable with a value comprised of `r g b` components, or it can be an `r g b` component string.
 */
export function fade(color: string, alpha: number) {
	return `rgba(${color}, ${alpha})`;
}

/**
 * Quick variable name composer to get out-of-ts CSS variables. Any cased inputs will be translated
 * to kebab-case.
 */
export function getVar(name: string, keepCasing?: boolean, fallback?: string | number) {
	return `var(--${keepCasing ? name : paramCase(name)}${fallback ? ', ' + fallback : ''})`;
}

/**
 * Compose a quick reference svelte CSS variable names map to easily reuse them in vanilla extract
 * styles. returns an object mapping the input camelCased names to the expected kebab-case full
 * `var(--...)` function.
 */
export function varBook<K extends string>(
	names: readonly K[],
	keepCasing?: boolean
): { [V in K]: string } {
	return Object.fromEntries(names.map((n) => [n, getVar(n, keepCasing)])) as any;
}

/**
 * Compose CSS animation shorthand(s) from passed parameters. See
 * https://developer.mozilla.org/en-US/docs/Web/CSS/animation for expected order of params.
 *
 * Duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name
 * animation: 3s ease-in 1s 2 reverse both paused slidein;
 *
 * Duration | easing-function | delay | name animation: 3s linear 1s slidein;
 *
 * Two animations animation: 3s linear slidein, 3s ease-out 5s slideout;
 */
export function anim(...details: (string | number)[] | (string | number)[][]): string {
	if (Array.isArray(details[0])) {
		return (details as string[][])
			.map((a) => {
				return anim(...a);
			})
			.join(', ');
	}
	return details.join(' ');
}

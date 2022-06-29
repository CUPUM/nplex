import type { CSS } from 'src/types/css';

/**
 * List of possible CSS units for sizes.
 */
export const cssSizeUnits = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'cm'] as const;

/**
 * CSS unit matcher expression.
 */
const unitsRegex = `/${cssSizeUnits.join('|')}/`;

/**
 * Helper to parse CSS values and return an object with the number and unit extracted. Returned unit will be undefined
 * if input has none or if it doesn't match any of the accepted units.
 */
export function decomposeCssSize(input: SizeInput): {
	value: number;
	unit: CSS.SizeUnit | undefined;
} {
	const str = input + '';
	return {
		value: parseFloat(str),
		unit: str.match(unitsRegex)?.[0] as CSS.SizeUnit | undefined,
	};
}

export type SizeInput = number | CSS.SizeValue | `${number}`;

/**
 * Helper to quickly test an input value and format it properly for usage in css.
 */
export function cssSize(input: SizeInput, fallbackUnit: CSS.SizeUnit = 'px') {
	const decomposed = decomposeCssSize(input);
	return (decomposed.value + (decomposed.unit || fallbackUnit)) as CSS.SizeValue;
}

/**
 * Default component size taking parent's inset into account.
 */
// export const defaultSize;

/**
 * List of possible CSS units for sizes.
 */
const cssSizeUnits = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'cm'] as const;

/**
 * Type for only the unit part of a string.
 */
export type CssSizeUnit = typeof cssSizeUnits[number];

/**
 * Type to validate whole strings composed of a value and an unit.
 */
export type CssSizeValue = `${number}${CssSizeUnit}`;

/**
 * CSS unit matcher expression.
 */
const unitsRegex = `/${cssSizeUnits.join('|')}/`;

/**
 * Helper to parse CSS values and return an object with the number and unit extracted.
 * Returned unit will be undefined if input has none or if it doesn't match any of the accepted units.
 */
export function decomposeCssSize(input: number | CssSizeValue): {
	value: number;
	unit: CssSizeUnit | undefined;
} {
	const str = input + '';
	return {
		value: parseFloat(str),
		unit: str.match(unitsRegex)?.[0] as CssSizeUnit | undefined
	};
}

/**
 * Helper to quickly test an input value and format it properly for usage in css.
 */
export function cssSize(input: number | CssSizeValue, fallbackUnit: CssSizeUnit = 'px') {
	const decomposed = decomposeCssSize(input);
	return decomposed.value + (decomposed.unit || fallbackUnit) as CssSizeValue;
}


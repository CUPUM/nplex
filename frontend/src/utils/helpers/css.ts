/**
 * List of possible CSS units for sizes.
 */
const cssSizeUnits = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'cm'] as const;

/**
 * Type for only the unit part of a string.
 */
export type CSSSizeUnit = typeof cssSizeUnits[number];

/**
 * Type to validate whole strings composed of a value and an unit.
 */
export type CSSSizeValue = `${number}${CSSSizeUnit}`;

/**
 * CSS unit matcher expression.
 */
const unitsRegex = `/${cssSizeUnits.join('|')}/`;

/**
 * Helper to parse CSS values and return an object with the number and unit extracted. Returned unit will be undefined
 * if input has none or if it doesn't match any of the accepted units.
 */
export function decomposeCssSize(input: number | CSSSizeValue): {
	value: number;
	unit: CSSSizeUnit | undefined;
} {
	const str = input + '';
	return {
		value: parseFloat(str),
		unit: str.match(unitsRegex)?.[0] as CSSSizeUnit | undefined,
	};
}

export type SizeInput = number | CSSSizeValue;

/**
 * Helper to quickly test an input value and format it properly for usage in css.
 */
export function cssSize(input: SizeInput, fallbackUnit: CSSSizeUnit = 'px') {
	const decomposed = decomposeCssSize(input);
	return (decomposed.value + (decomposed.unit || fallbackUnit)) as CSSSizeValue;
}

const unitsRegex = /px|%|em|rem|vh|vw|vmin|vmax|cm/;

interface ParsedCSSValue {
	number: number;
	unit: string | undefined;
}

/**
 * Helper to parse CSS values and return an object with the number and unit extracted.
 * Returned unit will be undefined if input has none.
 */
export function parseCSSValue(value: string | number): ParsedCSSValue {
	const str = value.toString();
	return {
		number: parseFloat(str),
		unit: str.match(unitsRegex)?.[0]
	};
}

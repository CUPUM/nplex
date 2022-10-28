import type { cssSizeUnits } from '$utils/css';

/**
 * Namespacing CSS types for clarity.
 */
export declare namespace CSS {
	/**
	 * Type for only the unit part of a string.
	 */
	export type SizeUnit = typeof cssSizeUnits[number];

	/**
	 * Type to validate whole strings composed of a value and an unit.
	 */
	export type SizeValue = `${number}${SizeUnit}`; // | `calc(${string})` | `var(--${string})`;

	/**
	 * Typing specific properties.
	 */
	export namespace Properties {}
}

/**
 * Take a given number and make it abide to a discrete domain based on a step size and an origin.
 * Useful for inputs where value should snap according to the step attribute's value.
 */
export function snap(
	value: number,
	step: number,
	{
		origin = 0,
		round = Math.round,
	}: { origin?: number; round?: (typeof Math)['ceil' | 'round' | 'floor'] } = {}
) {
	return round((value - origin) / step) * step + origin;
}

/**
 * Provide a quick polyfill for mod operations (%) that ensure continuity with negative numbers.
 *
 * @see https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
 */
export function mod(number: number, modulus: number) {
	return ((number % modulus) + modulus) % modulus;
}

/**
 * Quick sum of an array of numbers.
 */
export function sum(...numbers: number[]) {
	return numbers.reduce((total, n) => total + n, 0);
}

/**
 * Quickly get the average of an array of numbers.
 */
export function avg(...numbers: number[]) {
	return sum(...numbers) / numbers.length;
}

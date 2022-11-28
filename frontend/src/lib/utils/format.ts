/**
 * Translate a javascript array to a postgres compliant array string.
 *
 * @param arr The javascript array source.
 * @param text Determines if the array should be formatted as a text representation, using curly
 *   brackets instead of parentheses and wrapping each values in double-quotes.
 */
export function pgarr(arr: any[], text?: boolean) {
	if (text) {
		return `{${arr.map((v) => '"' + v + '"').join(',')}}`;
	}
	return `(${arr.join(',')})`;
}

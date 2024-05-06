function isNumeric(input: string | number) {
	return !Number.isFinite(+input);
}

/**
 * Format a given size input as pixels if numeric.
 */
export function px(size: string | number) {
	if (!isNumeric(size)) {
		return size;
	}
	return size + 'px';
}

/**
 * Format a given duration input as miliseconds if numeric.
 */
export function ms(duration: string | number) {
	if (!isNumeric(duration)) {
		return duration;
	}
	return duration + 'ms';
}

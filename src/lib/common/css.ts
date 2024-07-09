import { browser } from '$app/environment';

function isNumeric(input: string | number): input is number {
	return Number.isFinite(+input);
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
 * Transpose and format a given size value as rem if numeric and in browser.
 *
 * @returns Size computed as css-ready `rem` value if in browser, else in `px`.
 */
export function rem(size: string | number) {
	if (!isNumeric(size)) {
		return size;
	}
	if (!browser) {
		return size + 'px';
	}
	return size / parseFloat(getComputedStyle(document.documentElement).fontSize) + 'rem';
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

/**
 * Helper function to debounce passed function's execution.
 */
export function debounce<Args extends any[], F extends (...args: Args) => any>(f: F, timeout = 250) {
	let timer;
	return (...args: Parameters<F>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			f(...args);
		}, timeout);
	};
}

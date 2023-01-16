/**
 * Helper function to debounce passed function's execution.
 */
export function debounce<Args extends any[], F extends (...args: Args) => any>(
	f: F,
	timeout = 250
) {
	let timer: any;
	let cache: ReturnType<F>;

	function d(...args: Parameters<F>) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			cache = f(...args);
			return cache;
		}, timeout);
		return cache;
	}

	d.cancel = function () {
		clearTimeout(timer);
	};

	return d;
}

/**
 * Function wrapper to throttle the passed function's execution rate.
 */
export function throttle<Args extends any[], F extends (...args: Args) => ReturnType<F>>(
	f: F,
	timeout = 250
) {
	let timer: any;
	let last: number;
	let cache: ReturnType<F>;

	function t(...args: Parameters<F>) {
		clearTimeout(timer);
		const now = Date.now();
		if (last + timeout > now) {
			timer = setTimeout(() => {
				cache = f(...args);
				return cache;
			}, timeout + 1);
		} else {
			last = now;
			cache = f(...args);
		}
		return cache;
	}

	t.cancel = function () {
		clearTimeout(timer);
	};

	return t;
}

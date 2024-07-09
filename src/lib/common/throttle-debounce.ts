/**
 * Helper function to debounce passed function's execution.
 */
export function debounce<A extends unknown[], R>(fn: (...args: A) => R, timeout = 250) {
	let timer: ReturnType<typeof setTimeout> | undefined;
	let cache: R;

	function d(...args: A) {
		if (!timer) {
			cache = fn(...args);
			timer = setTimeout(() => {
				timer = undefined;
				return cache;
			}, timeout);
		} else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				timer = undefined;
				cache = fn(...args);
				return cache;
			}, timeout);
		}
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
export function throttle<A extends unknown[], R>(fn: (...args: A) => R, timeout = 250) {
	let timer: ReturnType<typeof setTimeout>;
	let last: number;
	let cache: R;

	function t(...args: A) {
		clearTimeout(timer);
		const now = Date.now();
		if (last + timeout > now) {
			timer = setTimeout(() => {
				cache = fn(...args);
				return cache;
			}, timeout + 1);
		} else {
			last = now;
			cache = fn(...args);
		}
		return cache;
	}

	t.cancel = function () {
		clearTimeout(timer);
	};

	return t;
}

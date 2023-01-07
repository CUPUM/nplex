/**
 * Helper function to debounce passed function's execution.
 */
export function debounce<Args extends any[], F extends (...args: Args) => any>(
	f: F,
	timeout = 250
) {
	let timer: any;

	function d(...args: Parameters<F>) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			f(...args);
		}, timeout);
	}

	d.cancel = function () {
		clearTimeout(timer);
	};

	return d;
}

/**
 * Function wrapper to throttle the passed function's execution rate.
 */
export function throttle<Args extends any[], F extends (...args: Args) => any>(
	f: F,
	timeout = 250
) {
	let timer: any;
	let last: number;

	function t(...args: Parameters<F>) {
		clearTimeout(timer);
		const now = Date.now();
		if (last + timeout > now) {
			timer = setTimeout(() => {
				f(...args);
			}, timeout + 1);
		} else {
			last = now;
			f(...args);
		}
	}

	t.cancel = function () {
		clearTimeout(timer);
	};

	return t;
}

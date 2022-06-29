interface InertiaScrollOptions {
	inertia?: number;
}

const defaultOptions: InertiaScrollOptions = {
	inertia: 0.25,
};

/**
 * Use this directive to add a momentum effect to an element's mousewheel scrolling.
 */
export function inertiaScroll(element: HTMLElement, options?: InertiaScrollOptions) {
	const { inertia } = { ...defaultOptions, ...options };

	let top;
	let distance = 0;
	let inertialDistance = 0;
	let accelerating: boolean = false;

	function handleScroll(e: WheelEvent) {
		console.log('handle scroll');
		e.preventDefault();

		if (accelerating) {
			scroll();
		}
	}

	function scroll() {
		console.log('scroll');
		requestAnimationFrame(scroll);
	}

	element.addEventListener('wheel', handleScroll, { passive: false });
	element.addEventListener('mousewheel', handleScroll, { passive: false });

	return {
		destroy() {
			element.removeEventListener('wheel', handleScroll);
			element.removeEventListener('mousewheel', handleScroll);
		},
	};
}

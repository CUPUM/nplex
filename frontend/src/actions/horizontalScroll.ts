interface HorizontalScrollParams {
	/**
	 * Multiplier to be applied to the caught wheel event's `deltaY` when transposing to `scrollLeft`
	 */
	multiplier?: number;
	/**
	 * Should the horizontal scroll be applied even if the element has vertical scroll overflow?
	 */
	precedeVertical?: boolean;
}

const defaultParams: HorizontalScrollParams = {
	multiplier: 1,
	precedeVertical: true,
};

/**
 * Directive to catch and transpose mousewheel events into horizontal scroll.
 */
export function horizontalScroll(element: HTMLElement, options?: HorizontalScrollParams) {
	const { multiplier, precedeVertical } = { ...defaultParams, ...options };

	function handleScroll(e: WheelEvent) {
		console.log(element.scrollHeight);
		// e.preventDefault();
		if (precedeVertical) {
			element.scrollLeft += e.deltaY * multiplier;
		} else {
			// Do other stuff
		}
	}

	element.addEventListener('wheel', handleScroll, { passive: false });

	return {
		destroy() {
			element.removeEventListener('wheel', handleScroll);
		},
	};
}

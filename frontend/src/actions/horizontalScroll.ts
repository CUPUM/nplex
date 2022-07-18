import { isTouchpad } from '$utils/device';

interface HorizontalScrollOptions {
	/**
	 * Multiplier to be applied to the caught wheel event's `deltaY` when transposing to `scrollLeft`.
	 */
	multiplier?: number;
	/**
	 * Should the horizontal scroll be applied even if the element has vertical scroll overflow?
	 */
	precedeVertical?: boolean;
}

const defaultOptions: HorizontalScrollOptions = {
	multiplier: 1,
	precedeVertical: true,
};

/**
 * Directive to catch and transpose mousewheel events into horizontal scroll.
 */
export function horizontalScroll(element: HTMLElement, options?: HorizontalScrollOptions) {
	const { multiplier, precedeVertical } = { ...defaultOptions, ...options };

	function handleScroll(e: WheelEvent) {
		if (isTouchpad(e) || e.deltaX) return;

		// Let's first check that there actually is available scrollable space inside the host element.
		const horizontalScrollSpace = element.scrollWidth - element.clientWidth;

		if (horizontalScrollSpace) {
			const transposedDelta = e.deltaY * multiplier;
			// Let's now check that the scrolled delta is applicable, i.e. that the client hasn't already reached the scrollable space's end (or start).
			const canScrollHorizontal =
				(transposedDelta < 0 && element.scrollLeft) ||
				(transposedDelta > 0 && element.scrollLeft < horizontalScrollSpace);

			if (canScrollHorizontal) {
				const canScrollVertical =
					(e.deltaY < 0 && element.scrollTop) ||
					(e.deltaY > 0 && element.scrollTop < element.scrollHeight - element.clientHeight);
				if (precedeVertical || !canScrollVertical) {
					e.preventDefault();
					element.scrollLeft += transposedDelta;
				}
			}
		}
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

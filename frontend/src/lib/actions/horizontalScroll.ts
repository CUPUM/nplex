import { isTouchpad } from '$utils/device';

interface HorizontalScrollOptions {
	/**
	 * Multiplier to be applied to the caught wheel event's `deltaY` when transposing to `scrollLeft`.
	 */
	multiplier?: number;
	/**
	 * Should the horizontal scroll be applied on top of (combined with) or as a replacement of the evented vertical
	 * wheel's scroll on the host if it has vertical scrollable overflow?
	 *
	 * Note: This only applies to the host element.
	 */
	combine?: boolean;
	/**
	 * Stop propagation of the wheel event to prevent scroll on parent elements?
	 */
	stopPropagation?: boolean;
	/**
	 * Should the effect be applied even on touchscreen/trackpad?
	 */
	touch?: boolean;
}

/**
 * Directive to catch and transpose mousewheel events into horizontal scroll.
 */
export function horizontalScroll(
	element: HTMLElement,
	{ multiplier = 1, combine = false, stopPropagation = true, touch = false }: HorizontalScrollOptions = {}
) {
	function handleScroll(e: WheelEvent) {
		if ((!touch && isTouchpad(e)) || e.deltaX) return;
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
				if (!combine || !canScrollVertical) {
					e.preventDefault();
					element.scrollLeft += transposedDelta;
				}
				if (stopPropagation) e.stopPropagation();
			}
		}
	}
	element.addEventListener('wheel', handleScroll, { passive: false });
	// element.addEventListener('mousewheel', handleScroll, { passive: false });
	return {
		destroy() {
			element.removeEventListener('wheel', handleScroll);
			// element.removeEventListener('mousewheel', handleScroll);
		},
		update(updated: HorizontalScrollOptions) {
			element.removeEventListener('wheel', handleScroll);
			multiplier = updated.multiplier ?? multiplier;
			combine = updated.combine ?? combine;
			stopPropagation = updated.stopPropagation ?? stopPropagation;
			element.addEventListener('wheel', handleScroll, { passive: false });
		},
	};
}

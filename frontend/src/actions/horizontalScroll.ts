interface HorizontalScrollParams {
	/**
	 * Multiplier to be applied to the caught wheel event's `deltaY` when transposing to `scrollLeft`
	 */
	multiplier: number;
	/**
	 * Should the horizontal scroll be applied even if the element has vertical scroll overflow?
	 */
	precedeVertical: boolean;
}

/**
 * Directive to catch and transpose mousewheel events into horizontal scroll.
 */
export function horizontalScroll(
	element: HTMLElement,
	{ multiplier = 1, precedeVertical = false }: HorizontalScrollParams
) {

	function hasVerticalScroll

	function handleScroll(e: WheelEvent) {
		e.preventDefault();
		element.scrollLeft += e.deltaY * multiplier;
	}

	element.addEventListener('wheel', handleScroll);

	return {
		destroy() {
			element.removeEventListener('wheel', handleScroll);
		},
	};
}

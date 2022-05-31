/**
 * Directive to catch and transpose mousewheel events into horizontal scroll.
 */
export function horizontalScroll(element: HTMLElement) {
	function handleScroll(e: WheelEvent) {
		e.preventDefault();
		element.scrollLeft += e.deltaY;
	}

	document.addEventListener('wheel', handleScroll);

	return {
		destroy() {
			document.removeEventListener('wheel', handleScroll);
		},
	};
}

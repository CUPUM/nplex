/**
 * Simple directive to add a custom event emission when the user clicks outside the host element.
 */
export function clickoutside(element: HTMLElement) {
	function click(e) {
		if (!element.contains(e.target)) {
			element.dispatchEvent(new CustomEvent('clickoutside'));
		}
	}

	document.addEventListener('click', click, true);

	return {
		destroy() {
			document.removeEventListener('click', click);
		}
	}
}
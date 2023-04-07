/**
 * Finds the closest and first child that isn't a "display: contents" wrapper.
 */
export function getClosestBoxChild(element: Element) {
	function isBox(element: Element): element is HTMLElement {
		return element instanceof HTMLElement && getComputedStyle(element).display !== 'contents';
	}
	let iteration = 3; // Max iterations depth
	let currentParent = element;
	while (iteration > 0) {
		for (const child of currentParent.children) {
			if (isBox(child)) {
				return child;
			}
		}
		currentParent = currentParent.children[0];
		iteration--;
	}
}

/**
 * Finds the closest and first child that isn't a "display: contents" wrapper.
 */
export function getClosestBoxChild(
	element: Element,
	{ iterations = 5, includeTarget = false }: { iterations?: number; includeTarget?: boolean } = {}
) {
	function isBox(testElement: Element): testElement is HTMLElement {
		return (
			testElement instanceof HTMLElement && getComputedStyle(testElement).display !== 'contents'
		);
	}
	if (includeTarget) {
		if (isBox(element)) {
			return element;
		}
	}
	let children: HTMLCollection | Element[] = element.children;
	while (iterations > 0) {
		for (const child of children) {
			if (isBox(child)) {
				return child;
			}
		}
		children = [...children].flatMap((child) => [...child.children]);
		iterations--;
	}
}

export function targetIsWithin(target: EventTarget | null, within: Element | null | undefined) {
	if (!target || !within || !(target instanceof Element)) {
		return false;
	}
	return target === within || within.contains(target);
}

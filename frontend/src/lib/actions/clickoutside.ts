const TRIGGER = 'pointerdown';

export const CLICKOUTSIDE_EVENT = 'clickoutside';

/**
 * Directive to handle clicks outside host element.
 *
 * If you are having trouble with this behavior, check the following potential pain points:
 *
 * - Do you have `pointer-evetns: none` in some parent or target child css?
 */
export function clickoutside(node: Node, options?: AddEventListenerOptions | boolean) {
	function handleClick(e: Event) {
		if (node && !node.contains((e as any).target) && !e.defaultPrevented) {
			node.dispatchEvent(new CustomEvent(CLICKOUTSIDE_EVENT, { detail: e }));
		}
	}

	document.addEventListener(TRIGGER, handleClick, options);

	return {
		destroy() {
			document.removeEventListener(TRIGGER, handleClick);
		},
	};
}

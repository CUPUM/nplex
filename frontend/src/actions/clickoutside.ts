/**
 * Directive to handle clicks outside host element.
 */
export function clickoutside(node: Node, options?: AddEventListenerOptions | boolean) {
	const handleClick = (click) => {
		if (node && !node.contains(click.target) && !click.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside'));
		}
	};

	document.addEventListener('click', handleClick, options);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		},
	};
}

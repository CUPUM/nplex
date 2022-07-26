/**
 * Directive pour gérer les clics en dehors d'un élément.
 */
export function clickoutside(node: Node) {
	const handleClick = (click) => {
		if (node && !node.contains(click.target) && !click.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside'));
		}
	};

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		},
	};
}

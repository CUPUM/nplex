export function portal(
	node: Node,
	{ target = document.body, anchor }: { target?: HTMLElement; anchor?: HTMLElement } = {}
) {
	if (anchor) {
		target.insertBefore(node, anchor);
	} else {
		target.appendChild(node);
	}
	return {
		destroy() {
			// target.removeChild(node);
		},
	};
}

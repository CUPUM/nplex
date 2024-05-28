export function portal(node: Node, { target = document.body }: { target: HTMLElement }) {
	target.appendChild(node);

	return {
		destroy() {
			target.removeChild(node);
		},
	};
}

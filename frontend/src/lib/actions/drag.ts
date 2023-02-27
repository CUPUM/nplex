interface DragOptions {
	disabled?: boolean;
	x?: boolean;
	y?: boolean;
	snapX?: number;
	snapY?: number;
}

type DragPosition = {
	x: number;
	y: number;
};

/**
 * Drag an element with optional snapping and axes.
 *
 * Emit event with movement since pointerdown.
 *
 * Should handle transform.
 */
export default function drag(
	element: HTMLElement,
	{ disabled = false }: DragOptions = {}
): SvelteActionReturnType {
	// let start:DragPosition = {
	// 	x: 0,
	// 	y: 0
	// }

	// Dispatch move distance for additional handling.
	// dispatchEvent()

	return {
		update(args) {
			if ('disabled' in args) {
				disabled = args.disabled;
			}
		},
		destroy() {},
	};
}

interface KeyIncrementOptions {}

/**
 * Handle more functionality for keyboard events and numeric inputs (number, range, data, etc).
 */
export default function keyIncrement(
	element: HTMLInputElement,
	{}: KeyIncrementOptions = {}
): SvelteActionReturnType {
	// function handleKey(e: KeyboardEvent) {
	// 	if (!focused) {
	// 		return;
	// 	}
	// 	const jump = e.shiftKey ? ($rangeMax - $rangeMin) / 10 : $step;
	// 	switch (e.key) {
	// 		case KEY.ArrowUp:
	// 		case KEY.ArrowRight:
	// 			value += jump;
	// 			break;
	// 		case KEY.ArrowDown:
	// 		case KEY.ArrowLeft:
	// 			value -= jump;
	// 			break;
	// 	}
	// }
	return {
		update(args) {},
		destroy() {},
	};
}

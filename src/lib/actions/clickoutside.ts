// const OUTSIDE_EVENT = {
// 	Click: 'clickoutside',
// 	MouseDown: 'mousedownoutside',
// 	MouseUp: 'mouseupoutside',
// 	PointerDown: 'pointerdownoutside',
// 	PouterUp: 'pointerupoutside',
// 	Tap: 'tapoutside',
// } as const;

// /**
//  * Directive to handle mouse/pointer events outside a target host element. The implementation also
//  * tracks both down and and up targets to properly resolve and exclude clicks or taps that begin
//  * inside the target. This is to say that clicks or taps need to have a full lifecycle (down and up)
//  * that occurs outside. Else you should use up events.
//  *
//  * If you are having trouble with this behavior, check the following potential conflicts:
//  *
//  * - Do you have `pointer-events: none` in some parent or target child css?
//  */
// export function outside(element: HTMLElement, options?: AddEventListenerOptions | boolean) {
// 	const mouseDownOutside = false;
// 	const pointerDownOutside = false;

// 	function handleDown(e: MouseEvent | PointerEvent) {}

// 	function handleUp(e: MouseEvent | PointerEvent) {}

// 	element.addEventListener('mousedown', handleDown, options);
// 	element.addEventListener('mouseup', handleUp, options);
// 	element.addEventListener('click', handleUp, options);
// 	element.addEventListener('pointerdown', handleDown, options);
// 	element.addEventListener('pointerup', handleUp, options);

// 	return {
// 		update(args) {
// 			// To do: update listener options
// 		},
// 		destroy() {
// 			// Remove listeners
// 		},
// 	} satisfies SvelteActionReturnType;
// }

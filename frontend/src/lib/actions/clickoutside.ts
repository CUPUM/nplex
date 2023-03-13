type ClickoutsideOptions = (AddEventListenerOptions & {}) | boolean;

const CLICKOUTSIDE_EVENT = 'clickoutside';

interface ClickoutsideEvent {
	target: HTMLElement;
	originalEvent: PointerEvent;
}

declare global {
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:clickoutside'?: (event: CustomEvent<ClickoutsideEvent>) => unknown;
		}
	}
}

/**
 * Directive to handle clicks outside a target host element. The behavior is implemented by tracking
 * both pointerdown and pointerup events rather than clicks to account for where the click begins
 * and exclude dragging gestures that end outside the target.
 *
 * If you are having trouble with this behavior, check the following potential conflicts:
 *
 * - Do you have `pointer-events: none` in some parent or target child css?
 */
export function clickoutside(element: HTMLElement, options?: ClickoutsideOptions) {
	let startOutside = false;

	function handleDown(e: PointerEvent) {
		if (e.target instanceof Node && !element.contains(e.target) && !e.defaultPrevented) {
			startOutside = true;
		}
	}

	function handleUp(e: PointerEvent) {
		if (!startOutside) {
			return;
		}
		if (e.target instanceof Node && !element.contains(e.target) && !e.defaultPrevented) {
			element.dispatchEvent(
				new CustomEvent(CLICKOUTSIDE_EVENT, {
					detail: { target: element, originalEvent: e } satisfies ClickoutsideEvent,
				})
			);
		}
		startOutside = false;
	}

	document.addEventListener('pointerdown', handleDown, options);
	document.addEventListener('pointerup', handleUp, options);

	return {
		destroy() {
			document.removeEventListener('pointerdown', handleDown);
			document.removeEventListener('pointerup', handleUp);
		},
	};
}

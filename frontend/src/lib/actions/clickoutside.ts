type ClickoutsideOptions = (AddEventListenerOptions & {}) | boolean;

const CLICKOUTSIDE_EVENT = 'clickoutside';

interface ClickoutsideEvent {
	target: HTMLElement;
	originalEvent: Event;
}

declare global {
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:clickoutside'?: (event: CustomEvent<ClickoutsideEvent>) => unknown;
		}
	}
}

/**
 * Directive to handle clicks outside host element.
 *
 * If you are having trouble with this behavior, check the following potential pain points:
 *
 * - Do you have `pointer-evetns: none` in some parent or target child css?
 */
export function clickoutside(element: HTMLElement, options?: ClickoutsideOptions) {
	function handleClick(e: Event) {
		if (!element.contains((e as any).target) && !e.defaultPrevented) {
			element.dispatchEvent(
				new CustomEvent(CLICKOUTSIDE_EVENT, {
					detail: { target: element, originalEvent: e } satisfies ClickoutsideEvent,
				})
			);
		}
	}

	document.addEventListener(CLICKOUTSIDE_EVENT, handleClick, options);

	return {
		destroy() {
			document.removeEventListener(CLICKOUTSIDE_EVENT, handleClick);
		},
	};
}

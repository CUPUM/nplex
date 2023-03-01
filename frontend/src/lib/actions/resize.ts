const RESIZE_EVENT = 'resize';

interface ResizeEvent {
	entry: ResizeObserverEntry;
}

declare global {
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:resize'?: (event: CustomEvent<ResizeEvent>) => unknown;
		}
	}
}

/**
 * Attach a Resize obsrver to an element. Useful for quick drop-in use when only one element should
 * be observed.
 */
export default function resize(element: HTMLElement): SvelteActionReturnType {
	function handleResize(entries: ResizeObserverEntry[]) {
		element.dispatchEvent(
			new CustomEvent(RESIZE_EVENT, { detail: { entry: entries[0] } satisfies ResizeEvent })
		);
	}

	const observer = new ResizeObserver(handleResize);
	observer.observe(element);

	return {
		update(args) {},
		destroy() {
			observer.unobserve(element);
			observer.disconnect();
		},
	};
}

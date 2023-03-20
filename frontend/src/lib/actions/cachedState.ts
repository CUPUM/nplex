import { tick } from 'svelte';

/**
 * Using on:load or on:error on cached (already loaded) ressources can lead to the state being
 * established before any listeners are bound to the element. This directive either emits the event
 * corresponding to the ressource's initial state or unset and resets the href to trigger the
 * expected events.
 */
export function cachedState(element: HTMLImageElement | SVGImageElement) {
	if (element instanceof HTMLImageElement && element.complete) {
		element.dispatchEvent(new Event('load'));
	}
	if (element instanceof SVGImageElement && element) {
		const href = element.getAttribute('href');
		if (href != null) {
			element.setAttribute('href', '');
			tick().then(() => {
				element.setAttribute('href', href);
			});
		}
	}
}

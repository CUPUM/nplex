import type { SvelteComponent } from 'svelte';
import { afterUpdate, bubble, current_component, listen, onDestroy } from 'svelte/internal';

const defaultEvents = [
	'focus',
	'blur',
	'fullscreenchange',
	'fullscreenerror',
	'scroll',
	'cut',
	'copy',
	'paste',
	'keydown',
	'keypress',
	'keyup',
	'auxclick',
	'click',
	'contextmenu',
	'dblclick',
	'mousedown',
	'mouseenter',
	'mouseleave',
	'mousemove',
	'mouseover',
	'mouseout',
	'mouseup',
	'pointerlockchange',
	'pointerlockerror',
	'select',
	'wheel',
	'drag',
	'dragend',
	'dragenter',
	'dragstart',
	'dragleave',
	'dragover',
	'drop',
	'touchcancel',
	'touchend',
	'touchmove',
	'touchstart',
	'pointerover',
	'pointerenter',
	'pointerdown',
	'pointermove',
	'pointerup',
	'pointercancel',
	'pointerout',
	'pointerleave',
	'gotpointercapture',
	'lostpointercapture',
] as const;

/**
 * Forward a DOM element's or a component's events.
 *
 * For more info, read: https://github.com/sveltejs/svelte/issues/2837.
 *
 * Credits to hperrin and dangreen.
 */
export function forwardEvents<T extends SvelteComponent | Element>(
	/**
	 * Getter to retrieve events' subject ref onMount.
	 */
	getRef: () => T,
	/**
	 * Additional custom events to forward.
	 */
	...additionalEvents: string[]
) {
	const events = [...defaultEvents, ...additionalEvents];
	const component = current_component;
	const destructors: (() => void)[] = [];
	let ref: SvelteComponent | Element;

	function forward(e: any /* Event | CustomEvent */) {
		bubble(component, e);
	}

	function init(newRef: typeof ref) {
		ref = newRef;
		if (ref instanceof Element) {
			events.forEach((event) => {
				destructors.push(listen(ref as Element, event, forward));
			});
		} else {
			events.forEach((event) => {
				destructors.push((ref as SvelteComponent).$on(event, forward));
			});
		}
	}

	function clear() {
		while (destructors.length) {
			(destructors.pop() as typeof destructors[number])();
		}
	}

	afterUpdate(() => {
		const newRef = getRef();
		if (newRef !== ref) {
			if (ref) clear();
			init(newRef);
		}
	});

	onDestroy(() => {
		clear();
	});
}

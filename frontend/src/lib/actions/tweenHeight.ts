import type { NonUndefinable } from '$types/utils';
import { debounce } from '$utils/modifiers';
import { cubicOut } from 'svelte/easing';
import { tweened } from 'svelte/motion';

function createGauge(host: HTMLElement) {
	const gauge = document.createElement('div');
	gauge.setAttribute('aria-hidden', 'true');
	gauge.style.position = 'absolute';
	gauge.style.top = '0';
	gauge.style.left = '0';
	gauge.style.height = '100%';
	gauge.style.width = '100%';
	gauge.style.pointerEvents = 'none';
	gauge.style.visibility = 'hidden';
	host.appendChild(gauge);
	return gauge;
}

type TweenedParameters = NonUndefinable<Parameters<typeof tweened<number>>[1]>;

interface TweenHeightOptions {
	duration?: TweenedParameters['duration'];
	easing?: TweenedParameters['easing'];
	delay?: TweenedParameters['delay'];
	overflow?: 'hidden' | 'vibisble';
}

export function tweenHeight(
	element: HTMLElement,
	{
		duration = (from, to) => {
			return 100 + Math.abs(to - from) * 0.25;
		},
		easing = cubicOut,
		delay = 0,
	}: TweenHeightOptions = {}
): SvelteActionReturnType {
	const style = getComputedStyle(element);
	if (style.position === 'static') {
		element.style.position = 'relative';
	}

	/**
	 * Tweened height.
	 */
	const minHeight = tweened(element.offsetHeight, { duration, easing, delay });
	const maxHeight = tweened(element.offsetHeight, { duration, easing, delay });
	minHeight.subscribe((min) => {
		// element.style.minHeight = min + 'px';
	});
	maxHeight.subscribe((max) => {
		element.style.maxHeight = max + 'px';
	});

	// let prevUpdateHeight = element.scrollHeight;

	// /**
	//  * React to DOM changes.
	//  */
	// beforeUpdate(async () => {
	// 	console.log('before!', element.scrollHeight);
	// 	prevUpdateHeight = element.scrollHeight;
	// });

	// afterUpdate(async () => {
	// 	console.log('after!', element.scrollHeight);
	// 	if (element.scrollHeight !== prevUpdateHeight) {
	// 		height.set(element.scrollHeight);
	// 	}
	// });

	/**
	 * Track mutations.
	 */
	let prevHeight = element.scrollHeight;
	const handleMutation = debounce(
		((entries) => {
			const target = entries[0].target;
			if (target instanceof HTMLElement) {
				if (target.scrollHeight > prevHeight) {
					maxHeight.set(target.scrollHeight).then(() => {
						minHeight.set(target.scrollHeight, { duration: 0 });
					});
				} else if (target.scrollHeight < prevHeight) {
					minHeight.set(target.scrollHeight).then(() => {
						maxHeight.set(target.scrollHeight, { duration: 0 });
					});
				}
			}
		}) satisfies MutationCallback,
		150
	);
	const mutationObserver = new MutationObserver(handleMutation);
	mutationObserver.observe(element, { subtree: true, childList: true });

	/**
	 * Track resize.
	 */
	let prevResizeHeight = element.scrollHeight;
	const handleResize = debounce(
		((entries) => {
			const target = entries[0].target;
			if (target instanceof HTMLElement) {
				// if (target.scrollHeight > prevResizeHeight) {
				// 	maxHeight.set(target.scrollHeight);
				// } else if (entries[0]) {
				// 	minHeight.set(target.scrollHeight);
				// }
			}
		}) satisfies ResizeObserverCallback,
		150
	);
	let observer = new ResizeObserver(handleResize);
	observer.observe(element);

	return {
		update(args) {},
		destroy() {},
	};
}

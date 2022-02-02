import type { Subscriber } from 'svelte/store';
import { readable } from 'svelte/store';
import { onMount } from 'svelte';
import OverlayScrollbars from 'overlayscrollbars';

type MainScroll = { y: number; delta: number; direction: 'up' | 'down' }

export const mainScroll = (function() {

	let instance: OverlayScrollbars;
	let prev: MainScroll = { y: 0, delta: 0, direction: null };

	function update(e, set: Subscriber<MainScroll>) {
		const delta = e.target.scrollTop - prev.y;
		const current: MainScroll = {
			y: e.target.scrollTop,
			delta,
			direction: prev.delta > 0 && delta > 0 ? 'down' : 'up'
		}
		prev = current;
		set(current);
	}

	function start(set?: Subscriber<MainScroll>) {
		onMount(() => {
			if (!instance) {
				instance = OverlayScrollbars(document.body, {
					scrollbars: {
						autoHide: 'move',
						autoHideDelay: 1000,
						clickScrolling: true,
					},
					overflowBehavior: {
						x: 'hidden'
					},
					sizeAutoCapable: false,
					nativeScrollbarsOverlaid: {
						initialize: false
					}
				});
			}
			if (set) {
				instance.options({
					callbacks: {
						onScroll: (e) => update(e, set)
					}
				})
			}
		});
	}

	const { subscribe } = readable<MainScroll>(prev, start);

	return {
		init: () => start(),
		subscribe,
		getInstance: () => instance
	}
})();
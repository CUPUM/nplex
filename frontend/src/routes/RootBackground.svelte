<!--
	@component
	# Root Background
	Singleton to control the app's root element background color property.

-->
<script lang="ts" context="module">
	import { intersection, INTERSECTION_EVENT } from '$actions/intersection';
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * Global store to allow bg-color transitions on the site's body.
	 */
	export const rootBackground = (function () {
		const root: HTMLElement | undefined = browser ? document.documentElement : undefined;
		const { subscribe, set, update } = writable<string>('');
		function _set(color: string, duration?: number) {
			set(color);
			if (root) {
				if (duration && !isNaN(duration)) {
					/**
					 * Handling cases where a custom duration is passed, making sure to unset the appended
					 * transition property after completion.
					 */
					function resetTransition(e: TransitionEvent) {
						if (root) {
							root.style.transition = '';
							root.removeEventListener('transitionend', resetTransition);
							root.removeEventListener('transitioncancel', resetTransition);
						}
					}
					root.style.transition = `background ${duration}ms ease-in-out`;
					root.addEventListener('transitionend', resetTransition);
					root.addEventListener('transitioncancel', resetTransition);
				}
				root.style.setProperty('--ui-bg', color || null);
			}
		}
		return {
			subscribe,
			reset: (duration?: number) => _set('', duration),
			set: (color: string, duration?: number) => _set(color, duration),
		};
	})();

	/**
	 * Action to update root background color based on element intersection.
	 */
	export function setRootBackground(
		element: HTMLElement,
		options: { color: string; observerOptions?: IntersectionObserverInit }
	): SvelteActionReturnType {
		const intersect = intersection(element, options.observerOptions);
		function handleEnter() {
			rootBackground.set(options.color);
		}
		function handleLeave() {
			rootBackground.reset();
		}
		element.addEventListener(INTERSECTION_EVENT.enter, handleEnter);
		element.addEventListener(INTERSECTION_EVENT.leave, handleLeave);
		return {
			update(newOptions) {
				if (newOptions.observerOptions) {
					intersect.update(newOptions.observerOptions);
				}
			},
			destroy() {
				intersect.destroy();
				handleLeave();
			},
		};
	}
</script>

<script lang="ts">
	/**
	 * Set a root background color encompassing this component instance's lifecycle.
	 */
	export let color: string;

	onMount(() => {
		rootBackground.set(color);
	});

	onDestroy(() => {
		rootBackground.reset();
	});
</script>

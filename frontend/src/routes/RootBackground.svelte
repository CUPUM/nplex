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

	type RootBackground = {
		body: string | null;
		overscroll: string | null;
	};
	const RESET: RootBackground = { body: null, overscroll: null };

	/**
	 * Global store to allow bg-color transitions on the site's body.
	 */
	export const rootBackground = (function () {
		const root = browser ? document.documentElement : undefined;
		const body = browser ? document.body : undefined;
		const { subscribe, set, update } = writable<typeof RESET>(RESET);

		let transitionTimer: any = undefined;
		let overscrollSynced = true;

		function resetTransition(e: TransitionEvent) {
			if (root) {
				root.style.transition = '';
			}
		}

		function _set(opts: Partial<typeof RESET> & { duration?: number }) {
			update((prev) => {
				const newBody = opts.body === undefined ? prev.body : opts.body;
				const newOverscroll =
					opts.overscroll === undefined
						? overscrollSynced
							? newBody
							: prev.overscroll
						: opts.overscroll;
				if (opts.overscroll) {
					overscrollSynced = false;
				} else if (newOverscroll === null && newBody === null) {
					overscrollSynced = true;
				}

				if (root) {
					if (opts.duration && !isNaN(opts.duration)) {
						/**
						 * Handling cases where a custom duration is passed, making sure to unset the appended
						 * transition property after completion.
						 */
						root.style.transition = `background ${opts.duration}ms ease-in-out`;
						clearTimeout(transitionTimer);
						transitionTimer = setTimeout(resetTransition, opts.duration);
					}
					root.style.setProperty('background', newOverscroll);
				}
				if (body) {
					body.style.setProperty('--ui-bg', newBody);
				}
				return { body: newBody, overscroll: newOverscroll };
			});
		}
		return {
			subscribe,
			reset: (duration?: number) => _set({ body: null, overscroll: null, duration }),
			resetOverscroll: (duration?: number) => _set({ overscroll: null, duration }),
			resetBody: (duration?: number) => _set({ body: null, duration }),
			set: _set,
		};
	})();

	/**
	 * Action to update root background color based on element intersection.
	 */
	export function setRootBackground(
		element: HTMLElement,
		options: Parameters<(typeof rootBackground)['set']>[0] & {
			observerOptions?: IntersectionObserverInit;
		}
	): SvelteActionReturnType {
		const { observerOptions, ...colorOptions } = options;
		const intersect = intersection(element, observerOptions);
		function handleEnter() {
			rootBackground.set(colorOptions);
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
	 * Set app background color encompassing this component instance's lifecycle.
	 */
	export let body: RootBackground['body'] | undefined = undefined;
	export let overscroll: RootBackground['overscroll'] | undefined = undefined;
	export let duration: number | undefined = undefined;

	onMount(() => {
		rootBackground.set({ body, overscroll, duration });
	});

	onDestroy(() => {
		rootBackground.reset(duration);
	});
</script>

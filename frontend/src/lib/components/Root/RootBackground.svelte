<!--
	@component
	# Root Background
	Singleton to control the app's root element background color property.
-->
<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	type RootBackground = {
		body?: string;
		overscroll?: string;
	};

	/**
	 * Global store to allow bg-color transitions on the site's body.
	 */
	export const rootBackground = (function () {
		const root = browser ? document.documentElement : undefined;
		const body = browser ? document.body : undefined;
		const { subscribe, set } = writable<RootBackground>({});
		let transitionTimer: any = undefined;
		const keepBody = new Map<any, string>();
		const keepOverscroll = new Map<any, string>();
		// const keepDuration = new Map<any, number>();
		function resetTransition(e: TransitionEvent) {
			if (root) {
				root.style.transition = '';
			}
		}
		function _set(opts: Partial<RootBackground> & { duration?: number }, key: any) {
			if (opts.body) {
				keepBody.set(key, opts.body);
			} else {
				keepBody.delete(key);
			}
			if (opts.overscroll) {
				keepOverscroll.set(key, opts.overscroll);
			} else {
				keepOverscroll.delete(key);
			}
			// if (opts.duration) {
			// 	keepDuration.set(key ?? defaultKey, opts.duration);
			// } else if (!keepOverscroll.has(key) && !keepBody.has(key)) {
			// 	keepDuration.delete(key);
			// }
			const newBody = keepBody.size ? [...keepBody][keepBody.size - 1][1] : undefined;
			const newOverscroll = keepOverscroll.size
				? [...keepOverscroll][keepOverscroll.size - 1][1]
				: newBody;
			if (root) {
				if (opts.duration) {
					root.style.transition = `background ${opts.duration}ms ease-in-out`;
					clearTimeout(transitionTimer);
					transitionTimer = setTimeout(resetTransition, opts.duration);
				}
				root.style.setProperty('background', newOverscroll ?? null);
			}
			if (body) {
				body.style.setProperty('--ui-bg', newBody ?? null);
			}
			set({ body: newBody, overscroll: newOverscroll });
		}
		return {
			subscribe,
			set: _set,
			reset: (key: any, duration?: number) => _set({ duration }, key),
		};
	})();

	/**
	 * Action to update root background color based on element intersection.
	 */
	export function setRootBackground(
		element: HTMLElement,
		opts: Parameters<(typeof rootBackground)['set']>[0] & IntersectionObserverInit
	) {
		let hasEnteredOnce = false;
		let observer: IntersectionObserver;
		const handleIntersection = ((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					hasEnteredOnce = true;
					rootBackground.set(
						{ body: opts.body, overscroll: opts.overscroll, duration: opts.duration },
						element
					);
				} else {
					if (hasEnteredOnce) {
						rootBackground.reset(element, opts.duration);
					}
				}
			});
		}) satisfies IntersectionObserverCallback;
		function initObserver() {
			observer = new IntersectionObserver(handleIntersection, {
				root: opts.root,
				rootMargin: opts.rootMargin ?? '-50% 0px 0% 0px',
				threshold: opts.threshold,
			});
			observer.observe(element);
		}
		initObserver();
		return {
			update(args) {
				opts = { ...opts, ...args };
			},
			destroy() {
				rootBackground.reset(element, opts.duration);
				if (observer) {
					observer.unobserve(element);
					observer.disconnect();
				}
			},
		} satisfies SvelteActionReturnType;
	}
</script>

<script lang="ts">
	/**
	 * Set app background color encompassing this component instance's lifecycle.
	 */
	export let body: RootBackground['body'] | undefined = undefined;
	export let overscroll: RootBackground['overscroll'] | undefined = undefined;
	export let duration: number | undefined = undefined;

	const key = {};

	onMount(() => {
		rootBackground.set({ body, overscroll, duration }, key);
	});

	onDestroy(() => {
		rootBackground.reset(key, duration);
	});
</script>

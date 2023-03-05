<!--
	@component
	# Drag and drop
	A functional component that provides a reactive site for list data binding.

-->
<script lang="ts">
	import { dragndrop, DRAGNDROP_EVENTS, type DragndropOptions } from '$actions/dragndrop';
	import type { AppCustomEvent } from '$types/utils';
	import { createEventDispatcher } from 'svelte';

	type D = $$Generic;

	interface DragndropState {
		key: string | number;
		disabled: boolean;
		grouped: boolean;
		dragging: boolean;
		targeting?: DragndropState;
		targetedBy: DragndropState[];
	}

	/**
	 * Source data used to derive a an items array with additional states.
	 */
	export let items: D[] = [];
	/**
	 * A getter to derive a unique key from each listed item.
	 */
	export let getKey: (data: D) => DragndropState['key'];

	const dispatch = createEventDispatcher();

	/**
	 * Linking data items, elements, and their drag-related states.
	 */
	let states: Record<DragndropState['key'], DragndropState> = {};

	interface DragndropItemOptions extends Omit<DragndropOptions, 'key'> {
		item: D;
	}

	function dragndropItem(element: HTMLElement, options: DragndropItemOptions) {
		const key = getKey(options.item);

		function updateBaseState(k: keyof typeof states, newOptions: DragndropItemOptions) {
			const prevState = states[k];
			states[k] = {
				key: k,
				disabled: newOptions.disabled ?? prevState?.disabled ?? false,
				grouped: newOptions.grouped ?? prevState?.grouped ?? false,
				dragging: prevState?.dragging ?? false,
				targeting: prevState?.targeting ?? undefined,
				targetedBy: prevState?.targetedBy ?? [],
			};
		}

		updateBaseState(key, options);

		/**
		 * Instance of the agnostic directive.
		 */
		const dnd = dragndrop(element, { key, ...options });

		/**
		 * Handling drag start (beyond threshold).
		 */
		function start() {
			states[key].dragging = true;
		}
		/**
		 * Handling dragend.
		 */
		function end() {
			if (states[key].dragging) {
				states[key].dragging = false;
			}
		}
		/**
		 * When the current element is being considered by a dragged element.
		 */
		function sort(e: Event) {
			if (e instanceof CustomEvent) {
				// console.log(e.detail.items);
				dispatch('sort', { items: (e as AppCustomEvent<'on:dnd.sort'>).detail.items });
			}
		}

		element.addEventListener(DRAGNDROP_EVENTS.Start, start);
		element.addEventListener(DRAGNDROP_EVENTS.End, end);
		element.addEventListener(DRAGNDROP_EVENTS.Sort, sort);

		return {
			update(args: DragndropItemOptions) {
				// console.log('Updating component directive...', args);
				// updateBaseState(key, args);
				dnd.update({ ...args, key });
			},
			destroy() {
				// console.log('Destroying component directive...');
				element.removeEventListener(DRAGNDROP_EVENTS.Start, start);
				element.removeEventListener(DRAGNDROP_EVENTS.End, end);
				element.removeEventListener(DRAGNDROP_EVENTS.Sort, sort);
			},
		} satisfies SvelteActionReturnType;
	}
</script>

<slot {states} {dragndropItem} />

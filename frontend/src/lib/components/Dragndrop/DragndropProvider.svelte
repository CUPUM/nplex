<!--
	@component
	# Dragndrop Context
	A functional component that exposes two directives through its slot props:
	- dragndropZone: Set the zone element.
	- dragndropItem: Set a dragndrop list item.
-->
<script lang="ts" context="module">
	const ATTRIBUTES = {
		ITEM_KEY: 'data-dnd-item-key',
		DRAGGABLE: 'data-dnd-draggable',
	};

	type DragndropGroupKey = string | {};

	/**
	 * Global map of elements and their related items. Allows for dragging across zones.
	 */
	const itemsRefs: Map<Element, unknown> = new Map();
</script>

<script lang="ts">
	import Sortable from 'sortablejs';
	import { createEventDispatcher } from 'svelte';

	type D = $$Generic;

	export let items: D[];
	export let group: Sortable.Options['group'] = undefined;
	export let sort: Sortable.Options['sort'] = true;
	export let delay: Sortable.Options['delay'] = 0;
	export let delayOnTouchOnly: Sortable.Options['delayOnTouchOnly'] = false;
	export let touchStartThreshold: Sortable.Options['touchStartThreshold'] = 0;
	export let disabled: Sortable.Options['disabled'] = false;
	export let animation: Sortable.Options['animation'] = 350;
	export let easing: Sortable.Options['easing'] = 'cubic-bezier(1, 0, 0, 1)';
	export let handle: Sortable.Options['handle'] = '';
	export let filter: Sortable.Options['filter'] = '';
	export let preventOnFilter: Sortable.Options['preventOnFilter'] = true;
	// export let draggable: Sortable.Options['draggable'] = ".item";
	// export let dataIdAttr: Sortable.Options['dataIdAttr'] = 'data-i';
	export let ghostClass: Sortable.Options['ghostClass'] = '';
	export let chosenClass: Sortable.Options['chosenClass'] = '';
	export let dragClass: Sortable.Options['dragClass'] = '';
	export let swapThreshold: Sortable.Options['swapThreshold'] = 1;
	export let invertSwap: Sortable.Options['invertSwap'] = false;
	export let invertedSwapThreshold: Sortable.Options['invertedSwapThreshold'] = 1;
	export let direction: Sortable.Options['direction'] = undefined;
	export let forceFallback: Sortable.Options['forceFallback'] = true;
	export let fallbackClass: Sortable.Options['fallbackClass'] = '';
	export let fallbackOnBody: Sortable.Options['fallbackOnBody'] = true;
	export let fallbackTolerance: Sortable.Options['fallbackTolerance'] = 0;
	export let dragoverBubble: Sortable.Options['dragoverBubble'] = false;
	export let removeCloneOnHide: Sortable.Options['removeCloneOnHide'] = true;
	export let emptyInsertThreshold: Sortable.Options['emptyInsertThreshold'] = 5;

	const dispatch = createEventDispatcher<{
		sort: { target: HTMLElement; items: D[] };
	}>();

	let sortable: Sortable;

	function dragndropZone(element: HTMLElement) {
		sortable = new Sortable(element, {
			dataIdAttr: ATTRIBUTES.ITEM_KEY,
			draggable: `[${ATTRIBUTES.DRAGGABLE}]`,
			scrollSensitivity: 100,
			scrollSpeed: 16,
			scroll: true,
			bubbleScroll: true,
			group,
			sort,
			delay,
			delayOnTouchOnly,
			touchStartThreshold,
			disabled,
			animation,
			easing,
			handle,
			filter,
			preventOnFilter,
			ghostClass,
			chosenClass,
			dragClass,
			swapThreshold,
			invertSwap,
			invertedSwapThreshold,
			direction,
			forceFallback,
			fallbackClass,
			fallbackOnBody,
			fallbackTolerance,
			dragoverBubble,
			removeCloneOnHide,
			emptyInsertThreshold,
			// scrollFn(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) {},
			onSort(e) {
				items = [...sortable.el.children].reduce((acc, curr) => {
					const item = itemsRefs.get(curr);
					if (item) {
						acc.push(item as D);
					}
					return acc;
				}, <D[]>[]);
				dispatch('sort', { items, target: sortable.el! });
			},
			onChoose(e) {
				// console.log(e);
			},
			onUnchoose(e) {
				// console.log(e);
			},
			onChange(e) {
				// console.log(e);
			},
		});
	}

	function dragndropItem(
		element: HTMLElement,
		{ item, disabled = false }: { item: D; disabled?: boolean }
	) {
		if (!disabled) {
			element.setAttribute(ATTRIBUTES.DRAGGABLE, '');
		}
		itemsRefs.set(element, item);
		return {
			update(args) {
				if (args.disabled) {
					element.removeAttribute(ATTRIBUTES.DRAGGABLE);
				}
			},
			destroy() {
				itemsRefs.delete(element);
			},
		} satisfies SvelteActionReturnType;
	}
</script>

<slot {dragndropZone} {dragndropItem} />

<style lang="scss">
	:global([data-dnd-draggable]) {
		cursor: pointer;
	}
</style>

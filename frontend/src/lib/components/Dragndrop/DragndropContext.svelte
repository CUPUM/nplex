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
</script>

<script lang="ts">
	import Sortable from 'sortablejs';
	import { createEventDispatcher } from 'svelte';

	type D = $$Generic;

	export let items: D[];
	export let group: Sortable.Options['group'] = 'name';
	export let sort: Sortable.Options['sort'] = true;
	export let delay: Sortable.Options['delay'] = 0;
	export let delayOnTouchOnly: Sortable.Options['delayOnTouchOnly'] = false;
	export let touchStartThreshold: Sortable.Options['touchStartThreshold'] = 0;
	export let disabled: Sortable.Options['disabled'] = false;
	export let animation: Sortable.Options['animation'] = 250;
	export let easing: Sortable.Options['easing'] = 'cubic-bezie(1, 0, 0, 1)';
	export let handle: Sortable.Options['handle'] = '.m-handle';
	export let filter: Sortable.Options['filter'] = '.ignor-elements';
	export let preventOnFilter: Sortable.Options['preventOnFilter'] = true;
	// export let draggable: Sortable.Options['draggable'] = ".item";
	// export let dataIdAttr: Sortable.Options['dataIdAttr'] = 'data-i';
	export let ghostClass: Sortable.Options['ghostClass'] = 'sortable-ghost';
	export let chosenClass: Sortable.Options['chosenClass'] = 'sortable-chosen';
	export let dragClass: Sortable.Options['dragClass'] = 'sortable-drag';
	export let swapThreshold: Sortable.Options['swapThreshold'] = 1;
	export let invertSwap: Sortable.Options['invertSwap'] = false;
	export let invertedSwapThreshold: Sortable.Options['invertedSwapThreshold'] = 1;
	export let direction: Sortable.Options['direction'] = 'horizontal';
	export let forceFallback: Sortable.Options['forceFallback'] = true;
	export let fallbackClass: Sortable.Options['fallbackClass'] = 'sortable-fallback';
	export let fallbackOnBody: Sortable.Options['fallbackOnBody'] = false;
	export let fallbackTolerance: Sortable.Options['fallbackTolerance'] = 0;
	export let dragoverBubble: Sortable.Options['dragoverBubble'] = false;
	export let removeCloneOnHide: Sortable.Options['removeCloneOnHide'] = true;
	export let emptyInsertThreshold: Sortable.Options['emptyInsertThreshold'] = 5;

	let sortable: Sortable;

	const itemRefs: Map<Element, D> = new Map();

	const dispatch = createEventDispatcher<{
		sort: { target: HTMLElement; items: D[] };
	}>();

	function dragndropZone(element: HTMLElement) {
		sortable = new Sortable(element, {
			dataIdAttr: ATTRIBUTES.ITEM_KEY,
			draggable: `[${ATTRIBUTES.DRAGGABLE}]`,
			scrollSensitivity: 100,
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
			scrollFn(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) {},
			onSort(e) {
				items = [...sortable.el.children].reduce((acc, curr) => {
					const item = itemRefs.get(curr);
					if (item) {
						acc.push(item);
					}
					return acc;
				}, <D[]>[]);
				console.log(items);
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
		itemRefs.set(element, item);
		return {
			update(args) {
				if (args.disabled) {
					element.removeAttribute(ATTRIBUTES.DRAGGABLE);
				}
			},
			destroy() {
				itemRefs.delete(element);
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

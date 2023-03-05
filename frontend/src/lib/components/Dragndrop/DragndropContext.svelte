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

	type D = $$Generic;

	export let items: D[];

	let itemRefs: Map<Element, D> = new Map();

	let sortable: Sortable;

	function dragndropZone(element: HTMLElement) {
		sortable = new Sortable(element, {
			dataIdAttr: ATTRIBUTES.ITEM_KEY,
			draggable: `[${ATTRIBUTES.DRAGGABLE}]`,
			animation: 200,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			forceFallback: true,
			onSort(e) {
				items = [...sortable.el.children].reduce((acc, curr) => {
					const item = itemRefs.get(curr);
					if (item) {
						acc.push(item);
					}
					return acc;
				}, <D[]>[]);
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

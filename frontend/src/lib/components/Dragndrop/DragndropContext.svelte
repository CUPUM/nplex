<script lang="ts" context="module">
	const ITEM_ID_ATTR = 'data-dnd-item-id';

	const ITEM_CLASS = {
		DRAGGABLE: 'dnd-draggable',
	};
</script>

<script lang="ts">
	import Sortable from 'sortablejs';

	type D = $$Generic;

	export let items: D[];
	export let getKey: (item: D) => string;

	let sortItems = new Map(items.map((d) => [getKey(d), d]));

	function syncDown() {
		sortItems = new Map(items.map((d) => [getKey(d), d]));
	}
	$: items, syncDown();

	let sortable: Sortable;

	function dragndropZone(element: HTMLElement) {
		sortable = new Sortable(element, {
			dataIdAttr: ITEM_ID_ATTR,
			draggable: `.${ITEM_CLASS.DRAGGABLE}`,
			animation: 200,
			easing: 'cubic-bezier(.8, 0, .2, 1)',
			onSort(e) {
				items = [...sortable.toArray().map((k) => sortItems.get(k)!)];
			},
			onChange(e) {
				// console.log(e);
			},
		});
	}

	function dragndropItem(element: HTMLElement, { item }: { item: D }) {
		element.setAttribute(ITEM_ID_ATTR, getKey(item));
		element.classList.add(ITEM_CLASS.DRAGGABLE);
		return {
			update(args) {},
			destroy() {},
		} satisfies SvelteActionReturnType;
	}
</script>

<slot {dragndropZone} {dragndropItem} />

<style lang="scss">
</style>

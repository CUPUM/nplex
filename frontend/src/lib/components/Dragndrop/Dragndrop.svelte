<!--
	@component
	# Drag and drop
	A functional component that provides a reactive site for list data binding.

-->
<script lang="ts" context="module">
	interface DragndropItem<T> {
		dragging: boolean;
		considering: boolean;
		targeted: boolean;
		draggable: boolean;
		datum: T;
	}
</script>

<script lang="ts">
	import { dragndrop, type DragndropOptions } from '$actions/dragndrop';

	type D = $$Generic;

	export let data: D[];

	let items: DragndropItem<D>[];

	let refs = new Set<HTMLElement>();

	$: items = data.map((datum) => {
		return {
			datum,
			dragging: false,
			considering: false,
			targeted: false,
			draggable: true,
		};
	});

	interface DragndropItemOptions extends DragndropOptions {}

	function dragndropItem(element: HTMLElement, { disabled = false }: DragndropItemOptions = {}) {
		refs.add(element);
		const dnd = dragndrop(element, { disabled });

		return {
			update(args) {
				dnd.update(args);
			},
			destroy() {
				refs.delete(element);
			},
		} satisfies SvelteActionReturnType;
	}
</script>

<slot {items} {dragndropItem} />

<style lang="scss">
</style>

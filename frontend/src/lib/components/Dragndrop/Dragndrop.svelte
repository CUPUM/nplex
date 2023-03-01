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
	export let data: D[];

	type D = $$Generic;

	let items: DragndropItem<D>[];

	$: items = data.map((datum) => {
		return {
			datum,
			dragging: false,
			considering: false,
			targeted: false,
			draggable: true,
		};
	});

	function dnditem(element: HTMLElement): SvelteActionReturnType {
		return {
			update(args) {},
			destroy() {},
		};
	}
</script>

<slot {items} {dnditem} />

<style lang="scss">
</style>

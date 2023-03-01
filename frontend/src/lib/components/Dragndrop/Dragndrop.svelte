<!--
	@component
	# Drag and drop
	A functional component that provides a reactive site for list data binding.

-->
<script lang="ts">
	export let data: D[];

	type D = $$Generic;

	function dragndrop() {}
</script>

<slot {data} />

<style lang="scss">
</style>

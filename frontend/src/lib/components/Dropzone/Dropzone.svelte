<!--
	@component
	# Dropzone
	A simple functional component providing a slotted directive to handle local file drag/drop states and events.
	
-->
<script lang="ts">
	export let filecount = 0;

	function dropzone(element: HTMLElement) {
		function handleDrop(e: DragEvent) {
			console.log(e);
		}

		element.addEventListener('drop', handleDrop);
	}
</script>

<slot />

<style lang="scss">
</style>

<script lang="ts" context="module">
</script>

<script lang="ts">
	import Popover from './Popover.svelte';

	export let opened: boolean = false;

	function open() {
		opened = true;
	}

	function close() {
		opened = false;
	}
</script>

<Popover bind:opened>
	<slot name="field" />
</Popover>

<style lang="scss">
</style>

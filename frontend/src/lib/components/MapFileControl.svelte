<!--
	@component
	## Map File Control
	A custom Maplibre control to handle opening and displaying data from local file(s) uploaded by users.

 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from './Button.svelte';
	import { getMapContext } from './Map.svelte';

	export let name: string | undefined = undefined;

	const mapContext = getMapContext();
</script>

<Button as="label">
	Upload your file
	<input hidden type="file" name="" />
</Button>

<!-- Template here -->
<style lang="scss">
</style>

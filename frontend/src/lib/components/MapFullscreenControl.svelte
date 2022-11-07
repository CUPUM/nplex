<!--
	@component
	## Map Fullscreen Control
	
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { FullscreenControl } from 'maplibre-gl';
	import { getMapContext } from './Map.svelte';

	const mapContext = getMapContext();
	const control = new FullscreenControl();

	mapContext.getMap()?.addControl(control);
</script>

<!-- Template here -->
<style lang="scss">
</style>

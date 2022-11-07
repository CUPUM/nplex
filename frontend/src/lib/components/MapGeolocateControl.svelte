<!--@component
	Simple button-wrapper component to add geolocation control to the parent map.
	For implementation inspo, see maplibre/mapbox control workflow: https://maplibre.org/maplibre-gl-js-docs/api/markers/

-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { GeolocateControl } from 'maplibre-gl';
	import { getMapContext } from './Map.svelte';

	const mapContext = getMapContext();
	const control = new GeolocateControl();

	mapContext.getMap()?.addControl(control);
</script>

<style lang="scss">
</style>

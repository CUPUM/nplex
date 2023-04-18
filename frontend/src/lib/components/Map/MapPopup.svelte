<!--
	@component
	## Map Popup (keeping the nomenclature used by Mapbox / Maplibre)
	Primitive component facilitating the addition of tooltip or popover-like content to the map.
	Can be used as standalone or slotted / contextualized inside a MapMarker.
-->
<script lang="ts" context="module">
	const [getMapPopupContext, setMapPopupContext] = defineContext<{}>('map-popup-context');
	export { getMapPopupContext };
</script>

<script lang="ts">
	import { defineContext } from '$utils/context';
	import type { LngLat, LngLatLike } from 'maplibre-gl';
	import { onDestroy, onMount } from 'svelte';
	import { getMapContext } from './Map.svelte';
	import { getMapMarkerContext } from './MapMarker.svelte';

	export let latlng: LngLat | LngLatLike | undefined = undefined;

	let popupRef: HTMLElement;

	const { getMap } = getMapContext();
	const markerContext = getMapMarkerContext();

	onMount(() => {
		if (markerContext?.getMapMarker != null) {
			const marker = markerContext.getMapMarker();
		}
	});

	onDestroy(() => {});
</script>

<div class="map-popup" bind:this={popupRef}>
	<slot>Popup content</slot>
</div>

<style lang="scss">
	.map-popup {
	}
</style>

<!--
	@component
	A common map marker, needs to be nested within a MapLayer? (to determine).
-->
<script lang="ts" context="module">
	const [getMapMarkerContext, setMapMarkerContext] = defineContext<{
		getMapMarker: () => Marker;
	}>('map-marker-context');
	export { getMapMarkerContext };
</script>

<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { defineContext } from '$utils/context';
	import { Marker, Popup, type LngLat, type LngLatLike, type MarkerOptions } from 'maplibre-gl';
	import { onDestroy, onMount, type ComponentProps } from 'svelte';
	import { getMapContext } from './Map.svelte';

	export let lnglat: LngLat | LngLatLike;
	export let size: string = '2rem';
	export let icon: ComponentProps<Icon>['name'] = 'pin';
	export let style: string | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };
	export let anchor: MarkerOptions['anchor'] = 'bottom';
	export let offset: MarkerOptions['offset'] = undefined;
	export let draggable: MarkerOptions['draggable'] = false;
	export let clickTolerance: MarkerOptions['clickTolerance'] = 0;
	export let rotation: MarkerOptions['rotation'] = 0;
	export let pitchAlignment: MarkerOptions['pitchAlignment'] = 'auto';
	export let rotationAlignment: MarkerOptions['rotationAlignment'] = 'auto';

	let markerRef: HTMLElement;
	let marker: Marker;

	const { getMap } = getMapContext();

	$: marker?.setLngLat(lnglat);
	$: marker?.setDraggable(draggable ?? false);

	onMount(() => {
		marker = new Marker({
			element: markerRef,
			anchor,
			offset,
			draggable,
			clickTolerance,
			rotation,
			rotationAlignment,
			pitchAlignment,
		}).setLngLat(lnglat);
		const map = getMap();
		marker.setPopup(new Popup({}));
		if (map) {
			marker.addTo(map);
		} else {
			throw new Error('No map context found for marker.');
		}
	});

	function getMapMarker() {
		return marker;
	}

	setMapMarkerContext({ getMapMarker });

	onDestroy(() => {
		marker.remove();
	});
</script>

<figure class="map-marker {className}" bind:this={markerRef} {style} style:font-size={size}>
	{#if marker}
		<slot {marker}>
			<Icon name={icon} strokeWidth={1.5} />
		</slot>
	{/if}
</figure>
<slot name="popup" {marker} />

<style lang="scss">
	.map-marker {
		// position: absolute;
		// display: flex;
		overflow: visible;
	}
</style>

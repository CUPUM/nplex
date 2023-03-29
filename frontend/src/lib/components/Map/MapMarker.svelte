<!--
	@component
	A common map marker, needs to be nested within a MapLayer? (to determine).
-->
<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { Marker, type LngLat, type LngLatLike } from 'maplibre-gl';
	import { onMount, type ComponentProps } from 'svelte';
	import { getMapContext } from './Map.svelte';

	export let lnglat: LngLat | LngLatLike;
	// export let radius: number;
	export let icon: ComponentProps<Icon>['name'] = 'pin';
	export let style: string | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };

	let markerRef: HTMLElement;
	let marker;

	const { getMap } = getMapContext();

	onMount(() => {
		marker = new Marker(markerRef).setLngLat(lnglat);
		const map = getMap();
		if (map) {
			marker.addTo(map);
		} else {
			console.error('No map context found for marker.');
		}
	});
</script>

<figure class="map-marker {className}" bind:this={markerRef} {style}>
	<Icon name={icon} strokeWidth={1.5} />
</figure>

<style lang="scss">
	.map-marker {
		font-size: var(--ui-text-xl);
		display: inline-flex;
	}
</style>

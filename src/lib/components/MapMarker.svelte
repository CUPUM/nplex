<!--
	@component
	A common map marker, needs to be nested within a MapLayer? (to determine).
-->
<script lang="ts" context="module">
	const [getMapMarkerContext, setMapMarkerContext] = defineContext<{
		getMapMarker: () => Marker;
		lnglat: Readable<LngLat | LngLatLike>;
	}>('map-marker-context');
	export { getMapMarkerContext };
</script>

<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { springOut } from '$motion/easing/spring';
	import type { NonUndefinable } from '$types/utils';
	import { defineContext } from '$utils/context';
	import { Marker, type LngLat, type LngLatLike, type MarkerOptions } from 'maplibre-gl';
	import { createEventDispatcher, onDestroy, onMount, type ComponentProps } from 'svelte';
	import { expoIn } from 'svelte/easing';
	import { readonly, writable, type Readable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import { getMapContext } from './Map.svelte';

	export let lnglat: LngLat | LngLatLike;
	export let size: string = '2rem';
	export let icon: ComponentProps<Icon>['name'] = 'pin';
	export let anchor: MarkerOptions['anchor'] = 'bottom';
	export let offset: MarkerOptions['offset'] = undefined;
	export let draggable: NonUndefinable<MarkerOptions['draggable']> = false;
	export let clickTolerance: MarkerOptions['clickTolerance'] = 1;
	export let rotation: MarkerOptions['rotation'] = 0;
	export let pitchAlignment: MarkerOptions['pitchAlignment'] = 'auto';
	export let rotationAlignment: MarkerOptions['rotationAlignment'] = 'auto';

	let markerRef: HTMLElement;
	let marker: Marker;

	const { getMap } = getMapContext();
	const dispatch = createEventDispatcher();
	const _lnglat = writable<typeof lnglat>(lnglat);
	$: _lnglat.set(lnglat);

	$: marker?.setLngLat(lnglat);
	$: marker?.setDraggable(draggable);
	$: if (offset != null) marker?.setOffset(offset);
	$: if (pitchAlignment != null) marker?.setPitchAlignment(pitchAlignment);
	$: if (rotation != null) marker?.setRotation(rotation);
	$: if (rotationAlignment != null) marker?.setRotationAlignment(rotationAlignment);

	onMount(() => {
		const map = getMap();
		marker = new Marker({
			element: markerRef,
			anchor,
			offset,
			draggable,
			clickTolerance,
			rotation,
			rotationAlignment,
			pitchAlignment,
		})
			.setLngLat(lnglat)
			.addTo(map);

		marker.on('drag', (e: Record<string, unknown>) => {
			if ('target' in e && e.target instanceof Marker) {
				lnglat = e.target.getLngLat();
			}
		});

		marker.on('click', (e) => {
			dispatch('click', e);
		});
	});

	function getMapMarker() {
		return marker;
	}

	setMapMarkerContext({
		getMapMarker,
		lnglat: readonly(_lnglat),
	});

	onDestroy(() => {
		marker.remove();
	});
</script>

<figure class="map-marker" bind:this={markerRef} style:transform-origin={anchor?.replace('-', ' ')}>
	{#if $$slots.default}
		<slot />
	{:else}
		<div
			class="map-marker-default"
			style:font-size={size}
			in:scale={{ start: 0.75, opacity: 1, duration: 150, easing: springOut }}
			out:scale={{ start: 0.9, opacity: 0, duration: 100, easing: expoIn }}
		>
			<Icon class="map-marker-icon" name={icon} strokeWidth={1.5} />
		</div>
	{/if}
</figure>
<slot name="popup" {marker} />

<style lang="scss">
	.map-marker {
		position: absolute;
		padding: 0;
		margin: 0;
		height: auto;
		display: flex;

		&:hover {
			z-index: 100;
		}
	}

	.map-marker-default {
		position: relative;

		:global(.map-marker-icon) {
			padding: 0;
			margin: -0.1em; // Removing the svg path's margin.
		}
	}
</style>

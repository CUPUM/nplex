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
	import Tip from '$components/Tip.svelte';
	import { defineContext } from '$utils/context';
	import { col } from '$utils/css';
	import {
		Marker,
		type LngLat,
		type LngLatLike,
		type MarkerOptions,
		type PopupOptions,
	} from 'maplibre-gl';
	import { onDestroy, onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { getMapContext } from './Map.svelte';
	import { getMapMarkerContext } from './MapMarker.svelte';

	export let lnglat: LngLat | LngLatLike | undefined = undefined;
	export let offset: MarkerOptions['offset'] = undefined;
	export let anchor: Extract<
		PopupOptions['anchor'],
		'bottom' | 'top' | 'left' | 'right' | 'center'
	> = 'bottom';
	export let background: string = col('bg', 100);

	const { getMap } = getMapContext();
	const { getMapMarker, lnglat: markerLnglat } = getMapMarkerContext() ?? {};

	let popupRef: HTMLElement;
	let popupMarker: Marker;

	$: computedLnglat = lnglat ?? $markerLnglat;

	$: if (popupMarker && computedLnglat) {
		popupMarker.setLngLat(computedLnglat);
	}

	onMount(() => {
		popupMarker = new Marker({ element: popupRef, anchor, offset })
			.setLngLat(computedLnglat)
			.addTo(getMap());
	});

	onDestroy(() => {
		popupMarker.remove();
	});
</script>

<div class="map-popup-container" bind:this={popupRef}>
	<div
		class="map-popup {anchor}"
		style:--map-popup-background={background}
		on:clickoutside
		transition:scale|local={{ duration: 250, start: 0.9, opacity: 0, easing: expoOut }}
	>
		<div class="map-popup-content">
			<slot>Popup content</slot>
		</div>
		{#if anchor !== 'center'}
			<Tip class="map-popup-tip" />
		{/if}
	</div>
</div>

<style lang="scss">
	@mixin map-popup-tip {
		:global(.map-popup-tip) {
			@content;
		}
	}

	.map-popup-container {
		position: absolute;
		z-index: 999;
	}

	.map-popup {
		display: flex;
		gap: 0;
		font-size: 1rem;
		align-items: center;

		@include map-popup-tip {
			z-index: 1;
			position: relative;
			color: var(--map-popup-background);
		}

		&.center {
			transform-origin: center;
		}

		&.top {
			flex-direction: column-reverse;
			transform-origin: top;
			@include map-popup-tip {
				rotate: 180deg;
			}
		}

		&.right {
			flex-direction: row;
			transform-origin: right;
			@include map-popup-tip {
				rotate: -90deg;
			}
		}

		&.bottom {
			flex-direction: column;
			transform-origin: bottom;
			@include map-popup-tip {
			}
		}

		&.left {
			flex-direction: row-reverse;
			transform-origin: left;
			@include map-popup-tip {
				rotate: 90deg;
			}
		}
	}

	.map-popup-content {
		border-radius: var(--ui-radius-lg);
		background: var(--map-popup-background);
		box-shadow: var(--ui-shadow-md);
	}
</style>

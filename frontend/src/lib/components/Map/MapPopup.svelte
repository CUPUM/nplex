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
	import { springOut } from '$motion/easing/spring';
	import { defineContext } from '$utils/context';
	import {
		Marker,
		type LngLat,
		type LngLatLike,
		type MarkerOptions,
		type PopupOptions,
	} from 'maplibre-gl';
	import { onDestroy, onMount } from 'svelte';
	import { expoIn } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { getMapContext } from './Map.svelte';
	import { getMapMarkerContext } from './MapMarker.svelte';

	export let lnglat: LngLat | LngLatLike | undefined = undefined;
	export let offset: MarkerOptions['offset'] = undefined;
	export let anchor: Extract<
		PopupOptions['anchor'],
		'bottom' | 'top' | 'left' | 'right' | 'center'
	> = 'bottom';

	const { getMap } = getMapContext();
	const { getMapMarker, lnglat: markerLnglat } = getMapMarkerContext() ?? {};

	$: computedLnglat = lnglat ?? $markerLnglat;

	let popupRef: HTMLElement;
	let popupMarker: Marker;

	// function open(e: Event) {
	// 	opened = true;
	// }

	// function close(e: Event) {
	// 	opened = false;
	// }

	// function toggle(e: Event) {
	// 	opened ? close(e) : open(e);
	// }

	// function handleClickoutside(e: Event) {
	// 	if (closeOnClickoutside) {
	// 		close(e);
	// 	}
	// }

	// function handleMove(e: Event) {
	// 	if (closeOnMove) {
	// 		close(e);
	// 	}
	// }

	$: if (popupMarker && computedLnglat) {
		popupMarker.setLngLat(computedLnglat);
	}

	onMount(() => {
		popupMarker = new Marker({ element: popupRef, anchor, offset })
			.setLngLat(computedLnglat)
			.addTo(getMap());
		// getMap()?.on('move', handleMove);
	});

	onDestroy(() => {
		// getMap()?.off('move', handleMove);
		popupMarker.remove();
	});
</script>

<div class="map-popup-container" bind:this={popupRef}>
	<div
		class="map-popup {anchor}"
		on:clickoutside
		in:scale={{ start: 0.75, opacity: 1, duration: 100, easing: springOut }}
		out:scale={{ start: 1, opacity: 0, duration: 100, easing: expoIn }}
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
	}

	.map-popup {
		--map-popup-background: #{col(bg, 900)};
		display: flex;
		gap: 0;
		font-size: 1rem;
		align-items: center;

		@include map-popup-tip {
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
		padding: 2rem;
	}
</style>

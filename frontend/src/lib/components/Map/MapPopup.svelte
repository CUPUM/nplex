<!--
	@component
	## Map Popup (sic, keeping the nomenclature used by Mapbox / Maplibre)
	Primitive component facilitating the addition of tooltip or popover-like content to the map.
	Content is reactively positioned according to passed coordinates.
	This makes it possible to either anchor the tooltip at a static location or move it around (ex.: follow the user's pointer).
	By default, if no coordinates are passed through props, the popup will follow the pointer.

-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import {
		Marker,
		type LngLat,
		type LngLatLike,
		type PointLike,
		type PositionAnchor,
	} from 'maplibre-gl';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { getMapContext } from './Map/Map.svelte';

	export let lnglat: LngLat | LngLatLike;
	export let anchor: PositionAnchor = 'bottom';
	export let offset: PointLike | undefined = undefined;
	export let color: string | undefined = undefined;
	let scale_: number | undefined = undefined;
	export { scale_ as scale };
	export let draggable: boolean | undefined = undefined;
	export let clickTolerance: number | undefined = undefined;
	export let rotation: number | undefined = undefined;
	export let rotationAlignment: string | undefined = undefined;
	export let pitchAlignment: string | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	let tooltipRef: HTMLElement;
	let tooltipMarker: Marker;

	const mapContext = getMapContext();
	const map = mapContext?.getMap();

	function setPosition(coords: LngLat | LngLatLike) {
		requestAnimationFrame(() => {
			if (!map || !coords) return;
			tooltipMarker?.setLngLat({ ...coords });
			tooltipMarker?.addTo(map);
		});
	}

	$: setPosition(lnglat);

	onMount(() => {
		if (map) {
			tooltipMarker = new Marker({
				element: tooltipRef,
				anchor,
				offset,
				color,
				scale: scale_,
				draggable,
				clickTolerance,
				rotation,
				rotationAlignment,
				pitchAlignment,
			});
			setPosition(lnglat);
		}
	});
</script>

<div bind:this={tooltipRef}>
	<div
		in:scale={{ start: 0.85, duration: 250 }}
		out:scale={{ start: 0.9, duration: 150, delay: 500 }}
		class="map-tooltip {anchor} {className}"
		{style}
		on:click
		on:mouseover
		on:mousedown
		on:dblclick
		on:mouseleave
		on:mouseenter
		on:keypress
		on:keydown
		on:keyup
		on:focus
		on:blur
	>
		<slot {lnglat} />
	</div>
</div>

<style lang="scss">
	:where(.map-tooltip) {
		transform-style: preserve-3d;
		transform-origin: center;
	}
	.top {
		transform-origin: top center;
	}
	.bottom {
		transform-origin: bottom center;
	}
	.left {
		transform-origin: center left;
	}
	.right {
		transform-origin: center right;
	}
	.top-left {
		transform-origin: top left;
	}
	.top-right {
		transform-origin: top right;
	}
	.bottom-left {
		transform-origin: bottom left;
	}
	.bottom-right {
		transform-origin: bottom right;
	}
</style>

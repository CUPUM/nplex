<!--
	@component
	## Map
	Generic map primitive component to instanciate a MapLibre context and map.
-->
<svelte:options accessors />

<script lang="ts" context="module">
	const MAP_OVERLAY_AREAS = [
		'top-left',
		'top',
		'top-right',
		'left',
		'center',
		'right',
		'bottom-left',
		'bottom',
		'bottom-right',
	] as const;

	interface MapContext {
		cursor: Writable<Cursor | null>;
		getMap: () => Map;
		getDraw: () => MapboxDraw | undefined;
		drawMode: Readable<MapDrawMode | undefined>;
		drawChangeMode: (mode: MapDrawMode, opts?: any) => void | undefined;
	}

	const [getMapContext, setMapContext] = defineContext<MapContext>('map-context');
	export { getMapContext };
</script>

<script lang="ts">
	import resize from '$actions/resize';
	import { browser } from '$app/environment';
	import Loading from '$components/Loading.svelte';
	import { defineContext } from '$utils/context';
	import { MAP_DRAW_EVENTS, type Cursor, type MapDrawMode } from '$utils/enums';
	import { LOCATIONS } from '$utils/map/locations';
	import light from '$utils/map/styles/light';
	import { MAP_GESTURES_TEXT, MAP_LOCALES, type MapLocale } from '$utils/map/ui';
	import { debounce } from '$utils/modifiers';
	import type { DrawModeChangeEvent } from '@mapbox/mapbox-gl-draw';
	import { Map, type MapEventType, type MapOptions } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { writable, type Readable, type Writable } from 'svelte/store';

	export let map: Map | undefined = undefined;
	export let mapStyle: MapOptions['style'] = light;
	export let id: string | undefined = undefined;
	export let interactive: MapOptions['interactive'] = true;
	export let bearingSnap: MapOptions['bearingSnap'] = undefined;
	export let attributionControl: MapOptions['attributionControl'] = undefined;
	export let customAttribution: MapOptions['customAttribution'] = undefined;
	export let preserveDrawingBuffer: MapOptions['preserveDrawingBuffer'] = true;
	export let antialias: MapOptions['antialias'] = false;
	export let refreshExpiredTiles: MapOptions['refreshExpiredTiles'] = true;
	export let maxBounds: MapOptions['maxBounds'] = undefined;
	export let minZoom: MapOptions['minZoom'] = 1;
	export let maxZoom: MapOptions['maxZoom'] = 20;
	export let minPitch: MapOptions['minPitch'] = undefined;
	export let maxPitch: MapOptions['maxPitch'] = undefined;
	export let boxZoom: MapOptions['boxZoom'] = undefined;
	export let dragRotate: MapOptions['dragRotate'] = true;
	export let dragPan: MapOptions['dragPan'] = true;
	export let keyboard: MapOptions['keyboard'] = true;
	export let doubleClickZoom: MapOptions['doubleClickZoom'] = true;
	export let touchZoomRotate: MapOptions['touchZoomRotate'] = true;
	export let touchPitch: MapOptions['touchPitch'] = true;
	export let cooperativeGestures: MapOptions['cooperativeGestures'] = false;
	export let trackResize: MapOptions['trackResize'] = false;
	export let center: MapOptions['center'] = undefined;
	export let zoom: MapOptions['zoom'] = 10;
	export let bearing: MapOptions['bearing'] = 0;
	export let pitch: MapOptions['pitch'] = 0;
	export let renderWorldCopies: MapOptions['renderWorldCopies'] = true;
	export let maxTileCacheSize: MapOptions['maxTileCacheSize'] = undefined;
	export let transformRequest: MapOptions['transformRequest'] = undefined;
	export let locale: MapLocale = MAP_LOCALES.french;
	export let fadeDuration: MapOptions['fadeDuration'] = 150;
	export let crossSourceCollisions: MapOptions['crossSourceCollisions'] = undefined;
	export let collectResourceTiming: MapOptions['collectResourceTiming'] = undefined;
	export let clickTolerance: MapOptions['clickTolerance'] = 1;
	export let bounds: MapOptions['bounds'] = LOCATIONS.montreal.bounds;
	export let fitBoundsOptions: MapOptions['fitBoundsOptions'] = undefined;
	export let localIdeographFontFamily: MapOptions['localIdeographFontFamily'] = undefined;
	export let pitchWithRotate: MapOptions['pitchWithRotate'] = true;
	export let pixelRatio: MapOptions['pixelRatio'] = undefined;
	export let maplibreLogo: MapOptions['maplibreLogo'] = false;
	export let logoPosition: MapOptions['logoPosition'] = undefined;
	export let hash: MapOptions['hash'] = false;
	export let failIfMajorPerformanceCaveat: MapOptions['failIfMajorPerformanceCaveat'] = true;
	export let scrollZoom: MapOptions['scrollZoom'] = true;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;
	export let resizeDebounce: number = 50;

	let containerRef: HTMLElement;
	let draw: MapboxDraw | undefined;

	const drawMode = writable<MapDrawMode | undefined>();

	const dispatch = createEventDispatcher<{
		init: MapEventType['load'];
		load: MapEventType['load'];
		click: MapEventType['click'];
	}>();

	/**
	 * Helper to change the draw mode AND fire the corresponding event. By default, programmatic use
	 * of draw.changeMode doesn't fire the corresponding event:
	 * https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md.
	 */
	function drawChangeMode(mode: MapDrawMode, opts?: any) {
		if (!map || !draw) return;
		if (draw.getMode() == mode) {
			return;
		}
		draw.changeMode(mode as any, opts);
		map.fire(MAP_DRAW_EVENTS.ModeChange, {
			mode,
		});
	}

	function getDefaultCooperativeGestures(value: typeof cooperativeGestures) {
		if (value === true) {
			return MAP_GESTURES_TEXT.french;
		} else {
			return value;
		}
	}

	function init() {
		const premap = new Map({
			container: containerRef,
			style: mapStyle,
			hash,
			interactive,
			bearingSnap,
			attributionControl,
			customAttribution,
			maplibreLogo,
			logoPosition,
			failIfMajorPerformanceCaveat,
			preserveDrawingBuffer,
			antialias,
			refreshExpiredTiles,
			maxBounds,
			scrollZoom,
			minZoom,
			maxZoom,
			minPitch,
			maxPitch,
			boxZoom,
			dragRotate,
			dragPan,
			keyboard,
			doubleClickZoom,
			touchZoomRotate,
			touchPitch,
			cooperativeGestures: getDefaultCooperativeGestures(cooperativeGestures),
			trackResize,
			center,
			zoom,
			bearing,
			pitch,
			renderWorldCopies,
			maxTileCacheSize,
			transformRequest,
			locale,
			fadeDuration, // warning: if passed but undefined causes problem with mapbox draw
			crossSourceCollisions,
			collectResourceTiming,
			clickTolerance,
			bounds,
			fitBoundsOptions,
			localIdeographFontFamily,
			pitchWithRotate,
			pixelRatio,
		});

		premap.resize();

		premap.once('load', (e) => {
			map = premap;
			dispatch('init', e);

			map.on('load', (e) => {
				dispatch('load', e);
			});

			map.on('click', (e) => {
				dispatch('click', e);
			});

			// To do: REMOVE AND IMPLEMENT ELSEWHERE;

			map.on(MAP_DRAW_EVENTS.Init, (e: MapboxDraw.DrawInitEvent) => {
				draw = e.draw;
				drawMode.set(draw.getMode() as MapDrawMode);

				map?.once(MAP_DRAW_EVENTS.Destroy, (e) => {
					draw = undefined;
				});
			});

			map.on(MAP_DRAW_EVENTS.ModeChange, (e: DrawModeChangeEvent) => {
				drawMode.set(e.mode);
			});
		});
	}

	/**
	 * Reactive cursor customization.
	 */
	const cursor = writable<Cursor | null>(null);
	$: if ($cursor || $cursor === null) {
		if (map && map.getCanvas()) {
			const c = map.getCanvas();
			if (!$cursor) {
				c.style.removeProperty('cursor');
			} else {
				c.style.cursor = $cursor;
			}
		}
	}

	const handleResize = debounce(() => {
		requestAnimationFrame(() => {
			map?.resize();
		});
	}, resizeDebounce);

	// Reactive map options
	$: if (bearing != null) map?.setBearing(bearing);
	$: if (center != null) map?.setCenter(center);
	$: if (bounds != null) map?.fitBounds(bounds);
	$: map?.setMaxBounds(maxBounds);
	$: if (pitch != null) map?.setPitch(pitch);
	$: map?.setMinPitch(minPitch);
	$: map?.setMaxPitch(maxPitch);
	$: if (zoom != null) map?.setZoom(zoom);
	$: map?.setMinZoom(minZoom);
	$: map?.setMaxZoom(maxZoom);
	$: if (bearing != null) map?.setBearing(bearing);

	setMapContext({
		cursor,
		getMap: () => map!,
		getDraw: () => draw,
		drawMode,
		drawChangeMode,
	});

	onMount(() => {
		if (browser) {
			init();
		}
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});
</script>

<figure class={className} {style} {id}>
	<div class="ui-map-container" bind:this={containerRef} use:resize on:resize={handleResize} />
	{#if map}
		<slot {map} />
		<div class="map-overlays">
			{#if $$slots['top-left']}
				<div class="map-overlay-area top left" style="grid-area: top-left">
					<slot name="top-left" {map} />
				</div>
			{/if}
			{#if $$slots.top}
				<div class="map-overlay-area top" style="grid-area: top">
					<slot name="top" {map} />
				</div>
			{/if}
			{#if $$slots['top-right']}
				<div class="map-overlay-area top right" style="grid-area: top-right">
					<slot name="top-right" {map} />
				</div>
			{/if}
			{#if $$slots['bottom-left']}
				<div class="map-overlay-area bottom left" style="grid-area: bottom-left">
					<slot name="bottom-left" {map} />
				</div>
			{/if}
			{#if $$slots.bottom}
				<div class="map-overlay-area bottom" style="grid-area: bottom">
					<slot name="bottom" {map} />
				</div>
			{/if}
			{#if $$slots['bottom-right']}
				<div class="map-overlay-area bottom right" style="grid-area: bottom-right">
					<slot name="bottom-right" {map} />
				</div>
			{/if}
		</div>
	{:else}
		<div class="loading">
			<slot name="loading">
				<Loading />
			</slot>
		</div>
	{/if}
</figure>

<style lang="scss">
	figure {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: inherit;

		.ui-map-container {
			width: 100%;
			height: 100%;
			border-radius: inherit;
			position: relative;
		}

		.map-overlays {
			pointer-events: none;
			padding: 1rem;
			border-radius: inherit;
			position: absolute;
			inset: 0;
			display: grid;
			grid-template-areas:
				'top-left top top-right'
				'left center right'
				'bottom-left bottom bottom-right';

			.top {
				--t-o-y: top;
				align-items: flex-start;
				justify-content: center;
			}
			.bottom {
				--t-o-y: bottom;
				align-items: flex-end;
				justify-content: center;
			}
			.right {
				--t-o-x: right;
				justify-content: flex-end;
			}
			.left {
				--t-o-x: left;
				justify-content: flex-start;
			}
		}

		.map-overlay-area {
			position: relative;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5rem;

			> :global(*) {
				transform-origin: var(--t-o-x) var(--t-o-y);
				pointer-events: initial;
			}
		}

		:global(canvas) {
			outline: none;
			border: none;
		}

		:global(.maplibregl-cooperative-gesture-screen) {
			background: none;
			font-family: var(--ui-font-main);
			font-size: var(--ui-text-xs);
			font-weight: 450;
			color: col(fg, 100);
			transform: scale(0.9);
			transition: all 0.15s var(--ui-ease-in) 1s;
		}

		:global(.maplibregl-cooperative-gesture-screen.maplibregl-show) {
			transform: scale(1);
			transition: all 0s ease-out;
		}

		:global(.maplibregl-desktop-message),
		:global(.maplibregl-mobile-message) {
			padding-inline: 1.5rem;
			padding-block: 0.8rem 0.9rem;
			// border-radius: var(--ui-radius-md);
			border-radius: 99px;
			background: col(bg, 300, 0.75);
		}
	}

	.loading {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		font-size: 1.5rem;
		width: 100%;
		height: 100%;
		z-index: 1;
		border-radius: inherit;
		color: col(bg, 900);
	}
</style>

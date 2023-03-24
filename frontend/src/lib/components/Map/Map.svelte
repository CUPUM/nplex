<!--
	@component
	## Map
	Generic map primitive component to instanciate a MapLibre context and map.
-->
<script lang="ts" context="module">
	/**
	 * Context.
	 */

	const CTX_KEY = 'map-context';

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
		getMapDraw: () => MapboxDraw | undefined;
		drawMode: Readable<MapDrawMode | undefined>;
		drawChangeMode: MapboxDraw.DrawInitEvent['changeMode'] | undefined;
	}

	export function getMapContext() {
		return getContext<MapContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { MAP_DRAW_EVENTS, type Cursor, type MapDrawMode } from '$utils/enums';
	import { LOCATIONS } from '$utils/map/locations';
	import { MAP_STYLES } from '$utils/map/styles';
	import { MAP_GESTURES_TEXT, MAP_LOCALES, type MapLocale } from '$utils/map/ui';
	import { debounce } from '$utils/modifiers';
	import type { DrawModeChangeEvent } from '@mapbox/mapbox-gl-draw';
	import { Map, type MapEventType, type MapOptions } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Readable, type Writable } from 'svelte/store';

	export let id: string | undefined = undefined;
	export let interactive: MapOptions['interactive'] = true;
	export let bearingSnap: MapOptions['bearingSnap'] = undefined;
	export let attributionControl: MapOptions['attributionControl'] = undefined;
	export let customAttribution: MapOptions['customAttribution'] = undefined;
	export let preserveDrawingBuffer: MapOptions['preserveDrawingBuffer'] = undefined;
	export let antialias: MapOptions['antialias'] = true;
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
	export let cooperativeGestures: MapOptions['cooperativeGestures'] = true;
	export let trackResize: MapOptions['trackResize'] = false;
	export let center: MapOptions['center'] = undefined;
	export let zoom: MapOptions['zoom'] = 10;
	export let bearing: MapOptions['bearing'] = 0;
	export let pitch: MapOptions['pitch'] = 0;
	export let renderWorldCopies: MapOptions['renderWorldCopies'] = true;
	export let maxTileCacheSize: MapOptions['maxTileCacheSize'] = undefined;
	export let transformRequest: MapOptions['transformRequest'] = undefined;
	export let locale: MapLocale = MAP_LOCALES.french;
	export let fadeDuration: MapOptions['fadeDuration'] = 125;
	export let crossSourceCollisions: MapOptions['crossSourceCollisions'] = undefined;
	export let collectResourceTiming: MapOptions['collectResourceTiming'] = undefined;
	export let clickTolerance: MapOptions['clickTolerance'] = undefined;
	export let bounds: MapOptions['bounds'] = LOCATIONS.montreal.bounds;
	export let fitBoundsOptions: MapOptions['fitBoundsOptions'] = undefined;
	export let localIdeographFontFamily: MapOptions['localIdeographFontFamily'] = undefined;
	export let mapStyle: MapOptions['style'] = MAP_STYLES.Light;
	export let pitchWithRotate: MapOptions['pitchWithRotate'] = true;
	export let pixelRatio: MapOptions['pixelRatio'] = undefined;
	export let map: Map | undefined = undefined;
	export let maplibreLogo: MapOptions['maplibreLogo'] = false;
	export let logoPosition: MapOptions['logoPosition'] = undefined;
	export let hash: MapOptions['hash'] = false;
	export let failIfMajorPerformanceCaveat: MapOptions['failIfMajorPerformanceCaveat'] = true;
	export let scrollZoom: MapOptions['scrollZoom'] = true;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;

	let containerRef: HTMLElement;
	let resizeObserver: ResizeObserver;
	let draw: MapboxDraw | undefined;
	let drawChangeMode: MapboxDraw.DrawInitEvent['changeMode'] | undefined;

	const drawMode = writable<MapDrawMode | undefined>();

	const dispatch = createEventDispatcher<
		Pick<{ [Event in keyof MapEventType]: MapEventType[Event] }, 'click'> & {
			init: MapEventType['load'];
		}
	>();

	// type $$Events = {
	// 	click: CustomEvent<MapEventType['click']>;
	// };

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
			cooperativeGestures:
				cooperativeGestures === true ? MAP_GESTURES_TEXT.french : cooperativeGestures,
			trackResize,
			center,
			zoom,
			bearing,
			pitch,
			renderWorldCopies,
			maxTileCacheSize,
			transformRequest,
			locale,
			fadeDuration, // warning: if undefined causes problem with mapbox draw
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

			map.on('click', (e) => {
				// console.log(map?.queryRenderedFeatures(e.point));
				dispatch<'click'>('click', e);
			});

			map.on(MAP_DRAW_EVENTS.Init, (e: MapboxDraw.DrawInitEvent) => {
				draw = e.draw;
				drawMode.set(draw.getMode() as MapDrawMode);
				drawChangeMode = e.changeMode;

				map?.once(MAP_DRAW_EVENTS.Destroy, (e) => {
					draw = undefined;
					drawChangeMode = undefined;
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
	}, 10);

	setContext<MapContext>(CTX_KEY, {
		cursor,
		getMap: () => map!,
		getMapDraw: () => draw,
		drawMode,
		drawChangeMode,
	});

	onMount(() => {
		if (browser) {
			resizeObserver = new ResizeObserver(handleResize);
			resizeObserver.observe(containerRef);
			init();
		}
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
		resizeObserver?.disconnect();
	});
</script>

<figure class={className} {style} {id}>
	<div class="ui-map-container" bind:this={containerRef} />
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
				<div class="ui-skeleton-fill" />
				<!-- <Loading /> -->
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
		position: absolute;
		top: 0;
		left: 0;
		font-size: 1.5rem;
		width: 100%;
		height: 100%;
		z-index: 1;
		border-radius: inherit;
	}
</style>

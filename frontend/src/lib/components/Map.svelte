<!--
	@component
	## Map
	Generic map primitive component to instanciate a MapLibre map.

-->
<script lang="ts" context="module">
	const CTX_KEY = 'map-context';

	interface MapContext {
		getMap: () => Map | undefined;
		getContainer: () => HTMLElement;
		loading: Writable<boolean>;
		setCursor: (cursor: Cursor | undefined) => void;
	}

	export function getMapContext() {
		return getContext<MapContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { intersection } from '$actions/intersection';
	import type { Cursor } from '$utils/enums';
	import { debounce } from '$utils/function';
	import { gesturesText, locales, locations, styles, type MapLocale } from '$utils/map';
	import {
		Map,
		MapMouseEvent,
		MapTouchEvent,
		MapWheelEvent,
		type MapContextEvent,
		type MapDataEvent,
		type MapLibreEvent,
		type MapLibreZoomEvent,
		type MapOptions,
		type MapSourceDataEvent,
		type MapStyleDataEvent,
		type MapStyleImageMissingEvent,
		type MapTerrainEvent,
		type StyleSpecification,
	} from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Loading from './Loading.svelte';

	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
	// Maplibre props
	export let map: Map | undefined = undefined;
	export let styleSpecification: string | StyleSpecification = styles.light;
	export let locale: MapLocale = locales.french;
	export let pitch: MapOptions['pitch'] = 0;
	export let bearing: MapOptions['bearing'] = 0;
	export let bearingSnap: MapOptions['bearingSnap'] = undefined;
	export let zoom: MapOptions['zoom'] = 10;
	export let maxZoom: MapOptions['maxZoom'] = undefined;
	export let minZoom: MapOptions['minZoom'] = undefined;
	export let center: MapOptions['center'] = locations.montreal.center;
	export let dragPan: MapOptions['dragPan'] = true;
	export let dragRotate: MapOptions['dragRotate'] = true;
	export let pitchWithRotate: MapOptions['pitchWithRotate'] = true;
	export let cooperativeGestures: MapOptions['cooperativeGestures'] = false;
	// ...add rest as needed.

	let containerRef: HTMLElement;
	let mapRef: HTMLDivElement;
	let resizeObserver: ResizeObserver;

	const loading = writable(true);
	const dispatch = createEventDispatcher<{
		error: ErrorEvent;
		load: MapLibreEvent;
		idle: MapLibreEvent;
		remove: MapLibreEvent;
		render: MapLibreEvent;
		resize: MapLibreEvent;
		webglcontextlost: MapContextEvent;
		webglcontextrestored: MapContextEvent;
		dataloading: MapDataEvent;
		data: MapDataEvent;
		tiledataloading: MapDataEvent;
		sourcedataloading: MapSourceDataEvent;
		styledataloading: MapStyleDataEvent;
		sourcedata: MapSourceDataEvent;
		styledata: MapStyleDataEvent;
		styleimagemissing: MapStyleImageMissingEvent;
		dataabort: MapDataEvent;
		sourcedataabort: MapSourceDataEvent;
		boxzoomcancel: MapLibreZoomEvent;
		boxzoomstart: MapLibreZoomEvent;
		boxzoomend: MapLibreZoomEvent;
		touchcancel: MapTouchEvent;
		touchmove: MapTouchEvent;
		touchend: MapTouchEvent;
		touchstart: MapTouchEvent;
		click: MapMouseEvent;
		contextmenu: MapMouseEvent;
		dblclick: MapMouseEvent;
		mousemove: MapMouseEvent;
		mouseup: MapMouseEvent;
		mousedown: MapMouseEvent;
		mouseout: MapMouseEvent;
		mouseover: MapMouseEvent;
		movestart: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
		move: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
		moveend: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
		zoomstart: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
		zoom: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
		zoomend: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
		rotatestart: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		rotate: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		rotateend: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		dragstart: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		drag: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		dragend: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		pitchstart: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		pitch: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		pitchend: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
		wheel: MapWheelEvent;
		terrain: MapTerrainEvent;
	}>();

	function init() {
		map = new Map({
			container: mapRef,
			style: styleSpecification,
			center,
			zoom,
			maxZoom,
			minZoom,
			pitch,
			bearing,
			bearingSnap,
			dragPan,
			dragRotate,
			cooperativeGestures: cooperativeGestures ? gesturesText.french : cooperativeGestures,
			locale,
			pitchWithRotate,
		});

		(
			[
				'error',
				'load',
				'idle',
				'remove',
				'render',
				'resize',
				'webglcontextlost',
				'webglcontextrestored',
				'dataloading',
				'data',
				'tiledataloading',
				'sourcedataloading',
				'styledataloading',
				'sourcedata',
				'styledata',
				'styleimagemissing',
				'dataabort',
				'sourcedataabort',
				'boxzoomcancel',
				'boxzoomstart',
				'boxzoomend',
				'touchcancel',
				'touchmove',
				'touchend',
				'touchstart',
				'click',
				'contextmenu',
				'dblclick',
				'mousemove',
				'mouseup',
				'mousedown',
				'mouseout',
				'mouseover',
				'movestart',
				'move',
				'moveend',
				'zoomstart',
				'zoom',
				'zoomend',
				'rotatestart',
				'rotate',
				'rotateend',
				'dragstart',
				'drag',
				'dragend',
				'pitchstart',
				'pitch',
				'pitchend',
				'wheel',
				'terrain',
			] as const
		).forEach((name) => {
			map?.on(name, (e) => dispatch(name, e));
		});

		map.once('load', (e) => {
			loading.set(false);
		});
	}

	function setCursor(cursor: Cursor | undefined) {
		if (map && map.getCanvas()) {
			if (!cursor) return map.getCanvas().style.removeProperty('cursor');
			map.getCanvas().style.cursor = cursor;
		}
	}

	const handleResize = debounce(() => {
		requestAnimationFrame(() => {
			map?.resize();
		});
	}, 5);

	setContext<MapContext>(CTX_KEY, {
		getMap: () => map,
		loading,
		getContainer: () => containerRef,
		setCursor,
	});

	onMount(() => {
		resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(containerRef);
	});

	onDestroy(() => {
		map?.remove();
		resizeObserver?.disconnect();
	});
</script>

<figure
	bind:this={containerRef}
	class="map {className}"
	class:is-loading={$loading}
	{style}
	use:intersection={{ rootMargin: '100px 100px' }}
	on:enter|once={init}
>
	<div class="map-container" class:is-loading={$loading} bind:this={mapRef} />
	{#if $loading}
		<div class="loading">
			<slot name="loading">
				<Loading />
			</slot>
		</div>
	{/if}
	{#if map && $$slots.default}
		<div class="slot">
			<slot {map} />
		</div>
	{/if}
</figure>

<style lang="scss">
	:where(.map) {
		all: unset;
		position: relative;
		display: block;
		padding: 0;
		margin: 0;
		width: 400px;
		height: 300px;
	}

	.map-container {
		position: relative;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: inherit;
		transition: all 0.25s ease-out;
		&.is-loading {
			transform: scale(0.99);
			opacity: 0.25;
		}
		:global(canvas) {
			outline: none;
			background: transparent;
		}
		:global(.maplibregl-cooperative-gesture-screen) {
			font-family: var(--ui-font-main);
			font-weight: 300;
			font-size: var(--ui-text-xs);
			color: col(bg, 500);
			background: transparent;
			& > :global(*) {
				padding: 1.25em 1.5em;
				padding-bottom: 1.5em;
				border-radius: var(--ui-radius-md);
				background: col(fg, 300, 0.8);
			}
		}
		:global(.maplibregl-ctrl-attrib) {
			font-family: var(--ui-font-main);
			font-weight: 300;
			font-size: var(--ui-text-2xs);
			background: col(bg, 100, 0.5);
			margin: 1rem;
			padding: 0.5em 1em;
			border-radius: 0.5em;
		}
	}

	.loading,
	.slot {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		pointer-events: none;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: inherit;
		& > :global(*) {
			pointer-events: initial;
		}
	}
</style>

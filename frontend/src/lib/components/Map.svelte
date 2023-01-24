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
	import { gesturesText, locales, MAP_STYLES, type MapLocale } from '$utils/map';
	import { locations } from '$utils/map/locations';
	import { debounce } from '$utils/modifiers';
	import { Map, type MapOptions, type StyleSpecification } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Loading from './Loading.svelte';

	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
	export let map: Map | undefined = undefined;
	export let mapStyle: string | StyleSpecification = MAP_STYLES.LIGHT;
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
	// Append as needed...

	let containerRef: HTMLElement;
	let mapContainerRef: HTMLDivElement;
	let resizeObserver: ResizeObserver;

	const loading = writable(true);
	const dispatch = createEventDispatcher();

	function init() {
		map = new Map({
			container: mapContainerRef,
			style: mapStyle,
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
			attributionControl: false,
		});

		map.once('load', (e) => {
			loading.set(false);
			dispatch('init', e);
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
	class="container {className}"
	class:loading={$loading}
	{style}
	use:intersection={{ rootMargin: '100px 100px' }}
	on:enter|once={init}
>
	<div class="map-container" class:loading={$loading} bind:this={mapContainerRef} />
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
	:where(.container) {
		position: relative;
		display: block;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}

	.map-container {
		position: relative;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: inherit;
		transition: transform 0.5s ease-out, opacity 0.5s;
		&.loading {
			transform: scale(0.98);
			opacity: 0;
		}
		:global(canvas) {
			outline: none;
			background: transparent;
		}
		:global(.maplibregl-cooperative-gesture-screen) {
			font-family: var(--ui-font-main);
			font-weight: 400;
			font-size: var(--ui-text-sm);
			color: col(fg, 100);
			background: transparent;
			& > :global(*) {
				padding: 1.25em 1.5em;
				padding-bottom: 1.5em;
				border-radius: var(--ui-radius-md);
				background: col(bg, 300);
			}
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

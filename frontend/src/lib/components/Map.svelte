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
	import { debounce } from '$utils/debounce';
	import type { Cursor } from '$utils/enums';
	import { forwardEvents, gesturesText, locales, locations, styles, type MapLocale } from '$utils/map';
	import { Map, type MapOptions, type StyleSpecification } from 'maplibre-gl';
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

	let containerRef: HTMLElement;
	let mapRef: HTMLDivElement;
	let resizeObserver: ResizeObserver;
	let unForward: ReturnType<typeof forwardEvents>;

	const loading = writable(true);
	const dispatch = createEventDispatcher();

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
			// expose rest of options as props...
		});
		unForward = forwardEvents(
			map,
			dispatch,
			'load',
			'zoom',
			'data',
			'dataloading',
			'dataabort',
			'dragend',
			'drag',
			'dragend',
			'pitch',
			'rotate'
		);
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
	class="container {className}"
	class:is-loading={$loading}
	{style}
	use:intersection={{ rootMargin: '100px 100px' }}
	on:enter|once={init}
	on:click
	on:focus
	on:blur
	on:mouseover
	on:mouseleave
	on:keypress
>
	<div class="map" class:is-loading={$loading} bind:this={mapRef} />
	{#if $loading}
		<div class="loading">
			<slot name="loading">
				<Loading />
			</slot>
		</div>
	{/if}
	{#if map && $$slots.default}
		<div class="slot">
			<slot />
		</div>
	{/if}
</figure>

<style lang="scss">
	:where(.container) {
		all: unset;
		position: relative;
		display: block;
		padding: 0;
		margin: 0;
		width: 400px;
		height: 300px;
	}

	.map {
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
			font-family: var(--font-main);
			font-weight: 300;
			font-size: var(--size-small);
			color: col(bg, 900);
			background: transparent;
			& > :global(*) {
				padding: 1em 1.5em 1.25em;
				border-radius: var(--ui-radius);
				box-shadow: 0 1em 3em -1em black;
				background: col(fg, 300, 1);
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

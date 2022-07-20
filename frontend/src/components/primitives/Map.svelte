<script lang="ts" context="module">
	export interface MapContext {
		getMap: () => Map;
		viewportBox: Readable<LngLatBounds | LngLatBoundsLike>;
		loading: Writable<boolean>;
		inited: Writable<boolean>;
	}
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { mapStyles } from '$utils/map';
	import { sizes } from '$utils/sizes';
	import {
		LngLat,
		LngLatBounds,
		Map,
		type LngLatBoundsLike,
		type LngLatLike,
		type StyleSpecification,
	} from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Readable, type Writable } from 'svelte/store';
	import Loading from './Loading.svelte';

	export let map: Map = undefined;
	/**
	 * Reference for the base layer style.json specification.
	 */
	export let styleSpecification: string | StyleSpecification = mapStyles.light;
	export let pitch: number = 0;
	export let bearing: number = 0;
	export let zoom: number = 9.5;
	export let center: LngLat | LngLatLike = [-73.65, 45.55];
	/**
	 * Describes the map's inner boundingBox as framed by the parent container.
	 * Useful for flyTo / map transitions in cases where the inner map canvas is set to overflow the container.
	 * Overflowing maps are used to ensure smoother transitions by limiting map.resize() calls. This feature is helpful even with the resizeDebounce.
	 */
	export let viewportBox: MapContext['viewportBox'] = undefined;
	/**
	 * CSS inline style for the figure (outer container) element. Default style includes display flex to allow for easy centering of map when bigger than container.
	 */
	export let style: string = undefined;
	/**
	 * CSS inline style for the map element, useful to implement overflow. The map container is display flex to allow for easy centering.
	 */
	export let innerStyle: string = undefined;

	const dispatch = createEventDispatcher();
	let containerRef: HTMLElement;
	let outerRef: HTMLElement;
	let inited = writable(false);
	let loading = writable(false);
	let resizeObs: ResizeObserver;
	let resizeDebounce;
	let hasOverlaySlot = false;

	/**
	 * Checking if any overlay slot content is passed.
	 */
	$: hasOverlaySlot =
		$$slots['top-left'] ||
		$$slots['top-center'] ||
		$$slots['top-right'] ||
		$$slots['bottom-left'] ||
		$$slots['bottom-center'] ||
		$$slots['bottom-right'];

	/**
	 * Update the map's base style on `style` prop change.
	 */
	$: if (map && styleSpecification) {
		loading.set(true);
		map.setStyle(styleSpecification);
	}

	function handleResize() {
		if (resizeDebounce) clearTimeout(resizeDebounce);
		resizeDebounce = setTimeout(() => {
			map?.resize();
			clearTimeout(resizeDebounce);
		}, 50);
	}

	function updateBoundingBox() {
		map.getBounds();
	}

	setContext<MapContext>(Ctx.Map, {
		getMap: () => map,
		viewportBox,
		loading,
		inited,
	});

	onMount(() => {
		resizeObs = new ResizeObserver(handleResize);
		resizeObs.observe(containerRef);

		map = new Map({
			container: containerRef,
			style: styleSpecification,
			center,
			zoom,
			pitch,
			bearing,
			attributionControl: false,
		});

		map.on('zoom', (e) => {
			zoom = map.getZoom();
		});

		map.on('load', (e) => {
			dispatch('load', e);
			if (!$inited) {
				dispatch('init');
				inited.set(true);
			}
			loading.set(false);
		});

		map.on('dataloading', (e) => {
			dispatch('dataloading', e);
			// if (!e.hasOwnProperty('tile')) {
			// 	loading = true;
			// }
		});

		map.on('data', (e) => {
			dispatch('data', e);
			// loading = false;
		});

		map.on('pitch', (e) => {
			dispatch('pitch', e);
			pitch = map.getPitch();
		});

		map.on('rotate', (e) => {
			dispatch('rotate', e);
			bearing = map.getBearing();
		});
	});

	onDestroy(() => {});
</script>

<figure bind:this={outerRef} class:loading class:not-inited={!inited} {style}>
	<div class="map" bind:this={containerRef} style={innerStyle} />
	{#if $loading}
		<Loading size={sizes.large} />
	{/if}
	<slot {map} />
	{#if hasOverlaySlot}
		<div class="overlay">
			{#if $$slots['top-left']}
				<div class="top left">
					<slot name="top-left" />
				</div>
			{/if}
			{#if $$slots['top-center']}
				<div class="top center">
					<slot name="top-center" />
				</div>
			{/if}
			{#if $$slots['top-right']}
				<div class="top right">
					<slot name="top-right" />
				</div>
			{/if}
			{#if $$slots['bottom-left']}
				<div class="bottom left">
					<slot name="bottom-left" />
				</div>
			{/if}
			{#if $$slots['bottom-center']}
				<div class="bottom center">
					<slot name="bottom-center" />
				</div>
			{/if}
			{#if $$slots['bottom-right']}
				<div class="bottom right">
					<slot name="bottom-right" />
				</div>
			{/if}
		</div>
	{/if}
</figure>

<style lang="scss">
	figure {
		opacity: 1;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		transform: scale(1);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		transition: all 0.35s cubic-bezier(0.2, 0, 0.2, 1);
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.loading {
		/* pointer-events: none; */
		/* transform: scale(0.97); */
		/* opacity: 0.8; */
	}

	.not-inited {
		transform: scale(0.95);
		opacity: 0.9;
		/* clip-path: circle(100% at center); */
	}

	.overlay {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 1.5rem;
		pointer-events: none;
		display: grid;
		grid-template-columns:
			[left-start]
			auto
			[left-end center-start]
			1fr
			[center-end right-start]
			auto
			[right-end];
		grid-template-rows:
			[top-start]
			auto
			[top-end center-start]
			1fr
			[center-end bottom-start]
			auto
			[bottom-end];

		& > div {
			pointer-events: all;
		}
	}

	/*
		Overlay slots grid placements.
	*/
	.top {
		grid-row: top;
	}
	.bottom {
		grid-row: bottom;
	}
	.left {
		grid-column: left;
	}
	.center {
		grid-column: center;
	}
	.right {
		grid-column: right;
	}
</style>

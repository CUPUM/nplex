<script lang="ts" context="module">
	export interface MapContext {
		getMap: () => Map;
		loading: Writable<boolean>;
		inited: Writable<boolean>;
	}
</script>

<script lang="ts">
	import { colors } from '$utils/colors';
	import { Ctx } from '$utils/contexts';
	import { mapStyles } from '$utils/map';
	import { sizes } from '$utils/sizes';
	import { LngLat, Map, type LngLatLike, type StyleSpecification } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Loading from './Loading.svelte';

	export let mapStyle: string | StyleSpecification = mapStyles.light;
	export let map: Map = undefined;
	export let pitch: number = 0;
	export let bearing: number = 0;
	export let zoom: number = 9.5;
	export let center: LngLat | LngLatLike = [-73.65, 45.55];

	const dispatch = createEventDispatcher();
	let mapRef: HTMLElement;
	let inited = writable(false);
	let loading = writable(false);
	let resizeObs: ResizeObserver;
	let resizeDebounce;
	let hasOverSlot = false;

	$: hasOverSlot =
		$$slots['top-left'] ||
		$$slots['top-center'] ||
		$$slots['top-right'] ||
		$$slots['bottom-left'] ||
		$$slots['bottom-center'] ||
		$$slots['bottom-right'];

	/**
	 * Update the map's base style on `style` prop change.
	 */
	$: if (map) {
		loading.set(true);
		map.setStyle(mapStyle);
	}

	function handleResize() {
		if (resizeDebounce) clearTimeout(resizeDebounce);
		resizeDebounce = setTimeout(() => {
			map?.resize();
			clearTimeout(resizeDebounce);
		}, 1);
	}

	setContext<MapContext>(Ctx.Map, {
		getMap: () => map,
		loading,
		inited,
	});

	onMount(() => {
		resizeObs = new ResizeObserver(handleResize);
		resizeObs.observe(mapRef);

		map = new Map({
			container: mapRef,
			style: mapStyle,
			center,
			zoom,
			pitch,
			bearing,
			attributionControl: false,
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

<figure bind:this={mapRef} class:loading class:not-inited={!inited}>
	{#if $loading}
		<Loading size={sizes.large} color={colors.dark[500]} />
	{/if}
	<slot {map} />
	{#if hasOverSlot}
		<div class="over">
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

<style lang="postcss">
	figure {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		transform: scale(1);
		opacity: 1;
		transition: all 0.35s cubic-bezier(0.2, 0, 0.2, 1);
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

	.over {
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
		Over slots grid placements.
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

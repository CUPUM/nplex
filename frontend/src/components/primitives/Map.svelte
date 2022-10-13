<script lang="ts" context="module">
	export interface MapContext {
		getMap: () => Map;
		loading: Writable<boolean>;
	}
</script>

<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { debounce } from '$utils/debounce';
	import { frenchLocale } from '$utils/maps/locale';
	import { mapStyles, montrealLocation } from '$utils/maps/map';
	import { Ctx } from '$utils/values/keys';
	import { sizes } from '$utils/values/sizes';
	import { Map, type MapOptions, type StyleSpecification } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Loading from './Loading.svelte';

	/**
	 * Maplibre map instance.
	 */
	export let map: Map = undefined;
	/**
	 * Reference for the base layer style.json specification.
	 */
	export let styleSpecification: string | StyleSpecification = mapStyles.light;
	export let pitch: number = 0;
	export let bearing: MapOptions['bearing'] = 0;
	export let bearingSnap: MapOptions['bearingSnap'] = undefined;
	export let zoom: MapOptions['zoom'] = 9.5;
	export let maxZoom: MapOptions['maxZoom'] = undefined;
	export let minZoom: MapOptions['minZoom'] = undefined;
	export let center: MapOptions['center'] = montrealLocation.center;
	export let dragPan: MapOptions['dragPan'] = undefined;
	export let dragRotate: MapOptions['dragRotate'] = undefined;
	export let pitchWithRotate: MapOptions['pitchWithRotate'] = undefined;
	export let cooperativeGestures: MapOptions['cooperativeGestures'] = undefined;
	// To do: export rest of MapOptions as props.
	/**
	 * CSS inline style for the figure (outer container) element. Default style includes display flex to allow for easy centering of map when bigger than container.
	 */
	export let style: string = undefined;
	/**
	 * CSS inline style for the map element, useful to implement overflow. The map container is display flex to allow for easy centering.
	 */
	export let innerStyle: string = undefined;

	const dispatch = createEventDispatcher();
	let innerRef: HTMLElement;
	let outerRef: HTMLElement;
	let loading = writable(false);
	let innerResizeObs: ResizeObserver;
	let outerResizeObs: ResizeObserver;

	/**
	 * Update the map's base style on `style` prop change.
	 */
	$: if (map && styleSpecification) {
		loading.set(true);
		map.setStyle(styleSpecification);
	}

	const handleOuterResize = debounce(() => {
		if (innerStyle) {
			if (map && innerRef && outerRef) {
				map.setPadding({
					top: -1 * innerRef.offsetTop,
					right: -1 * (outerRef.offsetWidth - (innerRef.offsetLeft + innerRef.offsetWidth)),
					bottom: -1 * (outerRef.offsetHeight - (innerRef.offsetTop + innerRef.offsetHeight)),
					left: -1 * innerRef.offsetLeft,
				});
			}
		}
	}, 50);

	const handleInnerResize = debounce(() => {
		requestAnimationFrame(() => {
			map?.resize();
		});
	}, 0);

	setContext<MapContext>(Ctx.Map, {
		getMap: () => map,
		loading,
	});

	function init() {
		map = new Map({
			container: innerRef,
			style: styleSpecification,
			center,
			zoom,
			maxZoom,
			minZoom,
			pitch,
			bearing,
			bearingSnap,
			attributionControl: false,
			dragPan,
			dragRotate,
			cooperativeGestures,
			locale: frenchLocale,
			pitchWithRotate,
		});

		// map.showPadding = true;

		map.on('zoom', (e) => {
			zoom = map.getZoom();
		});

		map.on('load', (e) => {
			dispatch('load', e);
			loading.set(false);
		});

		map.on('dataloading', (e) => {
			dispatch('dataloading', e);
			// if (!e.hasOwn('tile')) {
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
	}

	onMount(() => {
		outerResizeObs = new ResizeObserver(handleOuterResize);
		outerResizeObs.observe(outerRef);
		innerResizeObs = new ResizeObserver(handleInnerResize);
		innerResizeObs.observe(innerRef);
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<figure
	bind:this={outerRef}
	class:loading
	class:not-inited={!map}
	{style}
	use:intersection={{ rootMargin: '100px 100px' }}
	on:enter|once={init}
>
	<div class="map" bind:this={innerRef} style={innerStyle} />
	{#if $loading}
		<Loading size={sizes.large} />
	{/if}
	{#if map}
		<slot {map} />
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
		border-radius: 1.5rem;
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
		transform: scale(0.96);
		opacity: 0.5;
		/* clip-path: circle(100% at center); */
	}
</style>

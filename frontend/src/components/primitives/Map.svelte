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
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Loading from './Loading.svelte';
	export let mapStyle: string | StyleSpecification = mapStyles.light;
	export let map: Map = undefined;
	export let pitch: number = 0;
	export let bearing: number = 0;
	export let zoom: number = 9.5;
	export let center: LngLat | LngLatLike = [-73.65, 45.55];

	const dispatch = createEventDispatcher();
	let containerRef: HTMLElement;
	let inited = writable(false);
	let loading = writable(false);
	let resizeObs: ResizeObserver;
	let resizeDebounce;

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

	/**
	 * Let's first check if there's already a map context that the developper manually set in the parent tree, and use this one if available rather than creating a new context.
	 */
	const parentMapContext: MapContext = getContext(Ctx.Map);
	if (parentMapContext) {
		console.log('parent context detected');
		parentMapContext.getMap = () => map;
		parentMapContext.loading = loading;
		parentMapContext.inited = inited;
		console.log(parentMapContext);
	} else {
		setContext<MapContext>(Ctx.Map, {
			getMap: () => map,
			loading,
			inited,
		});
	}

	onMount(() => {
		resizeObs = new ResizeObserver(handleResize);
		resizeObs.observe(containerRef);

		map = new Map({
			container: containerRef,
			style: mapStyle,
			center,
			zoom,
			pitch,
			bearing,
			attributionControl: false,
		});

		map.on('load', (e) => {
			dispatch('load', e);
			inited.set(true);
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

<figure bind:this={containerRef} class:loading class:not-inited={!inited}>
	{#if $loading}
		<Loading size={sizes.large} color={colors.dark[500]} />
	{/if}
	<slot />
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
</style>

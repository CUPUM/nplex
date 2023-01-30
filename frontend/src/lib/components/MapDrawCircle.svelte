<script lang="ts">
	import { createCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { onDestroy, onMount } from 'svelte';
	import { getMapContext } from './Map.svelte';
	import { DRAW_EVENTS, getMapDrawContext } from './MapDraw.svelte';

	export let center: GeoJSON.Position;
	export let radius: number;

	const circle = createCircle(center, radius / 1000);

	const { getMap } = getMapContext();
	const { getMapDraw } = getMapDrawContext();

	onMount(() => {
		const map = getMap();
		const draw = getMapDraw();
		if (map && draw) {
			draw.add(circle);
			map.fire(DRAW_EVENTS.create, { features: [circle] });
		}
	});

	onDestroy(() => {});
</script>

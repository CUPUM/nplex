<script lang="ts">
	import { DRAW_EVENTS } from '$utils/enums';
	import { createCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { onDestroy, onMount } from 'svelte';
	import { getMapContext } from './Map.svelte';
	import { getMapDrawContext } from './MapDraw.svelte';

	export let center: GeoJSON.Position;
	export let radius: number;
	export let maxRadius: number | undefined;

	if (maxRadius && radius > maxRadius) {
		radius = maxRadius;
	}

	const { getMap } = getMapContext();
	const { getMapDraw } = getMapDrawContext();

	onMount(() => {
		const map = getMap();
		const draw = getMapDraw();
		if (map && draw) {
			const circle = createCircle(center, radius / 1000);
			draw.add(circle);
			map.fire(DRAW_EVENTS.Create, { features: [circle] });
		}
	});

	onDestroy(() => {});
</script>

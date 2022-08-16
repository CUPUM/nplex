<!-- 
	@component
	Adds a layer to display and style a source on the map.
 -->
<script lang="ts" context="module">
	export interface MapLayerContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import type { LayerSpecification } from 'maplibre-gl';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { getContext } from 'svelte/types/runtime/internal/lifecycle';
	import type { MapContext } from './Map.svelte';

	export let id: LayerSpecification['id'];
	export let type: LayerSpecification['type'];
	export let beforeId: string = undefined;

	setContext<MapLayerContext>(Ctx.MapLayer, {});

	const mapCtx = getContext<MapContext>(Ctx.Map);

	const map = mapCtx.getMap();

	onMount(() => {
		map.addLayer(
			{
				id,
				type,
			},
			beforeId
		);
	});

	onDestroy(() => {});
</script>

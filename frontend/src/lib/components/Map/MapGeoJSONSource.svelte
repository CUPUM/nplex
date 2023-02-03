<!--
	@component
	Adds a map source to the map instance.
 -->
<script lang="ts" context="module">
	export interface MapGeoJSONSourceContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/enums';
	import type { GeoJSON } from 'geojson';
	import type { GeoJSONSource, GeoJSONSourceSpecification } from 'maplibre-gl';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import type { MapContext } from './Map/Map.svelte';

	export let id: string;
	export let data: GeoJSON;

	// Additional options
	export let maxzoom: GeoJSONSourceSpecification['maxzoom'] = undefined;
	export let attribution: GeoJSONSourceSpecification['attribution'] = undefined;
	export let buffer: GeoJSONSourceSpecification['buffer'] = undefined;
	export let filter: GeoJSONSourceSpecification['filter'] = undefined;
	export let tolerance: GeoJSONSourceSpecification['tolerance'] = undefined;
	export let cluster: GeoJSONSourceSpecification['cluster'] = undefined;
	export let clusterRadius: GeoJSONSourceSpecification['clusterRadius'] = undefined;
	export let clusterMaxZoom: GeoJSONSourceSpecification['clusterMaxZoom'] = undefined;
	export let clusterMinPoints: GeoJSONSourceSpecification['clusterMinPoints'] = undefined;
	export let clusterProperties: GeoJSONSourceSpecification['clusterProperties'] = undefined;
	export let lineMetrics: GeoJSONSourceSpecification['lineMetrics'] = undefined;
	export let generateId: GeoJSONSourceSpecification['generateId'] = undefined;
	export let promoteId: GeoJSONSourceSpecification['promoteId'] = undefined;

	let source: GeoJSONSource;

	setContext<MapGeoJSONSourceContext>(Ctx.MapGeoJSONSource, {});

	const mapCtx = getContext<MapContext>(Ctx.Map);

	const map = mapCtx.getMap();

	$: if (data) {
		if (source) {
			source.setData(data);
		}
	}

	onMount(() => {
		map.on('load', () => {
			map.addSource(id, {
				type: 'geojson',
				data,
				maxzoom,
				attribution,
				buffer,
				filter,
				tolerance,
				cluster,
				clusterRadius,
				clusterMaxZoom,
				clusterMinPoints,
				clusterProperties,
				lineMetrics,
				generateId,
				promoteId,
			});
			source = map.getSource(id) as GeoJSONSource;
		});
	});

	onDestroy(() => {
		if (source) {
			map.removeSource(id);
		}
	});
</script>

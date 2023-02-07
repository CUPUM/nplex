<!--
	@component
	A common map marker, needs to be nested within a MapLayer? (to determine).
-->
<script lang="ts">
	import type { LngLat, LngLatLike } from 'maplibre-gl';
	import { getMapContext } from './Map.svelte';

	export let lnglat: LngLat | LngLatLike;
	export let radius: number;

	const { getMap } = getMapContext();
</script>

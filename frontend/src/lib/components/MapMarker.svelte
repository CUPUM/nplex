<!--
	@component
	A common map marker, needs to be nested within a MapLayer? (to determine).
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/enums';
	import type { LngLat, LngLatLike } from 'maplibre-gl';
	import { getContext } from 'svelte';

	export let lnglat: LngLat | LngLatLike;
	export let radius: number;

	const ctx = getContext(Ctx.ExploreMap);
</script>

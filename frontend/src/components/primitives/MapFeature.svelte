<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { getContext } from 'svelte';
	import type { MapContext } from './Map.svelte';

	/**
	 * GeoJSON feature definition.
	 */
	export let feature: any;

	const { getMap, inited, loading } = getContext<MapContext>(Ctx.Map);
	// const { getSource } = getContext<MapSourceContext>(Ctx.MapSource);

	let map: ReturnType<MapContext['getMap']>;

	/**
	 * Inited should fire only once when the map has completed full initial load.
	 * This reactive call is to be used in a manner similar to onMount for things dependant on the map instance rather than just html elements.
	 */
	$: if ($inited) {
		map = getMap();
	}
</script>

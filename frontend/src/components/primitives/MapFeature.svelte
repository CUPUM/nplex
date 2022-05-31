<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { getContext } from 'svelte';

	/**
	 * GeoJSON feature definition.
	 */
	export let feature: any;

	const ctx = getContext(Ctx.ExploreMap);
</script>

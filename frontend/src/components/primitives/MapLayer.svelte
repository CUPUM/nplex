<script lang="ts" context="module">
	export interface MapLayerContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { setContext } from 'svelte';

	setContext<MapLayerContext>(Ctx.MapLayer, {});
</script>

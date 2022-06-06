<script lang="ts" context="module">
	export interface MapLayerContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { setContext } from 'svelte';

	setContext<MapLayerContext>(Ctx.MapLayer, {});
</script>

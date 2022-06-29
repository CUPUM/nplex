<script lang="ts" context="module">
	export interface MapSourceContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { setContext } from 'svelte';

	setContext<MapSourceContext>(Ctx.MapSource, {});
</script>

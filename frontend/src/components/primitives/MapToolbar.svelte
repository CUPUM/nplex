<script lang="ts" context="module">
	export interface MapToolbarContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import type { MapContext } from './Map.svelte';

	onMount(() => {});

	let mapCtx = getContext<MapContext>(Ctx.Map);
	$: if (mapCtx && mapCtx.inited) {
		// console.log(mapCtx.getMap());
	}

	setContext<MapToolbarContext>(Ctx.MapToolbar, {});

	onDestroy(() => {});
</script>

<menu>
	<slot />
</menu>

<style lang="scss">
	menu {
		font-size: var(--size-xsmall);
		--outset: 5px;
		z-index: 1000;
		position: relative;
		display: inline-flex;
		margin: 0;
		background-color: white;
		box-shadow: 0 0 0 var(--outset) white;
		padding: var(--inset);
		border-radius: 1.1em;
	}
</style>

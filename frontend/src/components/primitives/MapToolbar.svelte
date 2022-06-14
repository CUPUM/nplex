<script lang="ts" context="module">
	export interface MapToolbarContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import type { MapContext } from './Map.svelte';

	onMount(() => {});

	let mapCtx = getContext<MapContext>(Ctx.Map);
	$: if (mapCtx && mapCtx.inited) {
		console.log(mapCtx.getMap());
	}

	setContext<MapToolbarContext>(Ctx.MapToolbar, {});

	onDestroy(() => {});
</script>

<menu>
	<slot />
</menu>

<style>
	menu {
		--inset: 3px;
		z-index: 1000;
		position: absolute;
		display: flex;
		top: 1rem;
		left: 1rem;
		margin: 0;
		/* background-color: var(--color-light-100); */
		background-color: red;
		padding: var(--inset);
		border-radius: 1.1em;
	}
</style>

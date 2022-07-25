<!--
	@component
	Maplibre map instance toolbar, to be used when grouping various buttons for map controls.
 -->
<script lang="ts" context="module">
	export interface MapToolbarContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import type { MapContext } from './Map.svelte';

	export let direction: 'row' | 'column' = 'row';
	export let position:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'center-left'
		| 'center-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';

	const mapCtx = getContext<MapContext>(Ctx.Map);

	const map = mapCtx.getMap();

	setContext<MapToolbarContext>(Ctx.MapToolbar, {});

	onMount(() => {});

	onDestroy(() => {});
</script>

<menu class="{direction} {position}">
	<slot />
</menu>

<style lang="scss">
	menu {
		font-size: var(--size-xsmall);
		--outset: var(--default-inset);
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

<script lang="ts" context="module">
	export interface MapContext {
		getMap: () => Map;
		loading: Writable<boolean>;
		inited: Writable<boolean>;
	}
</script>

<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import type { Map } from 'maplibre-gl';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let ref: HTMLElement;
	let map: Map;
	let inited = writable(false);
	let loading = writable(false);

	setContext<MapContext>(Ctx.Map, {
		getMap: () => map,
		loading,
		inited,
	});

	onMount(() => {});

	onDestroy(() => {});
</script>

<figure bind:this={ref}>
	<div />
</figure>

<style lang="postcss">
</style>

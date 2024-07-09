<script lang="ts">
	import darkMatterNoLabel from '$lib/map/styles/dark-matter-no-label.json';
	import { Map, type MapOptions } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';

	let {
		style = darkMatterNoLabel as any,
		center = [0, 0],
		zoom = 1,
		...restOptions
	}: Omit<MapOptions, 'container'> = $props();

	let mapRef = $state<HTMLElement>();

	onMount(() => {
		if (!mapRef) {
			throw Error('Map container could not be found or bound');
		}
		const map = new Map({ container: mapRef, style, center, zoom, ...restOptions });
	});
</script>

<figure bind:this={mapRef} class="inset-0"></figure>

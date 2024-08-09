<script lang="ts">
	import darkMatterNoLabel from '$lib/map/styles/dark-matter-no-label.json';
	import * as ML from 'maplibre-gl';
	import { type MapOptions } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		style = darkMatterNoLabel as any,
		center = [-73.561688, 45.50888],
		zoom = 14,
		class: className,
		children,
		...restOptions
	}: Omit<MapOptions, 'container'> & HTMLAttributes<HTMLElement> = $props();

	let mapRef = $state<HTMLElement>();

	onMount(() => {
		if (!mapRef) {
			throw Error('Map container could not be found or bound');
		}
		const map = new ML.Map({ container: mapRef, style, center, zoom, ...restOptions });
	});
</script>

<figure bind:this={mapRef} class={cn('[&>*]:rounded-inherit', className)}></figure>

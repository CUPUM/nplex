<script lang="ts">
	import { onMount } from 'svelte';
	import { Map as MLMap } from 'maplibre-gl';
	import { mapPane } from './ProjectsMap.css';

	let container: HTMLElement;
	let map: MLMap;
	let cw;
	let resizer;

	function handleResize() {
		if (resizer) clearTimeout(resizer);
		resizer = setTimeout(() => {
			map?.resize();
			clearTimeout(resizer);
		}, 5);
	}

	onMount(() => {
		map = new MLMap({
			container,
			style: 'https://demotiles.maplibre.org/style.json',
			center: [0, 0],
			zoom: 2 // starting zoom
		})
	})

	$:	cw, handleResize();
</script>


<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>


<section
	bind:this={container}
	bind:clientWidth={cw}
	class="{mapPane}"
>
	<!-- <figure bind:this={container}></figure> -->
</section>
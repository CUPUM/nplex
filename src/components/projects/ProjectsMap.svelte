<script lang="ts">
	import { onMount } from 'svelte';
	import { Map as MLMap } from 'maplibre-gl';

	let container: HTMLElement;
	let map: MLMap;
	let cw;
	let resizer;

	function handleResize() {
		if (resizer) clearTimeout(resizer);
		resizer = setTimeout(() => {
			map?.resize();
			clearTimeout(resizer);
		}, 0);
	}

	onMount(() => {
		map = new MLMap({
			container,
			style: 'https://demotiles.maplibre.org/style.json',
			center: [0, 0],
			zoom: 2 // starting zoom
		});
	});

	$: cw, handleResize();
</script>

<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>

<section bind:this={container} bind:clientWidth={cw}>
	<!-- <figure bind:this={container}></figure> -->
</section>

<style>
	section {
		flex: 1;
	}
</style>

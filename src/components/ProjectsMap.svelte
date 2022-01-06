<script lang="ts">
	import { onMount } from 'svelte';
	import { Map as MLMap } from 'maplibre-gl';

	let container: HTMLElement;
	let map: MLMap;
	let cw;

	export function handleResize() {
		console.log('handling resize');
		map?.resize()
	}

	onMount(() => {
		map = new MLMap({
			container,
			style: 'https://demotiles.maplibre.org/style.json',
			center: [0, 0],
			zoom: 2 // starting zoom
		})
	})

	// $:	cw, handleResize();
</script>




<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>




<section bind:this={container} bind:clientWidth={cw}>
	<!-- <figure bind:this={container}></figure> -->
</section>




<style lang="postcss">
	section {
		position: relative;
		flex: 1;
		padding: 0;
		margin: 0;
		overflow: visible;
		overflow: hidden;
		border-radius: 1rem;
	}
</style>
<script lang="ts">
	import { onMount } from 'svelte';
	import { Map as MLMap } from 'maplibre-gl';
	import Loading from '$components/primitives/Loading.svelte';
	import { colors } from '$utils/colors';

	let loaded = false;
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
			center: [-73.65, 45.55],
			zoom: 9.5,
		});

		function onInit() {
			loaded = true;
			map.off('idle', onInit);
		}

		map.on('idle', onInit);
	});

	$: cw, handleResize();
</script>

<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>

<section bind:this={container} bind:clientWidth={cw}>
	{#if !loaded}
		<Loading style="z-index: 100; background-color: {colors.light['100']};" />
	{/if}
	<!-- <figure bind:this={container}></figure> -->
</section>

<style>
	section {
		position: relative;
		flex: 1;
	}
</style>

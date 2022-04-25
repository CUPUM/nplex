<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Map as MLMap } from 'maplibre-gl';
	import Loading from '$components/primitives/Loading.svelte';
	import { colors } from '$utils/colors';

	let loading = true;
	let container: HTMLElement;
	let map: MLMap;
	let resizeObs: ResizeObserver;
	let resizeDebounce;

	function handleResize() {
		if (resizeDebounce) clearTimeout(resizeDebounce);
		resizeDebounce = setTimeout(() => {
			map?.resize();
			clearTimeout(resizeDebounce);
		}, 2);
	}

	onMount(() => {
		resizeObs = new ResizeObserver(handleResize);
		resizeObs.observe(container);

		map = new MLMap({
			container,
			style: 'https://api.maptiler.com/maps/052b0a19-3d8d-4610-9bb1-e4be24d4c355/style.json?key=dtV5LH1SmQB4VOb80qqI',
			center: [-73.65, 45.55],
			zoom: 9.5,
		});

		map.on('load', () => {
			loading = false;
		});
	});

	onDestroy(() => {});
</script>

<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>

<section bind:this={container}>
	{#if loading}
		<Loading style="z-index: 100; background-color: {colors.light['100']};" />
	{/if}
	<!-- <figure bind:this={container}></figure> -->
</section>

<style lang="postcss">
	section {
		position: relative;
		flex: 1;
	}
</style>

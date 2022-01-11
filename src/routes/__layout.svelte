<script lang="ts">
	import '$styles/styles.css';
	import Header from '$components/Header.svelte';
	import MainSearch from '$components/mainSearch/MainSearch.svelte';
	import { onMount } from 'svelte';
	import { Map } from 'maplibre-gl';
	import style from '$styles/map';

	let map;
	let container;

	// onMount(() => {
	// 	map = new Map({
	// 		container,
	// 		style,
	// 		// style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
	// 		center: [-73.671, 45.5315], // starting position [lng, lat]
	// 		zoom: 10 // starting zoom,
	// 	})
	// })
</script>



<Header />
<MainSearch />
<slot/>



<style>
</style>
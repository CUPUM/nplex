<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import Map from '$components/Map/Map.svelte';
	import light from '$utils/map/styles/light';
	import { expoOut } from 'svelte/easing';
	import type { PageData } from './$types';
	import {
		PROJECTS_FILTERS_W,
		PROJECTS_LIST_W,
		projectsFiltersOpened,
		projectsListOpened,
	} from './common';

	export let projects: PageData['projects'];

	let mapRef: Map;

	$: if (mapRef && ($projectsFiltersOpened != null || $projectsListOpened != null)) {
		mapRef?.map?.easeTo({
			padding: {
				left: $projectsFiltersOpened ? PROJECTS_FILTERS_W : 0,
				right: $projectsListOpened ? PROJECTS_LIST_W : 0,
			},
			duration: 250,
			easing: expoOut,
		});
	}
</script>

<section id="projects-map">
	<Map cooperativeGestures={false} mapStyle={light} bind:this={mapRef}>
		<div class="loading-wrapper" slot="loading">
			<Loading />
		</div>
		{#each projects as p}
			<!-- <MapMarker lnglat={p.obfuscated_location} /> -->
		{/each}
	</Map>
</section>

<style lang="scss">
	#projects-map {
		// --projects-map-radius: var(--ui-radius-xl);
		position: absolute;
		inset: 0;
		flex: 1;
		background: col(bg, 700);
		// transition: all 0.25s var(--ui-ease-out);
		// &:not(:first-child) {
		// 	border-top-left-radius: var(--projects-map-radius);
		// 	border-bottom-left-radius: var(--projects-map-radius);
		// }
		// &:not(:last-child) {
		// 	border-top-right-radius: var(--projects-map-radius);
		// 	border-bottom-right-radius: var(--projects-map-radius);
		// }
	}

	.loading-wrapper {
		color: col(bg, 900);
	}
</style>

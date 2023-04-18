<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import Map from '$components/Map/Map.svelte';
	import MapMarker from '$components/Map/MapMarker.svelte';
	import { toLngLatLike } from '$utils/format';
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

	$: mapRef?.map?.easeTo({
		padding: {
			left: $projectsFiltersOpened ? PROJECTS_FILTERS_W : 0,
		},
		duration: 250,
		easing: expoOut,
	});

	$: mapRef?.map?.easeTo({
		padding: {
			right: $projectsListOpened ? PROJECTS_LIST_W : 0,
		},
		duration: 250,
		easing: expoOut,
	});
</script>

<section id="projects-map">
	<Map cooperativeGestures={false} mapStyle={light} bind:this={mapRef}>
		<div class="loading-wrapper" slot="loading">
			<Loading />
		</div>
		{#each projects as p}
			{@const lnglat = toLngLatLike(p.location_obfuscated.coordinates)}
			<MapMarker {lnglat} anchor="center">
				<a class="project-marker" href="/projets/{p.id}" />
			</MapMarker>
			<!-- <MapPopup {lnglat}>Test</MapPopup> -->
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
		// border-radius: var(--projects-map-radius);
		// border-top-left-radius: var(--projects-map-radius);
		// border-top-right-radius: var(--projects-map-radius);
	}

	.project-marker {
		display: block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: col(primary, 500);
		transition: all 0.25s var(--ui-ease-out);
		&:hover {
			width: 1.25rem;
			height: 1.25rem;
		}
	}

	.project-marker-inner {
		position: absolute;
		font-size: 1rem;
		max-width: 50ch;
		text-align: center;
		// background: col(bg, 100);
		display: block;
		white-space: nowrap;
		transform: translate(-50%, -100%);
	}

	.loading-wrapper {
		color: col(bg, 900);
	}
</style>

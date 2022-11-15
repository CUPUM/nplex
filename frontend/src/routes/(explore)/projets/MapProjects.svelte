<script lang="ts" context="module">
	const LAYER_NAME = 'projects';
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { getMapContext } from '$components/Map.svelte';
	import { themes } from '$utils/themes';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import type { MapLayerMouseEvent } from 'maplibre-gl';
	import { onDestroy } from 'svelte';

	export let projects: PageData['projects'];

	const mapContext = getMapContext();
	const map = mapContext.getMap();

	// projects
	// 	.filter((p) => !!p.location_geometry)
	// 	.forEach((p) => {
	// 		if (map) {
	// 			new Marker().setLngLat(p.location_geometry.coordinates.reverse()).addTo(map);
	// 		}
	// 	});

	map?.on('load', (e) => {
		map.addSource('projects', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: projects
					.filter((p) => p.location_geometry && 'coordinates' in p.location_geometry && p.location_radius)
					.map((p) => {
						return {
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: (p.location_geometry as any).coordinates.reverse(),
							},
							properties: {
								id: p.id,
								radius: p.location_radius ?? 100,
							},
						};
					}),
			},
		});
		map.addLayer({
			id: 'projects',
			type: 'circle',
			source: 'projects',
			paint: {
				'circle-pitch-alignment': 'map',
				'circle-pitch-scale': 'map',
				'circle-color': themes.light.primary[500],
				'circle-opacity': 0.8,
				// 'circle-blur': 0.2,
				'circle-stroke-width': 5,
				'circle-stroke-color': themes.light.primary[700],
				'circle-stroke-opacity': 0.25,
				'circle-radius': [
					'interpolate',
					['exponential', 2],
					['zoom'],
					0,
					0,
					20,
					[
						'/',
						['/', ['to-number', ['get', 'radius']], 0.075],
						['cos', ['*', ['to-number', ['get', 'lat']], ['/', Math.PI, 180]]],
					],
				],
			},
		});
	});

	map?.on('click', 'projects', goToProject);

	function goToProject(e: MapLayerMouseEvent) {
		if (e.features && e.features.length && e.features[0]?.properties?.id) {
			goto(`/projets/${e.features[0].properties.id}`);
		}
	}

	onDestroy(() => {
		// if (map && map.getLayer('projects')) {
		// 	map.removeLayer('projects');
		// }
		// map?.removeLayer('projects');
		// map?.removeSource('projects');
	});
</script>

<!-- Template here -->
<style lang="scss">
</style>

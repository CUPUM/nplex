<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { DRAW_EVENTS } from '$utils/enums';
	import type { DrawCreateEvent, DrawRenderEvent } from '@mapbox/mapbox-gl-draw';
	import type { Position } from '@turf/turf';
	import {
		createCircle,
		getCircleCenter,
		getCircleRadius,
		isCircle,
		setCircleRadius,
	} from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { onDestroy } from 'svelte';
	import { projectData } from '../common';
	import { LOCATION_DEFAULT_RADIUS, LOCATION_MAX_RADIUS, map, mapDraw } from './common';

	const FEATURE_KEY = 'projectLocationCircle';

	function isLocationCircle(feature: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>) {
		return isCircle(feature); //&& feature.properties && FEATURE_KEY in feature.properties;
	}

	const onRender = (e: DrawRenderEvent) => {
		if (!$mapDraw) return;
		const selected = $mapDraw.getSelected();
		const locationCircle = selected.features.find(isLocationCircle);
		if (locationCircle) {
			const center = getCircleCenter(locationCircle);
			let radius = getCircleRadius(locationCircle) * 1000;
			if (radius > LOCATION_MAX_RADIUS) {
				radius = LOCATION_MAX_RADIUS;
				setCircleRadius(locationCircle, radius);
				// console.log($map?.querySourceFeatures(DRAW_SOURCES.Hot));
			}
			$projectData.location.center = center;
			$projectData.location.radius = radius;
		}
	};

	function onCreate(e: DrawCreateEvent) {
		// Clear previously created features, limit to 1 drawn feature.
		const del = $mapDraw?.getAll().features.reduce((acc, feature) => {
			if (isLocationCircle(feature) && feature.id !== e.features[0].id) {
				acc.push(feature.id + '');
			}
			return acc;
		}, Array<string>(0));
		if (del && del.length) {
			$mapDraw?.delete(del);
		}
	}

	function drawCircle(center?: Position, radius: number = LOCATION_DEFAULT_RADIUS) {
		if (!$map || !$mapDraw) {
			return;
		}
		center ??= $map.getCenter().toArray();
		const circle = createCircle(center, radius / 1000, { [FEATURE_KEY]: true });
		$mapDraw.add(circle);
		$map.fire(DRAW_EVENTS.Create, { features: [circle] });
	}

	$: if ($map) {
		$map.on(DRAW_EVENTS.Create, onCreate);
		$map.on(DRAW_EVENTS.Render, onRender);
		// $map.on(DRAW_EVENTS.Update, (e) => console.log(e));
	}

	let inited = false;
	$: if ($mapDraw) {
		if (!inited) {
			inited = true;
			if ($projectData.location.center && $projectData.location.radius) {
				// Add initial circle programatically.
				drawCircle($projectData.location.center as [number, number], $projectData.location.radius);
			}
		}
	}

	onDestroy(() => {
		if ($map) {
			$map.off(DRAW_EVENTS.Create, onCreate);
			$map.off(DRAW_EVENTS.Render, onRender);
		}
	});
</script>

<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Emplacement</h3>
	<p>
		<kbd>
			<Icon name="path-circle" />
		</kbd>
	</p>
	<p class="info">
		Situez le projet sur la carte ci-contre en y dessinant un cercle. Notez que le diamètre du
		cercle permet de garder l'emplacement confidentiel lorsque le projet sera publié.
	</p>
	<p class="info">
		Assurrez-vous toutefois que le centre du cercle correspond bien à l'emplacement du projet. Son
		bon positionnement est essentiel pour permettre d'extrapoler des données supplémentaires.
	</p>
	<input
		type="hidden"
		readonly
		name="location"
		value={JSON.stringify({
			center: $projectData.location.center,
			radius: $projectData.location.radius,
		})}
	/>
</fieldset>

<style lang="scss">
	kbd {
		display: inline-block;
		margin-bottom: 0.25em;
	}
</style>

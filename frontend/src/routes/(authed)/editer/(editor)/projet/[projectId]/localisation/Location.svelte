<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import { MAP_DRAW_EVENTS } from '$utils/enums';
	import { throttle } from '$utils/modifiers';
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
	import {
		editorMap,
		editorMapDraw,
		isLocationCircle,
		LOCATION_DEFAULT_RADIUS,
		LOCATION_FEATURE_FLAG,
		LOCATION_MAX_RADIUS,
	} from './common';

	const onRender = throttle((e: DrawRenderEvent) => {
		if (!$editorMapDraw) return;
		const selected = $editorMapDraw.getSelected();
		const locationCircle = selected.features.find(isLocationCircle);
		if (locationCircle) {
			const center = getCircleCenter(locationCircle);
			let radius = getCircleRadius(locationCircle) * 1000;
			if (radius > LOCATION_MAX_RADIUS) {
				radius = LOCATION_MAX_RADIUS;
				setCircleRadius(locationCircle, radius / 1000);
				// console.log($editorMap?.querySourceFeatures(MAP_DRAW_SOURCES.Hot));
			}
			$projectData.location.center = center;
			$projectData.location.radius = radius;
		}
	}, 100);

	// function onUpdate(e: DrawUpdateEvent) {
	// 	const locationCircle = e.features.find(isLocationCircle);
	// 	if (locationCircle) {
	// 		console.log(locationCircle);
	// 	}
	// }

	function onCreate(e: DrawCreateEvent) {
		// Only apply if creted feature is a circle.
		if (!isCircle(e.features[0])) return;
		// Clear previously created features, limit to 1 drawn feature.
		const del = $editorMapDraw?.getAll().features.reduce((acc, feature) => {
			if (isLocationCircle(feature) && feature.id !== e.features[0].id) {
				acc.push(feature.id + '');
			}
			return acc;
		}, Array<string>(0));
		if (del && del.length) {
			$editorMapDraw?.delete(del);
		}
	}

	function drawCircle(center?: Position, radius: number = LOCATION_DEFAULT_RADIUS) {
		if (!$editorMap || !$editorMapDraw) {
			return;
		}
		center ??= $editorMap.getCenter().toArray();
		const circle = createCircle(center, radius / 1000, { [LOCATION_FEATURE_FLAG]: true });
		$editorMapDraw.add(circle);
		$editorMap.fire(MAP_DRAW_EVENTS.Create, { features: [circle] });
	}

	$: if ($editorMap) {
		$editorMap.on(MAP_DRAW_EVENTS.Create, onCreate);
		$editorMap.on(MAP_DRAW_EVENTS.Render, onRender);
		// $editorMap.on(MAP_DRAW_EVENTS.Update, onUpdate);
	}

	let inited = false;
	$: if ($editorMapDraw) {
		if (!inited) {
			inited = true;
			if ($projectData.location.center && $projectData.location.radius) {
				// Add initial circle programatically.
				drawCircle($projectData.location.center as [number, number], $projectData.location.radius);
			}
		}
	}

	onDestroy(() => {
		if ($editorMap) {
			$editorMap.off(MAP_DRAW_EVENTS.Create, onCreate);
			$editorMap.off(MAP_DRAW_EVENTS.Render, onRender);
		}
	});
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Emplacement</h3>
	<div id="editor-location-info">
		<p>
			Situez le projet sur la carte ci-contre en y dessinant un cercle. Recherchez cette icône dans
			la barre d'outils de la carte. Notez que le diamètre du cercle permet de garder l'emplacement
			relativement confidentiel lorsque le projet est publié.
		</p>
		<kbd class="text-lg"><Icon name="path-circle" /></kbd>
	</div>
	<div id="editor-location-values">
		<Field
			variant="outlined"
			readonly
			type="number"
			value={$projectData.location?.center?.[0]?.toFixed(4)}
		>
			<svelte:fragment slot="label">Longitude</svelte:fragment>
		</Field>
		<Field
			variant="outlined"
			readonly
			type="number"
			value={$projectData.location?.center?.[1]?.toFixed(4)}
		>
			<svelte:fragment slot="label">Lattitude</svelte:fragment>
		</Field>
		<Field
			variant="outlined"
			readonly
			type="number"
			value={$projectData.location?.radius?.toFixed(0)}
			suffix="&ensp;m"
			textAlign="end"
		>
			<svelte:fragment slot="label">Rayon</svelte:fragment>
		</Field>
	</div>
	<input
		type="hidden"
		readonly
		name="location"
		value={JSON.stringify({
			center: $projectData.location.center,
			radius: $projectData.location.radius,
		})}
	/>
	<p class="subtle">
		Assurrez-vous toutefois que le centre du cercle correspond bien à l'emplacement du projet. Son
		bon positionnement est essentiel pour nous permettre d'extrapoler des données supplémentaires de
		manière minimalement fiable.
	</p>
</fieldset>

<style lang="scss">
	#editor-location-values {
		display: grid;
		grid-template-areas:
			'lon lat'
			'radius radius';
		grid-template-columns: 1fr 1fr;
		flex-direction: column;
		max-width: var(--ui-width-sm);
		gap: 1.5rem;
		margin-top: 3rem;
	}

	#editor-location-info {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-items: flex-start;
	}
</style>

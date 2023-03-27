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
	import {
		LOCATION_DEFAULT_RADIUS,
		LOCATION_FEATURE_FLAG,
		LOCATION_MAX_RADIUS,
	} from '../../constants';
	import { isLocationCircle } from '../../schemas';
	import { project } from '../common';
	import { editorMap, editorMapDraw } from './common';

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
			// $project.location.center = center;
			// $project.location.radius = radius;
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
			if ($project.location.center && $project.location.radius) {
				// Add initial circle programatically.
				drawCircle($project.location.center as [number, number], $project.location.radius);
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
	<p>Situez le projet sur la carte ci-contre en y dessinant un cercle.</p>
	<div id="editor-location-info" class="subtle">
		<p>
			Recherchez cette icône dans la barre d'outils de la carte. Notez que le diamètre du cercle
			permet de garder l'emplacement relativement confidentiel lorsque le projet est publié.
			Assurrez-vous toutefois que le centre du cercle correspond bien à l'emplacement du projet. Son
			bon positionnement est essentiel pour nous permettre d'extrapoler des données supplémentaires
			de manière minimalement fiable.
		</p>
		<kbd class="text-lg"><Icon name="path-circle" /></kbd>
	</div>
	<div id="editor-location-values">
		<Field
			variant="default"
			readonly
			type="number"
			value={$project.location.center?.[0]?.toFixed(4)}
			style="grid-area: lon"
		>
			<svelte:fragment slot="label">Longitude</svelte:fragment>
		</Field>
		<Field
			variant="default"
			readonly
			type="number"
			value={$project.location.center?.[1]?.toFixed(4)}
			style="grid-area: lat"
		>
			<svelte:fragment slot="label">Lattitude</svelte:fragment>
		</Field>
		<Field
			variant="default"
			readonly
			type="number"
			value={$project.location.radius?.toFixed(0)}
			suffix="&ensp;m"
			style="grid-area: radius"
		>
			<svelte:fragment slot="label">Rayon</svelte:fragment>
		</Field>
	</div>
	<input
		type="hidden"
		readonly
		name="location"
		value={JSON.stringify({
			center: $project.location.center,
			radius: $project.location.radius,
		})}
	/>
</fieldset>

<style lang="scss">
	#editor-location-values {
		display: grid;
		grid-template-areas:
			'lon radius'
			'lat empty';
		grid-template-columns: 1fr 1fr;
		flex-direction: column;
		max-width: var(--ui-width-sm);
		gap: 1.5rem 3rem;
		margin-top: 1.5rem;
	}

	#editor-location-info {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-items: flex-start;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import Dirty from '$components/Dirty.svelte';
	import Icon from '$components/Icon.svelte';
	import { DRAW_EVENTS } from '$utils/enums';
	import { throttle } from '$utils/modifiers';
	import type { DrawCreateEvent, DrawRenderEvent } from '@mapbox/mapbox-gl-draw';
	import type { Position } from '@turf/turf';
	import {
		getCircleCenter,
		getCircleRadius,
		setCircleRadius,
	} from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { onDestroy } from 'svelte';
	import { editorDirty } from '../../../common';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';
	import type { PageData } from './$types';
	import { locationRadius, LOCATION_MAX_RADIUS, map, mapDraw } from './common';

	$: ({ location } = ($page.data as PageData).project);
	$: editRadius = location.radius;
	let editCenter: Position;
	function sync() {
		editCenter = [...location.geometry!.coordinates];
	}
	$: if (location.geometry) sync();

	const updateLocation = throttle((e: DrawRenderEvent) => {
		if ($mapDraw) {
			const feature = $mapDraw.getAll().features[0];
			if (feature) {
				let radius = getCircleRadius(feature) * 1000;
				if (radius > LOCATION_MAX_RADIUS) {
					radius = LOCATION_MAX_RADIUS;
					setCircleRadius(feature, radius);
				}
				editCenter = getCircleCenter(feature);
				$locationRadius = radius;
			}
		}
	}, 100);

	function onCreate(e: DrawCreateEvent) {
		const del = $mapDraw?.getAll().features.reduce((acc, feature) => {
			if (feature.id != null && feature.id != e.features[0].id) {
				acc.push(feature.id + '');
			}
			return acc;
		}, Array<string>(0));
		if (del && del.length) {
			$mapDraw?.delete(del);
		}
	}

	// function create() {
	// 	if ($map && $mapDraw) {
	// 		const center = $map.getCenter().toArray();
	// 		const circle = createCircle(center, LOCATION_DEFAULT_RADIUS / 1000);
	// 		$mapDraw.add(circle);
	// 		$map.fire(DRAW_EVENTS.Create, { features: [circle] });
	// 	}
	// }

	$: if ($map) {
		/**
		 * Clear previously created features, limit to 1 drawn feature.
		 */
		$map.on(DRAW_EVENTS.Create, onCreate);
		$map.on(DRAW_EVENTS.Render, updateLocation);
	}

	onDestroy(() => {
		if ($map) {
			$map.off(DRAW_EVENTS.Create, onCreate);
			$map.off(DRAW_EVENTS.Render, updateLocation);
		}
	});
</script>

<Dirty
	sample={{ radius: location.radius, center: location.geometry?.coordinates }}
	specimen={{ radius: editRadius, center: editCenter }}
	bind:dirty={$editorDirty.location}
/>
<EditorFormgroup legend="Emplacement">
	<p class="ui-info">
		<kbd>
			<Icon name="path-circle" />
		</kbd>
		Situez le projet sur la carte ci-contre en y dessinant un cercle. Notez que le diamètre du cercle
		permet de garder l'emplacement confidentiel lorsque le projet sera publié.
	</p>
	<p class="ui-info">
		Assurrez-vous toutefois que le centre du cercle correspond bien à l'emplacement du projet. Son
		bon positionnement est essentiel pour permettre d'extrapoler des données supplémentaires.
	</p>
	<input
		type="hidden"
		readonly
		name="location"
		value={JSON.stringify({ center: editCenter, radius: editRadius })}
	/>
</EditorFormgroup>

<style lang="scss">
	fieldset {
		font-size: var(--ui-text-sm);
	}
</style>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { DRAW_EVENTS } from '$components/MapDraw.svelte';
	import { throttle } from '$utils/modifiers';
	import type { DrawCreateEvent, DrawRenderEvent, DrawUpdateEvent } from '@mapbox/mapbox-gl-draw';
	import {
		getCircleCenter,
		getCircleRadius,
		isCircle,
		setCircleRadius,
	} from 'mapbox-gl-draw-geodesic';
	import type { PageData } from './$types';
	import { LOCATION_MAX_RADIUS, map, mapdraw, project } from './common';

	export let geometry: PageData['project']['location_geometry'];
	export let radius: PageData['project']['location_radius'];

	let inited = false;

	const updateLocationGeometry = throttle((e: DrawRenderEvent) => {
		if ($mapdraw) {
			const selected = $mapdraw.getSelected();
			if (selected.features.length && isCircle(selected.features[0])) {
				const radius = getCircleRadius(selected.features[0]) * 1000;
				if (radius > LOCATION_MAX_RADIUS) {
					setCircleRadius(selected.features[0], LOCATION_MAX_RADIUS);
				}
				const center = getCircleCenter(selected.features[0]);
				$project.location_geometry = center;
			}
		}
	}, 50);

	$: if ($map) {
		if (!inited) {
			$map.on(DRAW_EVENTS.create, (e: DrawCreateEvent) => {
				// Clear previously created features, limit drawn features to 1.
				const del = $mapdraw?.getAll().features.reduce((acc, feature) => {
					if (feature.id != null && feature.id != e.features[0].id) {
						acc.push(feature.id + '');
					}
					return acc;
				}, Array<string>(0));
				if (del && del.length) {
					$mapdraw?.delete(del);
				}
			});

			$map.on(DRAW_EVENTS.update, (e: DrawUpdateEvent) => {
				console.log('update');
			});

			$map.on(DRAW_EVENTS.actionable, (e) => {
				console.log('actionable', e);
			});

			$map.on(DRAW_EVENTS.render, (e: DrawRenderEvent) => {
				updateLocationGeometry(e);
			});
		}
		inited = true;
	}

	function setCircleMode() {
		// if ($map && $draw) {
		// 	console.log($draw.getMode() == mode);
		// 	if ($draw.getMode() == mode) {
		// 		$draw.changeMode(DRAW_MODES.simple_select as any);
		// 		$draw.changeMode(DRAW_MODES.simple_select as any);
		// 	} else {
		// 		$draw.changeMode(mode as any, { initialRadiusInKm: LOCATION_DEFAULT_RADIUS_KM });
		// 	}
		// 	$map.fire(DRAW_EVENTS.modechange, { mode });
		// }
	}
</script>

<fieldset class="site-formgroup">
	<legend class="site-formgroup-legend">Localisation</legend>
	<section class="site-formgroup-fields">
		Situez votre projet sur la carte ci-contre.
		<Button on:pointerdown={setCircleMode}>
			<Icon name="path-circle" slot="leading" />
			Tracer une zone approximative.
		</Button>
		<input type="hidden" name="location_geojson" />
	</section>
</fieldset>

<style lang="scss">
</style>

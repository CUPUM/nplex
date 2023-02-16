<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { DRAW_EVENTS } from '$utils/enums';
	import { throttle } from '$utils/modifiers';
	import type { DrawCreateEvent, DrawRenderEvent } from '@mapbox/mapbox-gl-draw';
	import {
		createCircle,
		getCircleCenter,
		getCircleRadius,
		setCircleRadius,
	} from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { onDestroy } from 'svelte';
	import { dirty } from '../common';
	import type { PageData } from './$types';
	import {
		locationRadius,
		LOCATION_DEFAULT_RADIUS,
		LOCATION_MAX_RADIUS,
		map,
		mapDraw,
	} from './common';

	$: location = ($page.data as PageData).project.location;
	let form_center: typeof location.geometry;
	let form_radius: typeof location.radius;

	$: $dirty.location = form_radius !== location.radius;

	const updateLocation = throttle((e: DrawRenderEvent) => {
		if ($mapDraw) {
			const feature = $mapDraw.getAll().features[0];
			if (feature) {
				let radius = getCircleRadius(feature) * 1000;
				if (radius > LOCATION_MAX_RADIUS) {
					radius = LOCATION_MAX_RADIUS;
					setCircleRadius(feature, radius);
				}
				form_center = getCircleCenter(feature);
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

	function create() {
		if ($map && $mapDraw) {
			const center = $map.getCenter().toArray();
			const circle = createCircle(center, LOCATION_DEFAULT_RADIUS / 1000);
			$mapDraw.add(circle);
			$map.fire(DRAW_EVENTS.Create, { features: [circle] });
		}
	}

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

<section class="editor-section">
	<h3 class="legend">Emplacement</h3>
	<p class="ui-info">
		Situez le site du projet sur la carte ci-contre en y dessinant un cercle. Le diamètre du cercle
		vous permet d'établir le niveau de précision avec lequel vous souhaitez localiser le projet.
	</p>
	<p class="ui-info">Assurrez-vous que votre tracé couvre bien l'emplacement du projet.</p>
	<fieldset>
		<Button on:pointerdown={create}>
			<Icon name="path-circle" slot="leading" />
			Situez votre projet sur la carte
		</Button>
		<input
			type="hidden"
			readonly
			name="location"
			value={JSON.stringify({ center: form_center, radius: form_radius })}
		/>
	</fieldset>
</section>

<style lang="scss">
	fieldset {
		font-size: var(--ui-text-sm);
	}
</style>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { DRAW_EVENTS, DRAW_MODES } from '$components/MapDraw.svelte';
	import { throttle } from '$utils/modifiers';
	import type { DrawCreateEvent, DrawRenderEvent } from '@mapbox/mapbox-gl-draw';
	import {
		getCircleCenter,
		getCircleRadius,
	} from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import { dirty, map, mapdraw, _location_radius } from './common';

	export let location: PageData['project']['location'];
	$: _location_center = location.geometry?.coordinates;
	$: $_location_radius = location.radius;

	$: $dirty.location =
		_location_center?.[0] !== location.geometry?.coordinates[0] ||
		_location_center?.[1] !== location.geometry?.coordinates[1] ||
		$_location_radius !== location.radius;

	const updateLocation = throttle((e: DrawRenderEvent) => {
		if ($mapdraw) {
			const selected = $mapdraw.getSelected();
			if (selected.features.length) {
				_location_center = getCircleCenter(selected.features[0]);
				$_location_radius = getCircleRadius(selected.features[0]) * 1000;
			}
		}
	}, 100);

	function onCreate(e: DrawCreateEvent) {
		const del = $mapdraw?.getAll().features.reduce((acc, feature) => {
			if (feature.id != null && feature.id != e.features[0].id) {
				acc.push(feature.id + '');
			}
			return acc;
		}, Array<string>(0));
		if (del && del.length) {
			$mapdraw?.delete(del);
		}
	}

	function setCircleMode() {
		if ($map && $mapdraw) {
			const newMode =
				$mapdraw.getMode() === DRAW_MODES.DrawCircle
					? DRAW_MODES.SimpleSelect
					: DRAW_MODES.DrawCircle;
			$mapdraw.changeMode(newMode as any);
			$map.fire(DRAW_EVENTS.modechange, { mode: newMode });
		}
	}

	$: if ($map) {
		/**
		 * Clear previously created features, limit to 1 drawn feature.
		 */
		$map.on(DRAW_EVENTS.create, onCreate);
		$map.on(DRAW_EVENTS.render, updateLocation);
	}

	onDestroy(() => {
		if ($map) {
			$map.off(DRAW_EVENTS.create, onCreate);
			$map.off(DRAW_EVENTS.render, updateLocation);
		}
	});
</script>

<fieldset class="site-formgroup">
	<legend class="site-formgroup-legend">Localisation</legend>
	<section class="site-formgroup-fields">
		Situez votre projet sur la carte ci-contre.
		<code>
			radius: {$_location_radius}
		</code>
		<Button on:pointerdown={setCircleMode}>
			<Icon name="path-circle" slot="leading" />
			Tracer une zone approximative.
		</Button>
		<input
			type="hidden"
			readonly
			name="location"
			value={JSON.stringify({ center: _location_center, radius: $_location_radius })}
		/>
	</section>
</fieldset>

<style lang="scss">
	fieldset {
		background: var(--ui-bg);
		border-radius: var(--ui-radius-lg);
		padding: 2rem;
	}
</style>

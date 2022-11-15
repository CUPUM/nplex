<script lang="ts" context="module">
</script>

<script lang="ts">
	import Map from '$components/Map.svelte';
	import MapControlDrawCircle from '$components/MapControlDrawCircle.svelte';
	import MapControlFile from '$components/MapControlFile.svelte';
	import MapControlFullscreen from '$components/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/MapControlGeolocate.svelte';
	import MapDraw, { MapDrawSourceId } from '$components/MapDraw.svelte';
	import MapPopup from '$components/MapPopup.svelte';
	import MapToolbar from '$components/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { throttle } from '$utils/function';
	import { dbProjectLocationSchema } from '$utils/validation';
	import type { DrawCreateEvent, DrawDeleteEvent, DrawRenderEvent, DrawUpdateEvent } from '@mapbox/mapbox-gl-draw';
	import distance from '@turf/distance';
	import type { LngLat, MapMouseEvent } from 'maplibre-gl';
	import type { ComponentProps } from 'svelte';
	import type { PageData } from './$types';

	export let project: PageData['project'];

	let location: string;
	let tracking = false;
	let map: ComponentProps<Map>['map'];
	let draw: ComponentProps<MapDraw>['draw'];
	let info = false;
	let mousedown = false;
	let r = 0;
	let lnglat: LngLat | null = null;

	$: if (draw && project && project.location_geometry) {
		const geojson = dbProjectLocationSchema.safeParse(project);
		if (!geojson.success) {
			messages.dispatch({
				content: `La géométrie récupérée de la base de données ne semble pas être valide. (${JSON.stringify(
					geojson.error
				)})`,
				type: 'error',
			});
		} else {
			draw.deleteAll();
			draw.add(geojson.data);
		}
	}

	function onMousemove(e: CustomEvent<MapMouseEvent>) {
		lnglat = e.detail.lngLat;
		if (!mousedown) info = false;
	}

	function onMouseup() {
		mousedown = false;
	}

	function onMousedown() {
		mousedown = true;
	}

	function updateLocationGeometry(e: CustomEvent<DrawCreateEvent | DrawUpdateEvent | DrawDeleteEvent>) {
		const feature = e.detail.features[0];
		if (draw) {
			switch (e.detail.type) {
				case 'draw.delete':
					draw.deleteAll();
					location = '';
					break;
				default:
					const prev = draw
						.getAll()
						.features.map((f) => (f.id ?? '') + '')
						.filter((id) => id && id !== feature.id);
					draw.delete(prev);
					location = JSON.stringify(feature);
					break;
			}
		}
	}

	const onRender = throttle((e: CustomEvent<DrawRenderEvent>) => {
		const sf = e.detail.target.querySourceFeatures(MapDrawSourceId.Hot);
		const pts = sf.filter(
			(f) => f.properties && f.properties.meta === 'vertex' && f.geometry.type === 'Point'
		) as GeoJSON.Feature<GeoJSON.Point>[];
		if (!(pts.length > 1)) return;
		r = +distance(pts[0].geometry.coordinates, pts[1].geometry.coordinates, { units: 'meters' });
		if (mousedown) info = true;
		else info = false;
	}, 10);
</script>

<section>
	<h3>Situez votre projet</h3>
	<Map
		cooperativeGestures={true}
		class="map"
		bind:map
		on:mousemove={onMousemove}
		on:mousedown={onMousedown}
		on:mouseup={onMouseup}
	>
		{#if info && lnglat}
			<MapPopup {lnglat} class="info" offset={[0, -10]}>
				Rayon: {r.toFixed(0)}m
			</MapPopup>
		{/if}
		<MapDraw
			bind:draw
			on:create={updateLocationGeometry}
			on:update={updateLocationGeometry}
			on:delete={updateLocationGeometry}
			on:render={onRender}
		>
			<MapToolbar position="left" direction="column">
				<Tooltip
					message={tracking
						? 'Cesser de suivre votre position'
						: 'Centrer la carte sur votre localisation actuelle'}
					place="right"
				>
					<div>
						<MapControlGeolocate
							on:trackuserlocationstart={() => (tracking = true)}
							on:trackuserlocationend={() => (tracking = false)}
						/>
					</div>
				</Tooltip>
				<Tooltip message="Activez le mode plein écran" place="right">
					<div>
						<MapControlFullscreen />
					</div>
				</Tooltip>
				<hr />
				<Tooltip message="Dessinez un cercle pour situer votre projet" place="right">
					<div>
						<MapControlDrawCircle variant="cta" />
					</div>
				</Tooltip>
				<Tooltip message="Téléversez un tracer géographique" place="right">
					<div>
						<MapControlFile disabled />
					</div>
				</Tooltip>
			</MapToolbar>
			<input type="hidden" readonly name="location" value={location} />
		</MapDraw>
	</Map>
</section>

<style lang="scss" module>
	section {
		width: 100%;
	}

	h3 {
		width: 100%;
		max-width: var(--ui-large);
		margin: 1em auto;
		font-size: var(--size-large);
		font-weight: 500;
	}

	.map {
		border-radius: 1.5rem;
		width: 100%;
		aspect-ratio: 3 / 2;
		height: unset;
		max-height: 80vh;
		max-width: var(--ui-large);
		margin: 0 auto;
	}

	.info {
		padding: 0.5rem 1rem;
		border-radius: var(--ui-radius);
		color: col(fg, 500);
		background: col(bg, 100);
		box-shadow: 0 1rem 3rem -1.5rem black;
	}
</style>

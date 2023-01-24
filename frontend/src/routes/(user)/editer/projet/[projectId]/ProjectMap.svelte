<script lang="ts">
	import Map from '$components/Map.svelte';
	import MapAttributionControl from '$components/MapAttributionControl.svelte';
	import MapControlDrawCircle from '$components/MapControlDrawCircle.svelte';
	import MapControlFile from '$components/MapControlFile.svelte';
	import MapControlFullscreen from '$components/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/MapControlGeolocate.svelte';
	import MapDraw from '$components/MapDraw.svelte';
	import MapToolbar from '$components/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { LOCATION_DEFAULT_RADIUS, map, mapdraw } from './common';

	// let location: string;
	let tracking = false;

	// function updateLocationGeometry(
	// 	e: CustomEvent<DrawCreateEvent | DrawUpdateEvent | DrawDeleteEvent>
	// ) {
	// 	const feature = e.detail.features[0];
	// 	if (draw) {
	// 		switch (e.detail.type) {
	// 			case 'draw.delete':
	// 				draw.deleteAll();
	// 				location = '';
	// 				break;
	// 			default:
	// 				const prev = draw
	// 					.getAll()
	// 					.features.map((f) => (f.id ?? '') + '')
	// 					.filter((id) => id && id !== feature.id);
	// 				draw.delete(prev);
	// 				location = JSON.stringify(feature);
	// 				break;
	// 		}
	// 	}
	// }

	// const onRender = throttle((e: CustomEvent<DrawRenderEvent>) => {
	// 	const sf = e.detail.target.querySourceFeatures(MapDrawSourceId.Hot);
	// 	const pts = sf.filter(
	// 		(f) => f.properties && f.properties.meta === 'vertex' && f.geometry.type === 'Point'
	// 	) as GeoJSON.Feature<GeoJSON.Point>[];
	// 	if (!(pts.length > 1)) return;
	// }, 10);
</script>

<Map cooperativeGestures={true} bind:map={$map}>
	<MapAttributionControl position="bottom-right" />
	<MapDraw bind:draw={$mapdraw}>
		<MapToolbar position="top left" direction="row">
			<Tooltip
				message={tracking
					? 'Cesser de suivre votre position'
					: 'Centrer la carte sur votre localisation actuelle'}
				place="bottom"
			>
				<div>
					<MapControlGeolocate
						on:trackuserlocationstart={() => (tracking = true)}
						on:trackuserlocationend={() => (tracking = false)}
					/>
				</div>
			</Tooltip>
			<Tooltip message="Activez le mode plein écran" place="bottom">
				<div>
					<MapControlFullscreen />
				</div>
			</Tooltip>
			<hr />
			<Tooltip message="Dessinez un cercle pour situer votre projet" place="bottom">
				<div>
					<MapControlDrawCircle initialRadiusInKm={LOCATION_DEFAULT_RADIUS / 1000} />
				</div>
			</Tooltip>
			<Tooltip message="Téléversez un tracer géographique" place="bottom">
				<div>
					<MapControlFile disabled />
				</div>
			</Tooltip>
		</MapToolbar>
		<input type="hidden" readonly name="location" value={location} />
	</MapDraw>
</Map>

<style lang="scss">
</style>

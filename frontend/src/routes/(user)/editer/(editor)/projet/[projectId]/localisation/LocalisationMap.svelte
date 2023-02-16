<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapAttributionControl from '$components/Map/MapAttributionControl.svelte';
	import MapControlDrawCircle from '$components/Map/MapControlDrawCircle.svelte';
	import MapControlFile from '$components/Map/MapControlFile.svelte';
	import MapControlFullscreen from '$components/Map/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/Map/MapControlGeolocate.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import MapToolbar from '$components/Map/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { MAP_STYLES } from '$utils/map/styles';
	import { LOCATION_DEFAULT_RADIUS, map, mapDraw } from './common';

	let tracking = false;
</script>

<Map cooperativeGestures={true} bind:map={$map} style={MAP_STYLES.Dark}>
	<MapAttributionControl position="bottom-left" />
	<MapDraw bind:draw={$mapDraw} mode="draw_circle">
		<MapToolbar position="top right" direction="column">
			<Tooltip
				message={tracking
					? 'Cesser de suivre votre position'
					: 'Centrer la carte sur votre position actuelle'}
				place="left"
			>
				<div>
					<MapControlGeolocate
						on:trackuserlocationstart={() => (tracking = true)}
						on:trackuserlocationend={() => (tracking = false)}
					/>
				</div>
			</Tooltip>
			<Tooltip message="Activez le mode plein écran" place="left">
				<div>
					<MapControlFullscreen />
				</div>
			</Tooltip>
			<hr />
			<Tooltip message="Dessinez un cercle pour situer votre projet" place="left">
				<div>
					<MapControlDrawCircle initialRadius={LOCATION_DEFAULT_RADIUS} />
				</div>
			</Tooltip>
			<Tooltip message="Téléversez un fichier de localisation" place="left">
				<div>
					<MapControlFile disabled />
				</div>
			</Tooltip>
		</MapToolbar>
	</MapDraw>
</Map>

<style lang="scss">
</style>

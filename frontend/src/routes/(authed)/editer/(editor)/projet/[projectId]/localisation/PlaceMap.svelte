<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapAttributionControl from '$components/Map/MapAttributionControl.svelte';
	import MapControlDrawCircle from '$components/Map/MapControlDrawCircle.svelte';
	import MapControlDrawMeasure from '$components/Map/MapControlDrawMeasure.svelte';
	import MapControlFile from '$components/Map/MapControlFile.svelte';
	import MapControlFullscreen from '$components/Map/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/Map/MapControlGeolocate.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import MapToolbar from '$components/Map/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import tonerDark from '$utils/map/styles/tonerDark';
	import { map, mapDraw } from './common';

	let tracking = false;
</script>

<Map cooperativeGestures={true} bind:map={$map} mapStyle={tonerDark} id="editor-map">
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
			<Tooltip message="Activer le mode plein écran" place="left">
				<div>
					<MapControlFullscreen />
				</div>
			</Tooltip>
			<hr />
			<Tooltip message="Dessiner un cercle pour situer le projet" place="left">
				<div>
					<MapControlDrawCircle />
				</div>
			</Tooltip>
			<Tooltip message="Téléverser un fichier de localisation" place="left">
				<div>
					<MapControlFile disabled />
				</div>
			</Tooltip>
			<Tooltip message="Prendre des mesures en traçant sur la carte" place="left">
				<div>
					<MapControlDrawMeasure />
				</div>
			</Tooltip>
		</MapToolbar>
	</MapDraw>
</Map>

<style lang="scss">
	:global(#editor-map) {
		border-radius: var(--ui-radius-lg);
		border: 1px solid col(fg, 100, 0.1);
	}
</style>

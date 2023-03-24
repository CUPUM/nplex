<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapAttributionControl from '$components/Map/MapAttributionControl.svelte';
	import MapControlDrawCircle from '$components/Map/MapControlDrawCircle.svelte';
	import MapControlDrawMeasure from '$components/Map/MapControlDrawMeasure.svelte';
	import MapControlDrawPolygon from '$components/Map/MapControlDrawPolygon.svelte';
	import MapControlFile from '$components/Map/MapControlFile.svelte';
	import MapControlFullscreen from '$components/Map/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/Map/MapControlGeolocate.svelte';
	import MapControlSelect from '$components/Map/MapControlSelect.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import MapSearch from '$components/Map/MapSearch.svelte';
	import MapToolbar from '$components/Map/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import tonerDark from '$utils/map/styles/tonerDark';
	import { editorMap, editorMapDraw } from './common';

	let tracking = false;
</script>

<Map cooperativeGestures={true} bind:map={$editorMap} mapStyle={tonerDark} id="editor-map">
	<MapDraw bind:draw={$editorMapDraw} mode="draw_circle" />
	<MapAttributionControl position="bottom-left" />
	<svelte:fragment slot="top-left">
		<MapSearch placeholder="Chercher une adresse" />
	</svelte:fragment>
	<svelte:fragment slot="top-right">
		<MapToolbar direction="column">
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
			<div>
				<MapControlSelect />
			</div>
			<Tooltip message="Dessiner un cercle pour situer le projet" place="left">
				<div>
					<MapControlDrawCircle />
				</div>
			</Tooltip>
			<Tooltip message="Dessiner un polygon pour mesurer une superficie" place="left">
				<div>
					<MapControlDrawPolygon />
				</div>
			</Tooltip>
			<Tooltip message="Téléverser un fichier de localisation" place="left">
				<div>
					<MapControlFile disabled />
				</div>
			</Tooltip>
			<Tooltip message="Prendre des mesures en traçant sur la carte" place="left">
				<div>
					<MapControlDrawMeasure disabled />
				</div>
			</Tooltip>
		</MapToolbar>
	</svelte:fragment>
</Map>

<style lang="scss">
	:global(#editor-map) {
		border-radius: var(--ui-radius-lg);
		border: 1px solid col(fg, 100, 0.1);
	}
</style>

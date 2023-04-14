<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapAttributionControl from '$components/Map/MapAttributionControl.svelte';
	import MapControlDrawCircle from '$components/Map/MapControlDrawCircle.svelte';
	import MapControlDrawPolygon from '$components/Map/MapControlDrawPolygon.svelte';
	import MapControlFile from '$components/Map/MapControlFile.svelte';
	import MapControlFullscreen from '$components/Map/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/Map/MapControlGeolocate.svelte';
	import MapControlLayers from '$components/Map/MapControlLayers.svelte';
	import MapControlSelect from '$components/Map/MapControlSelect.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import MapMarker from '$components/Map/MapMarker.svelte';
	import MapSearch from '$components/Map/MapSearch.svelte';
	import MapToolbar from '$components/Map/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import dark from '$util$utils/map/styles/dark
	import { editorMap, editorMapDraw } from './common';

	let tracking = false;
</script>

<Map cooperativeGestures={true} bind:map={$editorMap} mapStyle={dark} id="editor-map">
	<MapDraw bind:draw={$editorMapDraw} mode="draw_circle" />
	<MapAttributionControl position="bottom-left" />
	<svelte:fragment slot="top-left">
		<MapSearch placeholder="Chercher une adresse" let:lnglat>
			<MapMarker {lnglat} />
		</MapSearch>
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
			<Tooltip message="Activer le mode plein écran" place="left">
				<div>
					<MapControlFullscreen />
				</div>
			</Tooltip>
			<!-- <Tooltip message="Contrôler les calques de la carte"> -->
			<MapControlLayers place="left" align="start" />
			<!-- </Tooltip> -->
			<hr />
			<Tooltip message="Explorer la carte et sélectionner des tracés" place="left">
				<MapControlSelect />
			</Tooltip>
			<Tooltip message="Dessiner un cercle pour situer le projet" place="left">
				<MapControlDrawCircle />
			</Tooltip>
			<Tooltip message="Dessiner un polygon pour mesurer une superficie" place="left">
				<MapControlDrawPolygon />
			</Tooltip>
			<Tooltip message="Téléverser un fichier de localisation" place="left">
				<MapControlFile disabled />
			</Tooltip>
		</MapToolbar>
	</svelte:fragment>
</Map>

<style lang="scss">
	:global(#editor-map) {
		border-radius: var(--ui-radius-lg);
		// border: 1px solid col(fg, 100, 0.1);
		box-shadow: var(--ui-shadow-md);
	}
</style>

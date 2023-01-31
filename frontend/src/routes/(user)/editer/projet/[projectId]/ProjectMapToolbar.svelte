<script lang="ts">
	import MapControlDrawCircle from '$components/MapControlDrawCircle.svelte';
	import MapControlFile from '$components/MapControlFile.svelte';
	import MapControlFullscreen from '$components/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/MapControlGeolocate.svelte';
	import MapToolbar from '$components/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { LOCATION_DEFAULT_RADIUS } from './common';

	export let tracking = false;
</script>

<MapToolbar position="right" direction="column">
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

<style lang="scss">
</style>

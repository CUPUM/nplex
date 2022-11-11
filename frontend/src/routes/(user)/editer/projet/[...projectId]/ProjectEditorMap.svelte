<script lang="ts" context="module">
</script>

<script lang="ts">
	import Map from '$components/Map.svelte';
	import MapControlDrawCircle from '$components/MapControlDrawCircle.svelte';
	import MapControlFile from '$components/MapControlFile.svelte';
	import MapControlFullscreen from '$components/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/MapControlGeolocate.svelte';
	import MapDraw from '$components/MapDraw.svelte';
	import MapToolbar from '$components/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { dbProjectLocationSchema } from '$utils/validation';
	import type { DrawCreateEvent, DrawDeleteEvent, DrawUpdateEvent } from '@mapbox/mapbox-gl-draw';
	import type { ComponentProps } from 'svelte';
	import type { PageData } from './$types';

	export let project: PageData['project'];

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

	let location: string;
	let draw: ComponentProps<MapDraw>['draw'];

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
		console.log(location);
	}
</script>

<Map cooperativeGestures={true} class="map">
	<MapDraw
		bind:draw
		on:create={updateLocationGeometry}
		on:update={updateLocationGeometry}
		on:delete={updateLocationGeometry}
	>
		<MapToolbar position="top left">
			<Tooltip message="Localisez votre position actuelle" place="bottom" align="start">
				<div>
					<MapControlGeolocate />
				</div>
			</Tooltip>
			<Tooltip message="Activez le mode plein écran" place="bottom" align="start">
				<div>
					<MapControlFullscreen />
				</div>
			</Tooltip>
		</MapToolbar>
		<MapToolbar position="top right">
			<Tooltip message="Dessinez un cercle pour situer votre projet" place="bottom" align="end">
				<div>
					<MapControlDrawCircle variant="cta" />
				</div>
			</Tooltip>
			<Tooltip message="Téléversez un tracer géographique" place="bottom" align="end">
				<div>
					<MapControlFile disabled />
				</div>
			</Tooltip>
		</MapToolbar>
		<input type="hidden" readonly name="location" value={location} />
	</MapDraw>
</Map>

<style lang="scss" module>
	.map {
		border-radius: 1.5rem;
		width: 100%;
		aspect-ratio: 3 / 2;
		height: unset;
		max-height: 80vh;
		max-width: var(--ui-large);
		margin: 0 auto;
	}
</style>

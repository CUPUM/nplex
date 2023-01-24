<script lang="ts">
	import Map from '$components/Map.svelte';
	import MapAttributionControl from '$components/MapAttributionControl.svelte';
	import MapControlDrawCircle from '$components/MapControlDrawCircle.svelte';
	import MapControlFile from '$components/MapControlFile.svelte';
	import MapControlFullscreen from '$components/MapControlFullscreen.svelte';
	import MapControlGeolocate from '$components/MapControlGeolocate.svelte';
	import MapDraw, { DRAW_SOURCE_IDS } from '$components/MapDraw.svelte';
	import MapToolbar from '$components/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { throttle } from '$utils/modifiers';
	import { dbProjectLocationSchema } from '$utils/validation';
	import type {
		DrawCreateEvent,
		DrawDeleteEvent,
		DrawRenderEvent,
		DrawUpdateEvent,
	} from '@mapbox/mapbox-gl-draw';
	import type { ComponentProps } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let location: string;
	let tracking = false;
	let map: ComponentProps<Map>['map'];
	let draw: ComponentProps<MapDraw>['draw'];

	$: if (draw && data.project.location_geometry) {
		const geojson = dbProjectLocationSchema.safeParse(data.project);
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

	function updateLocationGeometry(
		e: CustomEvent<DrawCreateEvent | DrawUpdateEvent | DrawDeleteEvent>
	) {
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
		const sf = e.detail.target.querySourceFeatures(DRAW_SOURCE_IDS.Hot);
		const pts = sf.filter(
			(f) => f.properties && f.properties.meta === 'vertex' && f.geometry.type === 'Point'
		) as GeoJSON.Feature<GeoJSON.Point>[];
		if (!(pts.length > 1)) return;
	}, 10);
</script>

<Map cooperativeGestures={true} bind:map>
	<MapAttributionControl position="bottom-left" />
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
					<MapControlDrawCircle />
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

<style lang="scss">
</style>

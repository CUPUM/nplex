<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon/Icon.svelte';

	import Map from '$components/Map.svelte';
	import MapGeolocateControl from '$components/MapGeolocateControl.svelte';
	import MapToolbar from '$components/MapToolbar.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import FormGroup from './FormGroup.svelte';
</script>

<FormGroup col="fullpad" legend="Localisez le site du projet">
	<div>
		<Map maxZoom={16} minZoom={12} cooperativeGestures>
			<MapToolbar position="top">
				<Tooltip message="Centrer la carte sur votre localisation actuelle" place="bottom">
					<MapGeolocateControl />
				</Tooltip>
				<hr />
				<Tooltip message="Importer un tracé géographique" place="bottom">
					<Button square variant="ghost">
						<Icon name="file-add" size="1.25em" />
					</Button>
				</Tooltip>
				<hr />
				<Tooltip message="Localiser le site à l'aide d'un point et d'un rayon d'ambiguïté" place="bottom">
					<Button square variant="ghost">
						<Icon name="path-circle" size="1.25em" />
					</Button>
				</Tooltip>
				<Tooltip message="Localiser le site en dessinant un tracé" place="bottom">
					<Button square variant="ghost">
						<Icon name="path-line" size="1.25em" />
					</Button>
				</Tooltip>
			</MapToolbar>
		</Map>
	</div>
</FormGroup>

<style lang="scss">
	div {
		width: 100%;
		height: 80vh;
	}
</style>

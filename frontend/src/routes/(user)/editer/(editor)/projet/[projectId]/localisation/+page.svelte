<script lang="ts">
	import { enhance } from '$app/forms';
	import Map from '$components/Map/Map.svelte';
	import MapAttributionControl from '$components/Map/MapAttributionControl.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import MapDrawCircle from '$components/Map/MapDrawCircle.svelte';
	import { MAP_STYLES } from '$utils/map/styles';
	import type { PageData } from './$types';
	import AdjacentStreets from './AdjacentStreets.svelte';
	import Area from './Area.svelte';
	import { map, mapDraw } from './common';
	import District from './District.svelte';
	import Location from './Location.svelte';
	import ProjectMapToolbar from './ProjectMapToolbar.svelte';

	export let data: PageData;
</script>

<form
	method="POST"
	action="?/update"
	use:enhance
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<section class="map">
		<Map cooperativeGestures={true} bind:map={$map} style={MAP_STYLES.Dark}>
			<MapAttributionControl position="bottom-right" />
			<MapDraw bind:draw={$mapDraw} mode="draw_circle">
				<ProjectMapToolbar />
				{#if data.project.location.geometry && data.project.location.radius}
					{#key data.project.location}
						<MapDrawCircle
							center={data.project.location.geometry?.coordinates}
							radius={data.project.location.radius}
						/>
					{/key}
				{/if}
			</MapDraw>
		</Map>
	</section>
	<section>
		<Location />
		<Area />
		<District />
		<AdjacentStreets adjacent_streets={data.project.adjacent_streets} />
		<h2>Détails du bâtiment</h2>
		<fieldset>
			<h3>Mode d'implantation</h3>
			<ul>
				{#each data.descriptors.implantationModes as mode}
					<li>
						<label>
							{mode.title}
							<input
								type="radio"
								name="implantation_mode_id"
								bind:group={data.project.implantation_mode_id}
								value={mode.id}
							/>
						</label>
					</li>
				{/each}
			</ul>
		</fieldset>
		<fieldset>
			<h3>Nombre d'étages</h3>
		</fieldset>
		<fieldset>
			<h3>Année de construction</h3>
		</fieldset>
		<fieldset>
			<h3>Emprise au sol</h3>
		</fieldset>
	</section>
</form>

<style lang="scss">
	form {
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-flow: dense;
	}

	.map {
		grid-column: 2;
		position: sticky;
		top: 0;
		margin-block: var(--ui-nav-h);
		top: var(--ui-nav-h);
		height: calc(100vh - 2 * var(--ui-nav-h));
		margin-right: 1.5rem;
		border-radius: var(--ui-radius-lg);
	}
</style>

<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Map from '$components/Map.svelte';
	import MapDraw from '$components/MapDraw.svelte';
	import MapFullscreenControl from '$components/MapFullscreenControl.svelte';
	import MapGeolocateControl from '$components/MapGeolocateControl.svelte';
	import Popup from '$components/Popup.svelte';
	import type { DrawCreateEvent, DrawUpdateEvent } from '@mapbox/mapbox-gl-draw';
	import { createCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
	import type { ComponentProps } from 'svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: if (draw && data.project?.location_geometry && data.project.location_radius) {
		const c = data.project.location_geometry.coordinates.reverse();
		draw.deleteAll();
		draw.add(createCircle(c, data.project.location_radius / 1000));
	}

	let location: string;
	let draw: ComponentProps<MapDraw>['draw'];

	function updateLocationGeometry(e: CustomEvent<DrawCreateEvent | DrawUpdateEvent>) {
		const feature = e.detail.features[0];
		if (draw && draw.getAll().features.length > 1) {
			const prev = draw
				.getAll()
				.features.map((f) => (f.id ?? '') + '')
				.filter((id) => id && id !== feature.id);
			draw.delete(prev);
		}
		location = JSON.stringify(feature);
	}
</script>

<form
	id="edit-project"
	method="POST"
	action="?/upsert"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h2>Général</h2>
	<Field
		type="text"
		name="title"
		id="project-title"
		placeholder="Titre du projet"
		value={data.project?.title ?? ''}
	/>
	<br />
	<br />
	<textarea
		name="description"
		id="project-description"
		placeholder="Description générale"
		value={data.project?.description ?? ''}
	/>
	<br />
	<br />
	<input type="file" name="" id="images" accept="image/jpeg, image/png" multiple />
	<br />
	<br />
	<Map cooperativeGestures={true} class="map">
		<!-- <MapFileControl /> -->
		<MapFullscreenControl />
		<MapGeolocateControl />
		<MapDraw bind:draw on:create={updateLocationGeometry} on:update={updateLocationGeometry} />
		<input type="hidden" readonly name="location" value={location} />
	</Map>
	<Button on:click={() => draw?.changeMode('draw_circle')}
		><Icon name="path-circle" slot="leading" />Dessiner un cercle</Button
	>
	<menu>
		<Button type="submit">{data.project ? 'Mettre à jour' : 'Créer'}</Button>
	</menu>
</form>
<form action="">
	<h2>Visibilité de la fiche</h2>
	<h3>Partager les droits d'édition</h3>
	<input type="search" />
	<h3>Publier</h3>
	<Popup>
		<input type="checkbox" name="" on:input id="" slot="trigger" />
		Some stuff
	</Popup>
	<h3>Supprimer</h3>
	<Button variant="danger">Supprimer le projet</Button>
</form>

<style lang="scss" module>
	form {
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}

	h2 {
		all: unset;
		display: block;
		font-size: var(--size-xlarge);
		font-weight: 500;
		margin-block: 1em;
	}

	h3 {
		all: unset;
		display: block;
		font-size: var(--size-large);
		font-weight: 550;
		margin-block: 1em;
	}

	.map {
		overflow: hidden;
		border-radius: 1.5rem;
		width: 100%;
		height: 500px;
	}

	menu {
		bottom: 2rem;
		position: sticky;
	}
</style>

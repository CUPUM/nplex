<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { MAP_DRAW_EVENTS } from '$utils/enums';
	import type { DrawSelectionChangeEvent } from '@mapbox/mapbox-gl-draw';
	import { area } from '@turf/turf';
	import { onDestroy } from 'svelte';
	import { projectData } from '../common';
	import { editorMap } from './common';

	const ttip = 'Synchroniser avec le dessin sélectionné sur la carte.';

	let selected: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> | null = null;

	function getSelectedArea() {
		if (!selected) return;
		return Math.round(area(selected));
	}

	function handleMapSelection(e: DrawSelectionChangeEvent) {
		if (e.features.length) {
			selected = e.features[0];
		} else {
			selected = null;
		}
	}

	$: if ($editorMap) {
		$editorMap.on(MAP_DRAW_EVENTS.SelectionChange, handleMapSelection);
	}

	onDestroy(() => {
		$editorMap?.off(MAP_DRAW_EVENTS.SelectionChange, handleMapSelection);
	});
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Superficies</h3>
	<p>Établissez les diverses superficies qui caractérisent le projet.</p>
	<div id="project-areas-info">
		<p>
			Vous pouvez utiliser l'outil de mesure disponible sur la carte pour vous aider à évaluer
			l'aire. Cherchez ce bouton dans la palette d'outils de la carte. Notez que les tracés produits
			avec cet outil ne sont pas sauvegardés.
		</p>
		<kbd class="text-lg"><Icon name="path-polygon" /></kbd>
	</div>
	<div id="project-areas">
		<Field
			bind:value={$projectData.site_area}
			variant="outlined"
			type="number"
			suffix="&ensp;m²"
			min={0}
			textAlign="end"
		>
			<svelte:fragment slot="leading">
				<Tooltip message={ttip}>
					<Button
						type="button"
						on:click={() => {
							$projectData.site_area = getSelectedArea() ?? $projectData.site_area;
						}}
						disabled={!selected}
						equi
					>
						<Icon name="refresh" />
					</Button>
				</Tooltip>
			</svelte:fragment>
			<svelte:fragment slot="label">Aire du site</svelte:fragment>
		</Field>
		<Field
			bind:value={$projectData.building_area}
			variant="outlined"
			type="number"
			suffix="&ensp;m²"
			min={0}
			textAlign="end"
		>
			<svelte:fragment slot="leading">
				<Tooltip message={ttip}>
					<Button
						type="button"
						on:click={() => {
							$projectData.building_area = getSelectedArea() ?? $projectData.building_area;
						}}
						disabled={!selected}
						equi
					>
						<Icon name="refresh" />
					</Button>
				</Tooltip>
			</svelte:fragment>
			<svelte:fragment slot="label">Aire du bâtiment</svelte:fragment>
		</Field>
		<Field disabled variant="outlined" type="number" suffix="&ensp;m²" min={0} textAlign="end">
			<svelte:fragment slot="leading">
				<Tooltip message={ttip}>
					<Button type="button" disabled={!selected} equi><Icon name="refresh" /></Button>
				</Tooltip>
			</svelte:fragment>
			<svelte:fragment slot="label">Surface des travaux</svelte:fragment>
		</Field>
	</div>
</fieldset>

<style lang="scss">
	#project-areas-info {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-items: flex-start;
		opacity: 0.5;

		p {
			margin: 0;
		}
	}

	#project-areas {
		max-width: 250px;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: stretch;
		width: 100%;
		margin-top: 3rem;
	}
</style>

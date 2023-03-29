<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { MAP_DRAW_EVENTS } from '$utils/enums';
	import type { DrawSelectionChangeEvent } from '@mapbox/mapbox-gl-draw';
	import { area } from '@turf/turf';
	import { onDestroy } from 'svelte';
	import { project } from '../common';
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
	<h3 class="editor-form-group-title">Aires</h3>
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
			name="site_area"
			bind:value={$project.site_area}
			variant="default"
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
							$project.site_area = getSelectedArea() ?? $project.site_area;
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
			name="building_area"
			bind:value={$project.building_area}
			variant="default"
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
							$project.building_area = getSelectedArea() ?? $project.building_area;
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
		<Field
			name="interventions_area"
			bind:value={$project.interventions_area}
			variant="default"
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
							$project.interventions_area = getSelectedArea() ?? $project.interventions_area;
						}}
						disabled={!selected}
						equi
					>
						<Icon name="refresh" />
					</Button>
				</Tooltip>
			</svelte:fragment>
			<svelte:fragment slot="label">Aire totale des travaux</svelte:fragment>
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

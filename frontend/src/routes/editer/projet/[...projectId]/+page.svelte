<script lang="ts">
	import Field from '$components/primitives/Field.svelte';
	import Map from '$components/primitives/Map.svelte';
	import MapGeolocateControl from '$components/primitives/MapGeolocateControl.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
	import { getPersistedValue, persistValue } from '$utils/persistValue';
	import { LocalStorage } from '$utils/values/keys';
	import { sizes } from '$utils/values/sizes';
	import type { PageData } from './$types';
	import ProjectEditorHeader from './ProjectEditorHeader.svelte';
	import ProjectEditorToolbar from './ProjectEditorToolbar.svelte';

	export let data: PageData;

	const targetForm = 'form-project-editor';

	console.log(data.project.created_at, data.project.updated_at);

	// If it is a new project, check local storage for persisted version...
	if (data.isNew) {
		data.project = getPersistedValue(LocalStorage.NewProject, data.project);
	}
	// ...and reactively persist changes locally, until the user saves the project in the database.
	$: if (data.isNew) {
		data.project.updated_at = Date.now().toString();
		persistValue(LocalStorage.NewProject, data.project);
	}

	// function addSecondaryUsage() {
	// 	const hasNone = !(project.site_secondary_usages as []).length;
	// 	const hasNoEmpty = (project.site_secondary_usages as []).every((u) => {
	// 		return Object.entries(u).every(([k, v]) => {
	// 			return v != newSiteUsage[k];
	// 		});
	// 	});
	// 	if (hasNone || hasNoEmpty) {
	// 		project.site_secondary_usages.push(newSiteUsage);
	// 		project = project;
	// 	}
	// }

	// function removeSecondaryUsage(index: number) {
	// 	(project.site_secondary_usages as []).splice(index, 1);
	// 	project = project;
	// }

	// async function createProject() {
	// 	if (isNew) {
	// 		const res = await fetch('/api/projects/new.json', {
	// 			method: 'POST',
	// 			body: JSON.stringify(project as any),
	// 		});
	// 	}
	// }

	function createProject() {
		// Insert in supabase
		// Goto projectId route
	}
</script>

<ProjectEditorHeader {data} />
<form id={targetForm} on:submit|preventDefault={createProject}>
	<ProjectEditorToolbar target={targetForm} />
	<!-- <FieldV2 bind:value={project.title} placeholder="Ceci est le placeholder">
			<svelte:fragment slot="legend">Titre du projet</svelte:fragment>
		</FieldV2> -->
	<section>
		<Field size={sizes.large} variant="outlined" bind:value={data.project.title}>
			<svelte:fragment slot="label">Titre du projet</svelte:fragment>
		</Field>
	</section>
	<section>
		<legend>Type de projet:</legend>
		<!-- {#each descriptors.types as t}
				<label>
					{t.title}
					<input type="radio" bind:group={project.type_id} name="type" value={t.id} required />
				</label>
			{/each} -->
	</section>
	<section class="map-container">
		<legend>Localisez</legend>
		<Map>
			<MapToolbar position="top-left" slot="top-left">
				<MapGeolocateControl />
			</MapToolbar>
		</Map>
	</section>
	<section>
		<legend>Usage principal du site</legend>
		<fieldset>
			<legend>Catégorie d'usage</legend>
		</fieldset>
		<fieldset>
			<legend>Usage</legend>
		</fieldset>
	</section>
	<section>
		<h2>Autre titre provisoire</h2>
		<!-- <legend>Usage(s) secondaire(s) du site</legend>
			{#each project.site_secondary_usages as secondary_usage, i}
				<Button on:click={() => removeSecondaryUsage(i)}>Effacer</Button>
				<fieldset>
					<legend>Catégorie d'usage</legend>
				</fieldset>
				<fieldset>
					<legend>Usage</legend>
				</fieldset>
			{/each}
			<Button on:click={addSecondaryUsage} icon="plus">Définir un usage secondaire</Button> -->
	</section>
</form>

<style lang="scss">
	form {
		@include mixins.core-grid;
		position: relative;
		border-radius: 2rem 2rem 0 0;
		padding: 4rem 0;
		background-color: var(--bg-color);

		&::before {
			content: '';
			position: absolute;
			width: calc(100% - var(--scroll-size));
			height: 100vh;
			left: 0;
			top: 0;
			border-radius: 2rem 2rem 0 0;
			background-color: var(--bg-color);
			margin-top: -2rem;
			transform: translateY(calc(-0.2 * var(--scroll)));
		}
	}

	section {
		display: block;
		position: relative;
		counter-increment: (section);
		padding: 2rem 0;
		grid-column: main;
		margin: 0;
		border: none;

		legend {
			font-size: 2rem;
			padding: 2rem 0;
			margin: 0;
		}
	}
</style>

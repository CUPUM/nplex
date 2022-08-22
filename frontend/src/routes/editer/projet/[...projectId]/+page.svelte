<script lang="ts">
	import { reveal } from '$actions/reveal';

	import Field from '$components/primitives/Field.svelte';

	import Map from '$components/primitives/Map.svelte';
	import MapGeolocateControl from '$components/primitives/MapGeolocateControl.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
	import { slipMask } from '$utils/presets/reveal';
	import { sizes } from '$utils/values/sizes';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.isNew);

	// export let project: definitions['projects'] & any = isNew
	// 	? getPersistedValue(LocalStorage.NewProject, newProject)
	// 	: null;

	// $: if (isNew) {
	// 	project.updated_at = Date.now() + '';
	// 	persistValue(LocalStorage.NewProject, project);
	// }

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

	function createProject() {}
</script>

<form id="edit-form" on:submit|preventDefault={createProject}>
	{#if data.isNew}
		<h2 use:reveal={{ ...slipMask, splitDelimiter: /(.{3})/, rootMargin: '0px 0px' }}>Nouvelle fiche de projet</h2>
	{:else}
		<h2 use:reveal={{ ...slipMask, rootMargin: '0px 0px' }}>Fiche du projet: [nom du projet existant]</h2>
	{/if}
	<!-- <p>Dernière date de modiciation: {new Date(project.updated_at)}</p> -->
	<!-- <FieldV2 bind:value={project.title} placeholder="Ceci est le placeholder">
		<svelte:fragment slot="legend">Titre du projet</svelte:fragment>
	</FieldV2> -->
	<section>
		<Field size={sizes.large}>
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
	}

	h2 {
		grid-column: col1 / col2;
	}

	section {
		display: block;
		position: relative;
		counter-increment: (section);
		padding: 0;
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

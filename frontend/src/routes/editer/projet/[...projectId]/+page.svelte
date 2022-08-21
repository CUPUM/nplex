<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import type { Load } from '../$types';

	// const newSiteUsage = {
	// 	category_id: null,
	// 	usage_id: null,
	// };

	// const newProject = {
	// 	updated_at: Date.now(),
	// 	title: null,
	// 	type_id: null,
	// 	site_main_usage: newSiteUsage,
	// 	site_secondary_usages: [],
	// };

	// export const load: Load = async ({ params, fetch }) => {
	// 	try {
	// 		const descriptorsRes = await fetch('/api/projects/descriptors.json');
	// 		const descriptors = await descriptorsRes.json();
	// 		// If there is a projectId param, i.e. the client is looking to modify an existing project rather than on index page trying to create a new one.
	// 		if (params.projectId) {
	// 			const projectRes = await fetch(`/api/projects/${params.projectId}`);
	// 			const project = await projectRes.json();
	// 			return {
	// 				props: {
	// 					descriptors,
	// 					project,
	// 					isNew: false,
	// 				},
	// 			};
	// 		}
	// 		return {
	// 			props: {
	// 				descriptors,
	// 			},
	// 		};
	// 	} catch (error) {
	// 		console.error(error);
	// 		return {
	// 			status: 404,
	// 			// redirect: '/editer',
	// 		};
	// 	}
	// };
</script>

<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { inputOnReset } from '$actions/inputOnReset';
	import Button from '$components/primitives/Button_old.svelte';
	import FieldV2 from '$components/primitives/Field_v2.svelte';
	import Map from '$components/primitives/Map.svelte';
	import MapGeolocateControl from '$components/primitives/MapGeolocateControl.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
	import type { definitions } from '$types/database';
	import { getPersistedValue, persistValue } from '$utils/persistValue';
	import { LocalStorage } from '$utils/values/keys';

	export let data;

	export let descriptors: DatabaseRpc.ProjectDescriptors;
	export let isNew = true;
	export let project: definitions['projects'] & any = isNew
		? getPersistedValue(LocalStorage.NewProject, newProject)
		: null;

	$: if (isNew) {
		project.updated_at = Date.now() + '';
		persistValue(LocalStorage.NewProject, project);
	}

	function addSecondaryUsage() {
		const hasNone = !(project.site_secondary_usages as []).length;
		const hasNoEmpty = (project.site_secondary_usages as []).every((u) => {
			return Object.entries(u).every(([k, v]) => {
				return v != newSiteUsage[k];
			});
		});
		if (hasNone || hasNoEmpty) {
			project.site_secondary_usages.push(newSiteUsage);
			project = project;
		}
	}

	function removeSecondaryUsage(index: number) {
		(project.site_secondary_usages as []).splice(index, 1);
		project = project;
	}

	async function createProject() {
		if (isNew) {
			const res = await fetch('/api/projects/new.json', {
				method: 'POST',
				body: JSON.stringify(project as any),
			});
		}
	}
</script>

<form id="edit-form" on:submit|preventDefault={createProject} on:reset={() => (project = newProject)}>
	<h2>Créez une nouvelle fiche de projet</h2>
	<p>Dernière date de modiciation: {new Date(project.updated_at)}</p>
	<FieldV2 bind:value={project.title} placeholder="Ceci est le placeholder">
		<svelte:fragment slot="legend">Titre du projet</svelte:fragment>
	</FieldV2>
	<fieldset>
		<label>
			<span>Titre du projet: </span>
			<input
				use:inputOnReset
				bind:value={project.title}
				placeholder="Définissez un titre"
				name="project-title"
				type="text"
				required
			/>
		</label>
	</fieldset>
	<fieldset>
		<legend>Type de projet: </legend>
		{#each descriptors.types as t}
			<label>
				{t.title}
				<input type="radio" bind:group={project.type_id} name="type" value={t.id} required />
			</label>
		{/each}
	</fieldset>
	<fieldset class="map-container">
		<legend>Localisez {$votre projet}</legend>
		<Map>
			<MapToolbar position="top-left" slot="top-left">
				<MapGeolocateControl />
			</MapToolbar>
		</Map>
	</fieldset>
	<fieldset>
		<legend>Usage principal du site</legend>
		<fieldset>
			<legend>Catégorie d'usage</legend>
		</fieldset>
		<fieldset>
			<legend>Usage</legend>
		</fieldset>
	</fieldset>
	<fieldset>
		<legend>Usage(s) secondaire(s) du site</legend>
		{#each project.site_secondary_usages as secondary_usage, i}
			<Button on:click={() => removeSecondaryUsage(i)}>Effacer</Button>
			<fieldset>
				<legend>Catégorie d'usage</legend>
			</fieldset>
			<fieldset>
				<legend>Usage</legend>
			</fieldset>
		{/each}
		<Button on:click={addSecondaryUsage} icon="plus">Définir un usage secondaire</Button>
	</fieldset>
</form>

<style lang="scss">
	form {
		// @include mixins.core-grid;
		position: relative;
		flex-direction: column;
		gap: 2rem;

		h2 {
			@include mixins.core-grid-col(main);
		}
	}

	fieldset {
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1.5rem;
		padding: 1rem;
		@include mixins.core-grid-col(col1 / col2);
	}

	.map-container {
		@include mixins.core-grid-col(main);
		width: 100%;
		min-height: 600px;
		height: 50vh;
	}
</style>

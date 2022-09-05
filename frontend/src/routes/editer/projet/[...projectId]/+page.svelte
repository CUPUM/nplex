<script lang="ts" context="module">
	export type LocalProject = PageData['project'] & {
		formDirty: Partial<Record<keyof PageData['project'], boolean>>;
		formUpdated: string;
	};
</script>

<script lang="ts">
	import Field from '$components/primitives/Field.svelte';
	import Map from '$components/primitives/Map.svelte';
	import MapGeolocateControl from '$components/primitives/MapGeolocateControl.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import { getPersistedValue, persistValue } from '$utils/persistValue';
	import { LocalStorage } from '$utils/values/keys';
	import { sizes } from '$utils/values/sizes';
	import type { PageData } from './$types';
	import Header from './Header.svelte';
	import Toolbar from './Toolbar.svelte';

	export let data: PageData;

	// Check local storage for persisted version, if not new, verify if based on up-to-date data.
	const fallback: LocalProject = { ...data.project, formDirty: {}, formUpdated: null };
	const key = data.isNew ? LocalStorage.NewProject : data.project.id;
	let localProject: LocalProject = getPersistedValue(key, fallback);
	if (!data.isNew && localProject.updated_at !== data.project.updated_at) {
		localProject = fallback;
	}

	// Reactively persist form changes into local storage, (clear/reinitiate whenever the user saves the project into the database).
	$: {
		console.log('reactively persisting', localProject);
		persistValue(key, localProject);
	}

	function trackDirtiness(key: keyof LocalProject['formDirty']) {
		localProject.formDirty[key] = data.project[key] !== localProject[key];
		if (localProject.formDirty[key]) {
			localProject.formUpdated = Date.now().toString();
		} else {
			if (!Object.values(localProject.formUpdated).some((d) => d)) {
				localProject.formUpdated = null;
			}
		}
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

	function saveProject() {
		// Insert in supabase
		// Goto projectId route
	}
</script>

<Header project={localProject} isNew={data.isNew} />
<form on:submit|preventDefault={saveProject}>
	<section>
		<Field
			size={sizes.large}
			variant="outlined"
			bind:value={localProject.title}
			on:change={() => trackDirtiness('title')}
		>
			<svelte:fragment slot="label">Nom du projet</svelte:fragment>
		</Field>
	</section>
	<section>
		<legend>Catégorie</legend>
		<Switch bind:value={localProject.category_id} display="inline">
			{#each data.descriptors.categories as c}
				<SwitchItem value={c.id}>{c.title}</SwitchItem>
			{/each}
		</Switch>
		<legend>Type</legend>
		<ul>
			{#each data.descriptors.types as t}
				<li>
					<label>
						<input type="radio" bind:group={localProject.type_id} name="type" value={t.id} required />
						{t.title}
					</label>
				</li>
			{/each}
		</ul>
	</section>
	<section class="map-container">
		<legend>Localisez</legend>
		<Map>
			<MapToolbar position="top-left" slot="top-left">
				<MapGeolocateControl />
			</MapToolbar>
		</Map>
	</section>
	<Toolbar />
</form>

<style lang="scss">
	form {
		@include mixins.core-grid;
		position: relative;
		border-radius: calc(3rem - 0.05 * var(--scroll));
		padding: 4rem 0;
		background-color: var(--bg-color);

		&::before {
			content: '';
			position: absolute;
			width: calc(100% - var(--scroll-size));
			height: 100vh;
			left: 0;
			top: 0;
			border-radius: inherit;
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

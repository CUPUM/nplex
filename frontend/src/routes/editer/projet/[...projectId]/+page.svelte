<script lang="ts">
	import { reveal } from '$actions/reveal';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Map from '$components/primitives/Map.svelte';
	import MapGeolocateControl from '$components/primitives/MapGeolocateControl.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { getPersistedValue, persistValue } from '$utils/persistValue';
	import { slipMask } from '$utils/presets/reveal';
	import { LocalStorage } from '$utils/values/keys';
	import { sizes } from '$utils/values/sizes';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

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

<div class="aside-wrapper" in:fly={{ x: -10, opacity: 0 }}>
	<aside>
		<menu class="general">
			<Tooltip message="Aide" place="right">
				<Button square variant="ghost">
					<Icon size="1.25em" name="info-circle" />
				</Button>
			</Tooltip>
		</menu>
		<menu class="form-controls">
			<Tooltip message="Enregistrer" place="right">
				<Button square form={targetForm} type="submit" variant="ghost">
					<Icon size="1.25em" name="pen-plus" />
				</Button>
			</Tooltip>
			<Tooltip message="Effacer tout" place="right">
				<Button square form={targetForm} type="reset" variant="ghost">
					<Icon size="1.25em" name="trash" />
				</Button>
			</Tooltip>
			<!-- If editing existing sheet, aka routeId = /editer/[someId], if admin or editor, etc... -->
			<Tooltip message="Publier la fiche" place="right">
				<Button form={targetForm} square type="submit" variant="ghost">
					<Icon size="1.25em" name="upload" />
				</Button>
			</Tooltip>
			<!-- Add category-specific controls -->
		</menu>
	</aside>
</div>
<section class="main">
	<header>
		<section>
			{#if data.isNew}
				<h2 use:reveal={{ ...slipMask, splitDelimiter: /(.{3})/, rootMargin: '0px 0px' }}>
					Nouvelle fiche de projet
				</h2>
			{:else}
				<h2 use:reveal={{ ...slipMask, rootMargin: '0px 0px' }}>Fiche du projet: {data.project.title}</h2>
			{/if}
		</section>
		<section class="dates">
			<div>Créée le {new Date(+data.project.created_at).toLocaleString()}</div>
			<div>Modifiée le {new Date(+data.project.updated_at).toLocaleString()}</div>
		</section>
	</header>
	<form id={targetForm} on:submit|preventDefault={createProject}>
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
</section>

<style lang="scss">
	.main {
		width: 100%;
	}

	.aside-wrapper {
		z-index: 1;
		position: sticky;
		top: 50%;
		transform: translateY(-50%);
		// bottom: 0px;
		// align-self: flex-end;
		align-self: center;
		width: 0px;
	}

	aside {
		position: relative;
		pointer-events: all;
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0.5rem;
		margin-left: 1rem;
		width: fit-content;
		padding: 3px;
		border-radius: 1em;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
	}

	menu {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		font-size: 1.2em;
	}

	form {
		@include mixins.core-grid;
		position: relative;
		border-radius: 2rem 2rem 0 0;
		background-color: var(--bg-color);
	}

	h2 {
		grid-column: col1 / col2;
	}

	form > section {
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

	header {
		position: relative;
		color: var(--color-dark-700);
		grid-column: full;
		background-color: var(--color-light-900);
		margin-bottom: -2rem;
		margin-right: var(--scroll-size);
		margin-top: calc(-1 * var(--navbar-height));
		min-height: 50vh;
		padding: 6rem 0;
		@include mixins.core-grid;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		z-index: -20;

		h2 {
			padding: 0;
			margin: 0;
			font-weight: 600;
		}

		section {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			&:first-child {
				grid-column: col1 / col2;
				align-items: flex-start;
				padding-right: 4rem;
			}

			&.dates {
				grid-column: col3;
				gap: 1em;
				margin-bottom: 0.8em;
				font-size: 0.8em;
				// text-transform: uppercase;
				font-weight: 400;
				letter-spacing: 1px;
				// align-items: flex-end;
				// text-align: right;
				// font-family: var(--font-misc);
			}
		}
	}
</style>

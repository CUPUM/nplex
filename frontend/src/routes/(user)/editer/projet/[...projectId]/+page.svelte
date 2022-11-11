<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Popup from '$components/Popup.svelte';
	import type { ActionData, PageData } from './$types';
	import ProjectEditorDescription from './ProjectEditorDescription.svelte';
	import ProjectEditorMap from './ProjectEditorMap.svelte';
	import EditorMenu from './ProjectEditorMenu.svelte';
	import ProjectEditorTitle from './ProjectEditorTitle.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: project = data.project;
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
	<header>
		<h2>Général</h2>
	</header>
	<ProjectEditorTitle {project} />
	<ProjectEditorDescription {project} />
	<ProjectEditorMap {project} />
	<EditorMenu project={data.project} />
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
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 2rem;
	}

	section {
		width: 100%;
	}
</style>

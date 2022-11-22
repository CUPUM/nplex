<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import type { ActionData, PageData } from './$types';
	import ProjectCategory from './ProjectCategory.svelte';
	import ProjectDescription from './ProjectDescription.svelte';
	import EditorMenu from './ProjectEditorMenu.svelte';
	import ProjectEditorNav from './ProjectEditorNav.svelte';
	import ProjectLocation from './ProjectLocation.svelte';
	import ProjectTitle from './ProjectTitle.svelte';
	import ProjectType from './ProjectType.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<form
	id="edit"
	method="POST"
	action="?/upsert"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<ProjectTitle bind:project={data.project} />
	<ProjectCategory bind:project={data.project} descriptors={data.descriptors} />
	<ProjectType bind:project={data.project} descriptors={data.descriptors} />
	<ProjectDescription bind:project={data.project} />
	<ProjectLocation bind:project={data.project} />
	<EditorMenu bind:project={data.project} />
</form>
<header class="editor-header">
	<h2>Publier & partager</h2>
</header>
<form
	id="share"
	method="POST"
	action="?/share"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h3>Partager les droits d'édition</h3>
	<input type="search" />
</form>
<form
	id="publish"
	method="POST"
	action="?/publish"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h3>Publier</h3>
	<!-- <Toggle toggled={data.project.is_published} /> -->
</form>
{#if data.project?.id}
	<form
		id="delete"
		method="POST"
		action="?/delete"
		use:enhance={({ form, data, action, cancel }) => {
			return async ({ update, result }) => {
				update({ reset: true });
			};
		}}
	>
		<h3>Supprimer</h3>
		<input type="hidden" name="id" value={data.project.id} />
		<Button variant="danger" type="submit">Supprimer le projet</Button>
	</form>
{/if}
<ProjectEditorNav />

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		padding-inline: var(--ui-space-medium);
		align-items: flex-start;
		flex-direction: column;
	}
</style>

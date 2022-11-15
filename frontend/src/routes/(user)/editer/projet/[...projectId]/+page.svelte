<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import type { ActionData, PageData } from './$types';
	import ProjectCategory from './ProjectCategory.svelte';
	import ProjectDescription from './ProjectDescription.svelte';
	import EditorMenu from './ProjectEditorMenu.svelte';
	import ProjectLocation from './ProjectLocation.svelte';
	import ProjectTitle from './ProjectTitle.svelte';
	import ProjectType from './ProjectType.svelte';

	export let data: PageData;
	export let form: ActionData;

	let { project, descriptors } = data;

	$: h = data.project ? 'Éditer le projet' : 'Créer un nouveau projet';
</script>

<header>
	<hgroup>
		<span class="sub">
			{h}
		</span>
		<h2>Information générale</h2>
	</hgroup>
</header>
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
	<ProjectCategory bind:project {descriptors} />
	<ProjectType bind:project {descriptors} />
	<ProjectTitle bind:project />
	<ProjectDescription bind:project />
	<ProjectLocation bind:project />
	<EditorMenu bind:project />
</form>
<hr class="dashed" />
<header>
	<hgroup>
		<span class="sub"> Gérer la visibilité de la fiche </span>
		<h2>Publier & partager</h2>
	</hgroup>
</header>
<form
	id="share-project"
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
	id="publish-project"
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
		id="delete-project"
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

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 2rem;
	}

	header {
		padding: var(--size-x5large) 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		hgroup {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: var(--ui-medium);
			align-items: stretch;
			justify-content: center;
		}
		h2 {
			font-size: var(--size-x4large);
			width: 100%;
			font-weight: 600;
			max-width: var(--ui-medium);
			margin: 0 auto;
			text-align: center;
			padding: 1rem;
			line-height: 1em;
		}
		.sub {
			// font-family: var(--font-misc);
			text-transform: uppercase;
			font-size: var(--size-xsmall);
			letter-spacing: 0.1em;
			font-weight: 400;
			align-self: center;
			// opacity: 0.5;
		}
	}

	section {
		width: 100%;
	}
</style>

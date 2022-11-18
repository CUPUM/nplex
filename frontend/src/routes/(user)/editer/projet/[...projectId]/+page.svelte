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

	$: h = data.project.id ? 'Éditer le projet' : 'Créer un nouveau projet';
</script>

<hgroup>
	<span class="sub">{h}</span>
	<h2>Information générale</h2>
</hgroup>
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
	<ProjectTitle bind:project />
	<ProjectCategory bind:project {descriptors} />
	<ProjectType bind:project {descriptors} />
	<ProjectDescription bind:project />
	<ProjectLocation bind:project />
	<EditorMenu bind:project />
</form>
<header>
	<hgroup>
		<span class="sub">Gérer la visibilité du projet</span>
		<h2>Publier & partager</h2>
	</hgroup>
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

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 2rem;
		gap: 2rem;
	}

	hgroup {
		padding: var(--size-x5large) 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 0.5rem;
	}
	h2 {
		font-size: var(--size-x4large);
		width: 100%;
		font-weight: 500;
		max-width: var(--ui-medium);
		margin: 0 auto;
		text-align: center;
		padding: 0 1rem;
		line-height: 0.9em;
	}
	.sub {
		// font-family: var(--font-misc);
		// text-transform: uppercase;
		font-size: var(--size-xsmall);
		letter-spacing: 0.05em;
		font-weight: 500;
		align-self: center;
		// opacity: 0.5;
	}

	form :global(h3) {
		font-size: var(--size-large);
		font-weight: 500;
	}
</style>

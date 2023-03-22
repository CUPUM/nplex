<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { editorUpdating, EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../common';
	import EditorBreadcrumbs from '../../EditorBreadcrumbs.svelte';
	import EditorHeader from '../../EditorHeader.svelte';
	import { descriptors, projectData } from './common';

	export let data;

	$: $descriptors = data.descriptors;

	function syncEditorData() {
		projectData.set(JSON.parse(JSON.stringify(data.project)));
	}
	syncEditorData();
	$: data, syncEditorData();

	const sidebarRoutes = [
		{
			subpath: '',
			title: 'Général',
			hash: null,
		},
		{
			subpath: '/localisation',
			title: 'Localisation',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/galerie',
			title: 'Galerie',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/materiaux',
			title: 'Matériaux',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/indicateurs',
			title: 'Indicateurs',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/realisation',
			title: 'Réalisation',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/parametres',
			title: 'Paramètres',
			hash: EDITOR_FORM_ID,
		},
	];
</script>

<EditorBreadcrumbs crumbs={data.crumbs} />
<EditorHeader isPublic={data.project.publication_status.status === 'published'}>
	<svelte:fragment slot="heading">{$projectData.title}</svelte:fragment>
	<svelte:fragment slot="nav">
		<Button variant="cta" href="/projets/{data.project.id}">
			Consulter la fiche d'exploration du projet <Icon name="file" slot="trailing" />
		</Button>
	</svelte:fragment>
</EditorHeader>
<div class="editor-columns">
	<Sidebar variant="outlined">
		{#each sidebarRoutes as r, i}
			<SidebarButton
				{i}
				href="/editer/projet/{data.project.id}{r.subpath}{r.hash ? '#' + r.hash : ''}"
			>
				{r.title}
			</SidebarButton>
		{/each}
	</Sidebar>
	<form
		use:enhance={({ form, data, action, cancel }) => {
			editorUpdating.set(true);
			return async ({ update, result }) => {
				update({ reset: false });
				if (result.type !== 'success' && result.type !== 'redirect') {
					editorUpdating.set(false);
				}
			};
		}}
		method="POST"
		action="?/{EDITOR_FORM_ACTION}"
		id={EDITOR_FORM_ID}
	>
		<slot />
	</form>
</div>

<style lang="scss">
	.editor-columns {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--ui-gutter);
	}

	form {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--ui-gutter);
		min-height: 100vh;
		min-height: 100svh;
		scroll-margin-block-start: var(--ui-nav-h);
	}
</style>

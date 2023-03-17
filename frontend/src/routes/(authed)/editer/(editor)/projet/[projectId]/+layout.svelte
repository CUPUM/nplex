<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../common';
	import EditorBreadcrumbs from '../../EditorBreadcrumbs.svelte';
	import EditorHeader from '../../EditorHeader.svelte';
	import EditorNavigationModal from '../../EditorNavigationModal.svelte';
	import EditorToolbar from '../../EditorToolbar.svelte';
	import { editTitle, editTypeId } from './common';

	export let data;

	$: $editTitle = data.project.title;
	$: $editTypeId = data.project.type_id;

	let updating = false;

	const sidebarRoutes = [
		{
			subpath: '',
			title: 'Général',
			formHash: false,
		},
		{
			subpath: '/localisation',
			title: 'Localisation',
			formHash: true,
		},
		{
			subpath: '/galerie',
			title: 'Galerie',
			formHash: true,
		},
		{
			subpath: '/materiaux',
			title: 'Matériaux',
			formHash: true,
		},
		{
			subpath: '/indicateurs',
			title: 'Indicateurs',
			formHash: true,
		},
		{
			subpath: '/realisation',
			title: 'Réalisation',
			formHash: true,
		},
		{
			subpath: '/parametres',
			title: 'Paramètres',
			formHash: true,
		},
	];
</script>

<EditorBreadcrumbs crumbs={data.crumbs} />
<EditorHeader isPublic={data.project.publication_status.status === 'published'}>
	<svelte:fragment slot="heading">{$editTitle}</svelte:fragment>
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
				href="/editer/projet/{data.project.id}{r.subpath}{r.formHash ? '#' + EDITOR_FORM_ID : ''}"
			>
				{r.title}
			</SidebarButton>
		{/each}
	</Sidebar>
	<form
		use:enhance={({ form, data, action, cancel }) => {
			updating = true;
			return async ({ update, result }) => {
				update({ reset: false });
				if (result.type !== 'success' && result.type !== 'redirect') {
					updating = false;
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
<EditorToolbar />
<EditorNavigationModal />

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

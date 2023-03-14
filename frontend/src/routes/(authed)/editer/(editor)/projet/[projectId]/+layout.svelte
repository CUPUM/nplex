<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { EDITOR_ROUTES } from '$routes/(authed)/editer/common';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../common';
	import EditorBreadcrumbs from '../../EditorBreadcrumbs.svelte';
	import EditorHeader from '../../EditorHeader.svelte';
	import EditorNavigationModal from '../../EditorNavigationModal.svelte';
	import EditorToolbar from '../../EditorToolbar.svelte';
	import type { LayoutData } from './$types';
	import { editTitle, editTypeId } from './common';

	export let data;

	$: $editTitle = data.project.title;
	$: $editTypeId = data.project.type_id;

	let updating = false;

	function base(subpath: string, hash: string = EDITOR_FORM_ID) {
		return `${EDITOR_ROUTES.project.pathname}/${($page.data as LayoutData).project.id}${subpath}${
			hash ? '#' + hash : ''
		}`;
	}

	const sidebarRoutes = [
		{
			pathname: base('', ''),
			title: 'Général',
		},
		{
			pathname: base('/localisation'),
			title: 'Localisation',
		},
		{
			pathname: base('/galerie'),
			title: 'Galerie',
		},
		{
			pathname: base('/materiaux'),
			title: 'Matériaux',
		},
		{
			pathname: base('/indicateurs'),
			title: 'Indicateurs',
		},
		{
			pathname: base('/realisation'),
			title: 'Réalisation',
		},
		{
			pathname: base('/parametres'),
			title: 'Paramètres',
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
	<Sidebar>
		{#each sidebarRoutes as r}
			<SidebarButton href={r.pathname}>{r.title}</SidebarButton>
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

<!-- <EditorLayout>
	<svelte:fragment slot="header">
		{$editTitle}
		<div class="header-sub">
			<Button variant="outlined" href="/projets/{data.project.id}">
				Consulter la fiche d'exploration du projet
			</Button>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebar">
		{#each sidebarRoutes as r}
			<SidebarButton href={r.pathname}>{r.title}</SidebarButton>
		{/each}
	</svelte:fragment>
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
</EditorLayout> -->
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
